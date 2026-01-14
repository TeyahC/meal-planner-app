import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import "../../styles/App.css";

export default function AddRecipeForm({ existingRecipe, onCancel }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [allergies, setAllergies] = useState("");
  const [instructions, setInstructions] = useState("");
  const [servings, setServings] = useState(1);
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [loading, setLoading] = useState(false);

  // Load existing recipe if editing
  useEffect(() => {
    if (existingRecipe) {
      setName(existingRecipe.name || "");

      const ingrText = (existingRecipe.ingredients || [])
        .map(({ quantity, unit, name }) => `${quantity} ${unit} ${name}`)
        .join("\n");
      setIngredients(ingrText);

      setAllergies((existingRecipe.allergies || []).join(", "));
      setInstructions(existingRecipe.instructions || "");
      setServings(existingRecipe.servings || 1);
      setCalories(existingRecipe.calories || "");
      setProtein(existingRecipe.protein || "");
    }
  }, [existingRecipe]);

  // Parse ingredients in the flexible format
  const parseIngredients = (text) => {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        // Remove symbols like †
        line = line.replace(/†/g, "").trim();

        // Fraction to decimal helper
        const fractionToDecimal = (str) => {
          if (str.includes("/")) {
            const [num, denom] = str.split("/").map(Number);
            return num / denom;
          }
          return parseFloat(str);
        };

        // Match weight/volume in parentheses, e.g., "Mayonnaise (50ml)"
        const weightMatch = line.match(/(.+?)\(([\d./]+)([a-zA-Z]+)\)/);
        if (weightMatch) {
          return {
            name: weightMatch[1].trim(),
            quantity: fractionToDecimal(weightMatch[2]),
            unit: weightMatch[3],
          };
        }

        // Match count/unit, e.g., "White potato x3"
        const countMatch = line.match(/(.+?) x([\d./]+)/i);
        if (countMatch) {
          return {
            name: countMatch[1].trim(),
            quantity: fractionToDecimal(countMatch[2]),
            unit: "unit",
          };
        }

        // Match decimal quantity at start, e.g., "0.25 unit Mayonnaise"
        const decimalMatch = line.match(/^([\d./]+)\s+(\S+)\s+(.+)$/);
        if (decimalMatch) {
          return {
            quantity: fractionToDecimal(decimalMatch[1]),
            unit: decimalMatch[2],
            name: decimalMatch[3],
          };
        }

        // Default: just ingredient name, 1 unit
        return {
          name: line,
          quantity: 1,
          unit: "unit",
        };
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const parsedIngredients = parseIngredients(ingredients);

    // Normalize by servings
    const normalizedIngredients = parsedIngredients.map(
      ({ name, quantity, unit }) => ({
        name,
        quantity: servings > 0 ? quantity / servings : quantity,
        unit,
      })
    );

    const newRecipe = {
      name: name.trim(),
      ingredients: normalizedIngredients,
      allergies: allergies
        .split(",")
        .map((a) => a.trim().toLowerCase())
        .filter(Boolean),
      instructions,
      servings,
      calories: Number(calories),
      protein: Number(protein),
    };

    let error;
    if (existingRecipe) {
      ({ error } = await supabase
        .from("recipes")
        .update(newRecipe)
        .eq("id", existingRecipe.id));
    } else {
      ({ error } = await supabase.from("recipes").insert([newRecipe]));
    }

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert(`Recipe ${existingRecipe ? "updated" : "added"}!`);
      if (!existingRecipe) {
        setName("");
        setIngredients("");
        setAllergies("");
        setInstructions("");
        setServings(1);
        setCalories("");
        setProtein("");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-recipe-form">
      <h2>{existingRecipe ? "Edit Recipe" : "Add a New Recipe"}</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <textarea
        placeholder="Ingredients (one per line, e.g. 'Cayenne pepper (0.5tsp)' or 'White potato x3')"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
        rows={8}
      />

      <input
        type="text"
        placeholder="Allergies (comma-separated)"
        value={allergies}
        onChange={(e) => setAllergies(e.target.value)}
      />

      <textarea
        placeholder="Instructions (use \\n for new lines)"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        required
        rows={5}
      />

      <label htmlFor="servings-input">Servings (number of people):</label>
      <input
        id="servings-input"
        type="number"
        min="1"
        value={servings}
        onChange={(e) =>
          setServings(Math.max(1, parseInt(e.target.value) || 1))
        }
        required
      />

      <label htmlFor="calories-input">Calories per portion:</label>
      <input
        id="calories-input"
        type="number"
        min="0"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        required
      />

      <label htmlFor="protein-input">Protein (g) per portion:</label>
      <input
        id="protein-input"
        type="number"
        min="0"
        value={protein}
        onChange={(e) => setProtein(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading
          ? existingRecipe
            ? "Updating..."
            : "Adding..."
          : existingRecipe
          ? "Update Recipe"
          : "Add Recipe"}
      </button>

      {existingRecipe && (
        <button type="button" onClick={onCancel} className="cancel-button">
          Cancel
        </button>
      )}
    </form>
  );
}

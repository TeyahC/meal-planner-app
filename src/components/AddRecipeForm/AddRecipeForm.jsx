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

  const parseIngredients = (text) => {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => {
        const parts = line.split(" ");
        const quantity = parseFloat(parts[0]);
        const unit = parts[1] || "";
        const name = parts.slice(2).join(" ") || "";
        return { quantity, unit, name };
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const parsedIngredients = parseIngredients(ingredients);
    const normalizedIngredients = parsedIngredients.map(
      ({ quantity, unit, name }) => ({
        quantity: servings > 0 ? quantity / servings : quantity,
        unit,
        name,
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
      servings: 1,
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
        placeholder="Ingredients (one per line, format: quantity unit name, e.g. '200 g chicken breast')"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
        rows={5}
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

      <button type="submit">
        {existingRecipe ? "Update Recipe" : "Add Recipe"}
      </button>

      {existingRecipe && (
        <button type="button" onClick={onCancel} className="cancel-button">
          Cancel
        </button>
      )}
    </form>
  );
}

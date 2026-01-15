import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import "../../styles/App.css";

export default function EditRecipeForm({ initialRecipe, onCancel, onUpdated }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [allergies, setAllergies] = useState("");
  const [instructions, setInstructions] = useState("");
  const [servings, setServings] = useState(1);
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------------- LOAD INITIAL RECIPE ---------------- */
  useEffect(() => {
    if (!initialRecipe) return;

    setName(initialRecipe.name || "");

    const ingrText = (initialRecipe.ingredients || [])
      .map(({ quantity, unit, name }) => `${quantity} ${unit} ${name}`)
      .join("\n");
    setIngredients(ingrText);

    setAllergies((initialRecipe.allergies || []).join(", "));
    setInstructions(initialRecipe.instructions || "");
    setServings(initialRecipe.servings || 1);
    setCalories(initialRecipe.calories || "");
    setProtein(initialRecipe.protein || "");
  }, [initialRecipe]);

  /* ---------------- INGREDIENT PARSER ---------------- */
  const parseIngredients = (text) => {
    const FRACTIONS = {
      "½": 0.5,
      "¼": 0.25,
      "¾": 0.75,
      "⅓": 1 / 3,
      "⅔": 2 / 3,
    };

    const normalizeQty = (q) => {
      if (!q) return 1;
      q = q.trim();
      if (FRACTIONS[q]) return FRACTIONS[q];
      if (q.includes("/")) {
        const [a, b] = q.split("/").map(Number);
        return a / b;
      }
      return parseFloat(q);
    };

    const UNIT_LIST = [
      "ml",
      "g",
      "tsp",
      "tbsp",
      "clove",
      "portion",
      "portions",
      "unit",
    ];

    // Remove duplicates and empty lines
    const lines = [
      ...new Set(
        text
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean)
      ),
    ];

    return lines.map((line) => {
      line = line.replace(/†/g, "").trim();

      // 1) Match "Name (50ml)" or "Name (16g)"
      const parenMatch = line.match(
        /^(.+?)\s*\(([\d./½¼¾⅓⅔]+)\s*([a-zA-Z]+)\)$/
      );
      if (parenMatch) {
        return {
          name: parenMatch[1].trim(),
          quantity: normalizeQty(parenMatch[2]),
          unit: parenMatch[3],
        };
      }

      // 2) Match "Name x3"
      const countMatch = line.match(/^(.+?) x([\d./½¼¾⅓⅔]+)$/i);
      if (countMatch) {
        return {
          name: countMatch[1].trim(),
          quantity: normalizeQty(countMatch[2]),
          unit: "unit",
        };
      }

      // 3) Match "Quantity Unit Name" e.g., "2 tsp ground coriander"
      const parts = line.split(/\s+/);
      if (parts.length >= 2) {
        const qty = normalizeQty(parts[0]);
        const nextWord = parts[1].toLowerCase();
        let unit = "unit";
        let name = parts.slice(1).join(" ");

        if (UNIT_LIST.includes(nextWord)) {
          unit = nextWord;
          name = parts.slice(2).join(" ");
        }

        return { quantity: qty, unit, name };
      }

      // 4) Default: 1 unit
      return { quantity: 1, unit: "unit", name: line };
    });
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const parsedIngredients = parseIngredients(ingredients);

    // Normalize quantities by servings
    const normalizedIngredients = parsedIngredients.map(
      ({ name, quantity, unit }) => ({
        name,
        quantity: servings > 0 ? quantity / servings : quantity,
        unit,
      })
    );

    const updatedRecipe = {
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

    const { data, error } = await supabase
      .from("recipes")
      .update(updatedRecipe)
      .eq("id", initialRecipe.id)
      .select()
      .single();

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Recipe updated!");
      if (onUpdated) onUpdated(data);
    }
  };

  /* ---------------- RENDER ---------------- */
  return (
    <form onSubmit={handleSubmit} className="add-recipe-form">
      <h2>Edit Recipe</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <textarea
        placeholder="Ingredients (one per line, e.g., 'Cayenne pepper (0.5tsp)' or 'White potato x3')"
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
        placeholder="Instructions"
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

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button type="button" onClick={onCancel} className="cancel-button">
          Cancel
        </button>
      </div>
    </form>
  );
}

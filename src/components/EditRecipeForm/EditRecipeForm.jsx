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

    const normalizeQty = (q) => {
      if (!q) return 1;
      q = q.trim();
      if (FRACTIONS[q]) return FRACTIONS[q];
      if (q.includes("/")) {
        const [a, b] = q.split("/").map(Number);
        return a / b;
      }
      return Number(q);
    };

    const lines = [
      ...new Set(
        text
          .split("\n")
          .map((l) => l.replace(/[†]/g, "").trim())
          .filter(Boolean)
      ),
    ];

    return lines.map((line) => {
      let quantity = 1;
      let unit = "unit";
      let name = line;

      // Match quantity at the start (e.g., "2 garlic cloves")
      const qtyMatch = line.match(/^([\d./½¼¾⅓⅔]+)\s+(.*)/);
      if (qtyMatch) {
        quantity = normalizeQty(qtyMatch[1]);
        name = qtyMatch[2];
      }

      // Match xN at the end (e.g., "Cheddar cheese x2")
      const xMatch = name.match(/(.*)\s+x(\d+)$/i);
      if (xMatch) {
        name = xMatch[1].trim();
        quantity *= Number(xMatch[2]);
      }

      // Match (Npcs) or (Ng) in parentheses (e.g., "Chicken breast portions (2pcs)")
      const parenMatch = name.match(/\((\d+)\s*(pcs?|units?|g|ml)\)/i);
      if (parenMatch) {
        quantity *= Number(parenMatch[1]);
        name = name.replace(parenMatch[0], "").trim();
      }

      // Check if the first word is a unit
      const parts = name.split(/\s+/);
      if (parts.length > 1 && UNIT_LIST.includes(parts[0].toLowerCase())) {
        unit = parts[0].toLowerCase();
        parts.shift();
        name = parts.join(" ");
      }

      return { quantity, unit, name };
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

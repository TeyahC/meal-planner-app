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
  const [fibre, setFibre] = useState("");
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
    setFibre(initialRecipe.fibre || "");
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
      return Number(q);
    };

    const normalizeUnit = (u) => {
      if (!u) return "unit";
      u = u.toLowerCase();
      if (u === "grams" || u === "gram") return "g";
      if (u === "milliliters" || u === "millilitre") return "ml";
      if (u === "teaspoon" || u === "teaspoons") return "tsp";
      if (u === "tablespoon" || u === "tablespoons") return "tbsp";
      if (["pcs", "pc", "piece", "pieces"].includes(u)) return "unit";
      if (["clove", "cloves"].includes(u)) return "clove";
      if (u === "kg") return "kg";
      return u;
    };

    const parseQtyUnit = (s) => {
      if (!s) return null;
      s = s.trim();

      const fracMatch = s.match(/^([\d]+\/[\d]+|[½¼¾⅓⅔])\s*([a-zA-Z]+)?/);
      if (fracMatch) {
        return {
          quantity: normalizeQty(fracMatch[1]),
          unit: normalizeUnit(fracMatch[2]),
        };
      }

      const attached = s.match(/^(\d+(?:\.\d+)?)([a-zA-Z]+)\b/);
      if (attached) {
        return {
          quantity: Number(attached[1]),
          unit: normalizeUnit(attached[2]),
        };
      }

      const parts = s.split(/\s+/);
      const num = parts.find((p) =>
        /^(?:\d+(?:\.\d+)?|[½¼¾⅓⅔]|\d+\/\d+)$/.test(p)
      );
      if (num) {
        const idx = parts.indexOf(num);
        return {
          quantity: normalizeQty(num),
          unit: normalizeUnit(parts[idx + 1]),
        };
      }

      return null;
    };

    return text
      .split("\n")
      .map((line) => line.replace(/[†]/g, "").trim())
      .filter(Boolean)
      .map((line) => {
        let quantity = null;
        let unit = null;
        let name = line;

        const multMatch = name.match(/\b[x×]\s*(\d+(?:\.\d+)?)$/i);
        let multiplier = 1;
        if (multMatch) {
          multiplier = Number(multMatch[1]) || 1;
          name = name.slice(0, multMatch.index).trim();
        }

        const parenMatch = name.match(/\(([^)]+)\)/);
        if (parenMatch) {
          const parsed = parseQtyUnit(parenMatch[1]);
          if (parsed) {
            quantity = parsed.quantity * multiplier;
            unit = parsed.unit || "unit";
            name = name.replace(parenMatch[0], "").trim();
          }
        }

        if (quantity == null) {
          const lead = name.match(/^([\d./½¼¾⅓⅔]+)\s*([a-zA-Z]+)?\s*(.*)$/);
          if (lead) {
            quantity = normalizeQty(lead[1]) * multiplier;
            unit = normalizeUnit(lead[2]);
            name = (lead[3] || "").trim();
          }
        }

        if (quantity == null || isNaN(quantity)) quantity = multiplier || 1;
        if (!unit) unit = "unit";

        name = name
          .replace(/\bx\s*\d+$/i, "")
          .replace(/\bpcs?\b/i, "")
          .replace(/\bpieces?\b/i, "")
          .replace(/\bportion?s?\b/i, "")
          .replace(/\bof\b/i, "")
          .replace(/[\-–—_,]+$/g, "")
          .trim();

        return { quantity, unit, name: name || line };
      });
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const parsedIngredients = parseIngredients(ingredients);

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
      servings: 1,
      calories: Number(calories),
      protein: Number(protein),
      fibre: Number(fibre),
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
        placeholder="Ingredients (one per line)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        rows={8}
        required
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
        rows={5}
        required
      />

      <label>Servings</label>
      <input
        type="number"
        min="1"
        value={servings}
        onChange={(e) => setServings(Math.max(1, Number(e.target.value) || 1))}
      />

      <label>Calories per portion</label>
      <input
        type="number"
        min="0"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        required
      />

      <label>Protein (g) per portion</label>
      <input
        type="number"
        min="0"
        value={protein}
        onChange={(e) => setProtein(e.target.value)}
        required
      />

      <label>Fibre (g) per portion</label>
      <input
        type="number"
        min="0"
        step="0.1"
        value={fibre}
        onChange={(e) => setFibre(e.target.value)}
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

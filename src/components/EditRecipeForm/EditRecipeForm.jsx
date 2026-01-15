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
      return Number(q);
    };

    const UNIT_LIST = [
      "ml",
      "g",
      "kg",
      "tsp",
      "tbsp",
      "clove",
      "cloves",
      "pcs",
      "pc",
      "piece",
      "pieces",
      "portion",
      "portions",
      "unit",
    ];

    const normalizeUnit = (u) => {
      if (!u) return "unit";
      u = u.toLowerCase();
      if (u === "grams" || u === "gram") return "g";
      if (u === "milliliters" || u === "millilitre" || u === "milliliters")
        return "ml";
      if (u === "teaspoon" || u === "teaspoons") return "tsp";
      if (u === "tablespoon" || u === "tablespoons") return "tbsp";
      if (u === "pcs" || u === "pc" || u === "piece" || u === "pieces")
        return "unit";
      if (u === "cloves" || u === "clove") return "clove";
      if (u === "kg") return "kg";
      return u;
    };

    const parseQtyUnit = (s) => {
      if (!s) return null;
      s = s.trim();
      // handle fractions like 1/2 or unicode fractions
      const fracMatch = s.match(/^([\d]+\/[\d]+|[½¼¾⅓⅔])\s*([a-zA-Z]+)?/);
      if (fracMatch) {
        return {
          quantity: normalizeQty(fracMatch[1]),
          unit: normalizeUnit(fracMatch[2]),
        };
      }

      // number attached to unit e.g. 50ml
      const attached = s.match(/^(\d+(?:\.\d+)?)([a-zA-Z]+)\b/);
      if (attached) {
        return {
          quantity: Number(attached[1]),
          unit: normalizeUnit(attached[2]),
        };
      }

      // number + optional unit separated by space e.g. '50 ml' or '2 tsp'
      const parts = s.split(/\s+/);
      const num = parts.find((p) =>
        /^(?:\d+(?:\.\d+)?|[½¼¾⅓⅔]|\d+\/\d+)$/.test(p)
      );
      if (num) {
        const idx = parts.indexOf(num);
        const unit = parts[idx + 1];
        return { quantity: normalizeQty(num), unit: normalizeUnit(unit) };
      }

      return null;
    };

    return [
      ...new Set(
        text
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
      ),
    ]
      .map((raw) => raw.replace(/[†]/g, "").trim())
      .map((line) => {
        let quantity = null;
        let unit = null;
        let name = line;

        // extract trailing multiplier e.g. 'x2' or '×2'
        const multMatch = name.match(/\b[x×]\s*(\d+(?:\.\d+)?)$/i);
        let multiplier = 1;
        if (multMatch) {
          multiplier = Number(multMatch[1]) || 1;
          name = name.slice(0, multMatch.index).trim();
        }

        // find parenthesis content and try to parse quantity/unit from it
        const parenMatch = name.match(/\(([^)]+)\)/);
        let parenParsed = null;
        if (parenMatch) {
          parenParsed = parseQtyUnit(parenMatch[1]);
          if (parenParsed) {
            // if parentheses contain a measurement (g/ml/tsp/tbsp/kg) prefer that
            const isMeasurement = ["g", "ml", "tsp", "tbsp", "kg"].includes(
              parenParsed.unit
            );
            if (isMeasurement) {
              quantity = parenParsed.quantity * multiplier;
              unit = parenParsed.unit;
              // remove parentheses from name
              name = name.replace(parenMatch[0], "").trim();
            } else {
              // treat as piece count e.g. (2pcs)
              quantity = parenParsed.quantity * multiplier;
              unit = "unit";
              name = name.replace(parenMatch[0], "").trim();
            }
          } else {
            // remove parentheses if not useful
            name = name.replace(parenMatch[0], "").trim();
          }
        }

        // if still no quantity, check for leading quantity (e.g., '2 tsp ...' or '16g tomato')
        if (quantity == null) {
          // leading attached unit: 50ml mayonnaise
          const leadAttached = name.match(
            /^(\d+(?:\.\d+)?)([a-zA-Z]+)\b\s*(.*)/
          );
          if (leadAttached) {
            quantity = Number(leadAttached[1]) * multiplier;
            unit = normalizeUnit(leadAttached[2]);
            name = (leadAttached[3] || "").trim();
          } else {
            // leading number separated: '2 tsp garlic'
            const lead = name.match(/^([\d./½¼¾⅓⅔]+)\s*([a-zA-Z]+)?\s*(.*)$/);
            if (lead) {
              quantity = normalizeQty(lead[1]) * multiplier;
              unit = normalizeUnit(lead[2]);
              name = (lead[3] || "").trim();
            }
          }
        }

        // if still no quantity but multiplier exists (e.g., 'White potato x3')
        if (
          (quantity == null || isNaN(quantity)) &&
          multiplier &&
          multiplier !== 1
        ) {
          quantity = multiplier;
          unit = "unit";
        }

        // fallback defaults
        if (quantity == null || isNaN(quantity)) quantity = 1;
        if (!unit) unit = "unit";

        // clean name: remove common trailing words like 'x2', 'pcs', 'portion(s)'
        name = name
          .replace(/\bx\s*\d+$/i, "")
          .replace(/\bpcs?\b/i, "")
          .replace(/\bpieces?\b/i, "")
          .replace(/\bportion?s?\b/i, "")
          .replace(/\bof\b/i, "")
          .replace(/[\-–—_,]+$/g, "")
          .trim();

        // if name becomes empty, set a generic name
        if (!name) name = line;

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

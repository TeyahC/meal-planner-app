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
  const [fibre, setFibre] = useState("");
  const [recipeUrl, setRecipeUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);

  /* ---------------- LOAD EXISTING RECIPE ---------------- */

  useEffect(() => {
    if (!existingRecipe) return;

    setName(existingRecipe.name || "");
    setInstructions(existingRecipe.instructions || "");
    setServings(existingRecipe.servings || 1);
    setCalories(existingRecipe.calories || "");
    setProtein(existingRecipe.protein || "");
    setAllergies((existingRecipe.allergies || []).join(", "));

    const ingrText = (existingRecipe.ingredients || [])
      .map((i) => `${i.quantity} ${i.unit} ${i.name}`)
      .join("\n");

    setIngredients(ingrText);
  }, [existingRecipe]);

  /* ---------------- SMART INGREDIENT PARSER ---------------- */

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

    const normalizedIngredients = parsedIngredients.map(
      ({ name, quantity, unit }) => {
        // If editing, keep the original quantity (assume it’s already per portion)
        if (existingRecipe) {
          return { name, quantity, unit };
        }
        // If new, convert to per portion
        return {
          name,
          quantity: servings > 0 ? quantity / servings : quantity,
          unit,
        };
      }
    );

    const allergenMap = {
      milk: ["milk", "butter", "cheese", "cream", "yoghurt"],
      egg: ["egg"],
      gluten: ["flour", "bread", "pasta", "wheat"],
      nuts: ["almond", "hazelnut", "walnut", "peanut", "cashew"],
      soy: ["soy", "soya"],
      fish: ["fish", "salmon", "tuna"],
      shellfish: ["prawn", "shrimp", "crab"],
      sesame: ["sesame"],
      mustard: ["mustard"],
    };

    const found = new Set();
    normalizedIngredients.forEach(({ name }) => {
      const lower = name.toLowerCase();
      for (const [allergen, keywords] of Object.entries(allergenMap)) {
        if (keywords.some((k) => lower.includes(k))) found.add(allergen);
      }
    });

    const recipe = {
      name: name.trim(),
      ingredients: normalizedIngredients,
      allergies: [
        ...new Set([
          ...found,
          ...allergies
            .split(",")
            .map((a) => a.trim().toLowerCase())
            .filter(Boolean),
        ]),
      ],
      instructions,
      servings,
      calories: Number(calories),
      protein: Number(protein),
      fibre: Number(fibre),
    };

    let error;
    if (existingRecipe) {
      ({ error } = await supabase
        .from("recipes")
        .update(recipe)
        .eq("id", existingRecipe.id));
    } else {
      ({ error } = await supabase.from("recipes").insert([recipe]));
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
        setRecipeUrl("");
        setFibre("");
      }
    }
  };

  /* ---------------- RENDER ---------------- */

  return (
    <form onSubmit={handleSubmit} className="add-recipe-form">
      <h2>{existingRecipe ? "Edit Recipe" : "Add a New Recipe"}</h2>

      <input
        type="text"
        placeholder="Recipe name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <textarea
        placeholder="Ingredients (copy-paste from recipe, one per line)"
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

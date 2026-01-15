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
      "tsp",
      "tbsp",
      "clove",
      "portion",
      "portions",
      "unit",
    ];

    return [
      ...new Set(
        text
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
      ),
    ]
      .map((line) => line.replace(/[†]/g, "").trim())
      .map((line) => {
        // match quantity first
        const qtyMatch = line.match(/^([\d./½¼¾⅓⅔]+)/);
        let quantity = 1;
        let rest = line;
        if (qtyMatch) {
          quantity = normalizeQty(qtyMatch[1]);
          rest = line.slice(qtyMatch[0].length).trim();
        }

        // match unit if the next word is in UNIT_LIST
        const parts = rest.split(/\s+/);
        let unit = "unit";
        if (parts.length > 1 && UNIT_LIST.includes(parts[0].toLowerCase())) {
          unit = parts[0].toLowerCase();
          parts.shift(); // remove unit
        }

        const name = parts.join(" ");

        return { quantity, unit, name };
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

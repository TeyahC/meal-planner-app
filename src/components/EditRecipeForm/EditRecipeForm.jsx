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

  useEffect(() => {
    if (initialRecipe) {
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
    }
  }, [initialRecipe]);

  const parseIngredients = (text) => {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
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

    const updatedRecipe = {
      name: name.trim(),
      ingredients: normalizedIngredients,
      allergies: allergies
        .split(",")
        .map((a) => a.trim().toLowerCase())
        .filter(Boolean),
      instructions,
      servings: 1, // store as per-person
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
      if (onUpdated) onUpdated(data); // call callback to refresh UI
    }
  };

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
        placeholder="Ingredients (one per line, format: quantity unit name, e.g. '200 g chicken')"
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

import React, { useState, useEffect } from "react";
import "../../styles/App.css";

export default function EditRecipeForm({ initialRecipe, onUpdateRecipe, onCancel }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("lunch");
  const [ingredients, setIngredients] = useState("");
  const [allergies, setAllergies] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    if (initialRecipe) {
      setName(initialRecipe.name || "");
      setCategory(initialRecipe.category || "lunch");

      // Convert ingredients array to multiline string
      const ingrText = (initialRecipe.ingredients || [])
        .map(({ quantity, unit, name }) => `${quantity} ${unit} ${name}`)
        .join("\n");
      setIngredients(ingrText);

      setAllergies((initialRecipe.allergies || []).join(", "));
      setInstructions(initialRecipe.instructions || "");
    }
  }, [initialRecipe]);

  const parseIngredients = (text) => {
    return text
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => {
        const parts = line.split(" ");
        const quantity = parseFloat(parts[0]);
        const unit = parts[1] || "";
        const name = parts.slice(2).join(" ") || "";
        return { quantity, unit, name };
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRecipe = {
      ...initialRecipe,
      name,
      category,
      ingredients: parseIngredients(ingredients),
      allergies: allergies.split(",").map(a => a.trim().toLowerCase()),
      instructions,
    };
    onUpdateRecipe(updatedRecipe);
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

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="snack">Snack</option>
        <option value="dessert">Dessert</option>
      </select>

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

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button type="submit" className="add-new-button">Save Changes</button>
        <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
      </div>
    </form>
  );
}

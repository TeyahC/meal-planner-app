import React, { useState, useEffect } from "react";

export default function AddRecipeForm({ onAddRecipe, existingRecipe, onUpdateRecipe, onCancel }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("lunch");
  const [ingredients, setIngredients] = useState(""); // multiline string
  const [allergies, setAllergies] = useState("");
  const [instructions, setInstructions] = useState("");
  const [servings, setServings] = useState(1);  // NEW

  useEffect(() => {
    if (existingRecipe) {
      setName(existingRecipe.name || "");
      setCategory(existingRecipe.category || "lunch");

      const ingrText = (existingRecipe.ingredients || [])
        .map(({ quantity, unit, name }) => `${quantity} ${unit} ${name}`)
        .join("\n");
      setIngredients(ingrText);

      setAllergies((existingRecipe.allergies || []).join(", "));
      setInstructions(existingRecipe.instructions || "");

      setServings(existingRecipe.servings || 1);  // load servings if exists
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Parse ingredients first
    const parsedIngredients = parseIngredients(ingredients);

    // Normalize quantities to 1-person portion by dividing by servings
    const normalizedIngredients = parsedIngredients.map(({ quantity, unit, name }) => ({
      quantity: servings > 0 ? quantity / servings : quantity,
      unit,
      name,
    }));

    const newRecipe = {
      id: existingRecipe ? existingRecipe.id : Date.now().toString(),
      name,
      category,
      ingredients: normalizedIngredients,
      allergies: allergies
        .split(",")
        .map((a) => a.trim().toLowerCase())
        .filter((a) => a.length > 0),
      instructions,
      servings: 1, // always save as 1-person portion
    };

    if (existingRecipe && onUpdateRecipe) {
      onUpdateRecipe(newRecipe);
    } else if (onAddRecipe) {
      onAddRecipe(newRecipe);
    }

    if (!existingRecipe) {
      setName("");
      setCategory("lunch");
      setIngredients("");
      setAllergies("");
      setInstructions("");
      setServings(1);
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

      {/* New Servings input */}
      <label htmlFor="servings-input" style={{ display: "block", margin: "10px 0 5px" }}>
        Servings (number of people):
      </label>
      <input
        id="servings-input"
        type="number"
        min="1"
        value={servings}
        onChange={(e) => setServings(Math.max(1, parseInt(e.target.value) || 1))}
        required
        style={{ width: "60px" }}
      />

      <button type="submit" className="add-new-button" style={{ marginTop: "15px" }}>
        {existingRecipe ? "Update Recipe" : "Add Recipe"}
      </button>

      {existingRecipe && (
        <button
          type="button"
          onClick={onCancel}
          className="cancel-button"
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

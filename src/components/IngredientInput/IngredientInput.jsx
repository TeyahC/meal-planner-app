import React, { useState } from "react";
import "../../styles/IngredientInput.css"; // Import ingredient input styles

export default function IngredientInput({ onAddIngredient }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput) {
      onAddIngredient(trimmedInput);
      setInput("");
    }
  };

  return (
    <form className="ingredient-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add an ingredient"
        className="ingredient-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-label="Ingredient name"
      />
      <button type="submit" className="ingredient-button">
        Add
      </button>
    </form>
  );
}

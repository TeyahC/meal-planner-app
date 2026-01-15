import React, { useState, useMemo } from "react";
import "../../styles/IngredientInput.css"; // Import ingredient input styles

// availableIngredients: optional array of strings to suggest from
export default function IngredientInput({
  onAddIngredient,
  availableIngredients = [],
}) {
  const [input, setInput] = useState("");

  const suggestions = useMemo(() => {
    const term = input.trim().toLowerCase();
    if (!term) return [];
    const unique = Array.from(
      new Set((availableIngredients || []).map((a) => a.toLowerCase()))
    );
    return unique.filter((a) => a.includes(term)).slice(0, 8);
  }, [input, availableIngredients]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput) {
      onAddIngredient(trimmedInput.toLowerCase());
      setInput("");
    }
  };

  const handleSuggestionClick = (s) => {
    onAddIngredient(s.toLowerCase());
    setInput("");
  };

  return (
    <div>
      <form
        className="ingredient-form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
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
      {suggestions.length > 0 && (
        <ul className="ingredient-suggestions" style={{ marginTop: 6 }}>
          {suggestions.map((s) => (
            <li
              key={s}
              onClick={() => handleSuggestionClick(s)}
              style={{ cursor: "pointer" }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

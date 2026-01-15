import React from "react";

const mealTypes = ["breakfast", "lunch", "dinner", "snack", "dessert"];

export default function MealTypeFilter({ selectedType, onSelectType }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>Filter by Meal Type:</h2>
      <select
        value={selectedType}
        onChange={(e) => onSelectType(e.target.value)}
      >
        <option value="">All</option>
        {mealTypes.map((type) => (
          <option key={type} value={type}>
            {type[0].toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

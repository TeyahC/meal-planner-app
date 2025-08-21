import React from "react";

const commonAllergens = ["milk", "egg", "nuts", "shellfish", "gluten", "soy", "sesame", "peanuts"];

export default function AllergyFilter({ selectedAllergies, onToggleAllergy }) {
  return (
    <div style={{ margin: "2rem 0" }}>
      <h2>Filter out allergies:</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {commonAllergens.map((allergy) => (
          <label key={allergy} style={{ cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={selectedAllergies.includes(allergy)}
              onChange={() => onToggleAllergy(allergy)}
            />
            {` ${allergy}`}
          </label>
        ))}
      </div>
    </div>
  );
}

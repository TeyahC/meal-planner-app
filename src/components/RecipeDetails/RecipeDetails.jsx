import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function RecipeDetails({ recipes }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const recipe = recipes.find((r) => r.id.toString() === id);

  if (!recipe) return <p>Recipe not found.</p>;

  // Optional: log ingredients to debug format
  console.log("Ingredients for recipe:", recipe.name, recipe.ingredients);

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "1rem" }}>
        ← Back
      </button>

      <h1>{recipe.name}</h1>
      <p>
        <strong>Category:</strong> {recipe.category}
      </p>

      <h2>Ingredients:</h2>
      <ul>
        {recipe.ingredients && recipe.ingredients.length > 0 ? (
          recipe.ingredients.map((ing, i) => {
            if (typeof ing === "string") {
              return <li key={i}>{ing}</li>;
            } else if (
              typeof ing === "object" &&
              ing !== null &&
              "quantity" in ing &&
              "unit" in ing &&
              "name" in ing
            ) {
              return (
                <li key={i}>
                  {ing.quantity} {ing.unit} {ing.name}
                </li>
              );
            } else {
              return <li key={i}>Invalid ingredient format</li>;
            }
          })
        ) : (
          <li>No ingredients listed</li>
        )}
      </ul>

      {recipe.instructions && (
        <>
          <h2>Instructions:</h2>
          {recipe.instructions.split("\n").map((step, i) => (
            <p key={i} style={{ marginBottom: "1rem" }}>
              {step}
            </p>
          ))}
        </>
      )}
    </div>
  );
}

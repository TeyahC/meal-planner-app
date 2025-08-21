import React from "react";
import { Link } from "react-router-dom";
import "../../styles/App.css";

export default function RecipeList({
  recipes,
  onDeleteRecipe,
  onEditRecipe,
  pantryIngredients,
  onAddMissingToList,
}) {
  if (recipes.length === 0) return <p>No recipes found.</p>;

  // Helper to find missing ingredients per recipe
  function getMissingIngredients(recipeIngredients, pantryList) {
    return recipeIngredients.filter((recipeIng) => {
      const recipeName = recipeIng.name.toLowerCase().trim();
      return !pantryList.some(
        (item) => item.toLowerCase().trim() === recipeName
      );
    });
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => {
        const { id, name, ingredients, category } = recipe;

        const missing = getMissingIngredients(ingredients, pantryIngredients || []);
        const matchedCount = ingredients.length - missing.length;

        // Convert ingredients objects into a readable string, e.g. "200 g chicken, 1 tbsp oil"
        const ingredientList = ingredients
          .map(({ quantity, unit, name }) => `${quantity} ${unit} ${name}`)
          .join(", ");

        return (
          <div key={id} className={`recipe-card ${category.toLowerCase()}`}>
            <Link to={`/recipe/${id}`} tabIndex={0}>
              <h3>{name}</h3>
              <p>
                <strong>Type:</strong> {category}
              </p>
              <p>
                <strong>Ingredients:</strong> {ingredientList}
              </p>
              <p>
                <strong>Pantry match:</strong> {matchedCount} / {ingredients.length} ingredients
              </p>
              {missing.length > 0 && (
                <p className="missing-ingredients">
                  <strong>You need:</strong> {missing.map(i => i.name).join(", ")}
                </p>
              )}
            </Link>

            {missing.length > 0 && missing.length <= 2 && (
              <button
                onClick={() => onAddMissingToList(missing)}
                className="add-missing-button"
              >
                Add Missing Ingredients to Shopping List
              </button>
            )}

            <div className="card-buttons">
              <button onClick={() => onEditRecipe(recipe)} className="edit-button">
                Edit
              </button>
              <button onClick={() => onDeleteRecipe(id)} className="delete2-button">
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

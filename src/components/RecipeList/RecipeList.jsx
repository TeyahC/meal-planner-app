import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "../../styles/App.css";

export default function RecipeList({
  pantryIngredients,
  onAddMissingToList,
  onEditRecipe,
  onDeleteRecipe,
}) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching recipes:", error.message);
      } else {
        setRecipes(data || []);
      }
      setLoading(false);
    };

    fetchRecipes();
  }, []);

  if (loading) return <p>Loading recipes...</p>;
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
        const { id, name, ingredients, calories, protein, allergies } = recipe;

        const missing = getMissingIngredients(
          ingredients || [],
          pantryIngredients || []
        );
        const matchedCount = (ingredients?.length || 0) - missing.length;

        const ingredientList = (ingredients || [])
          .map(({ quantity, unit, name }) => `${quantity} ${unit} ${name}`)
          .join(", ");

        const allergyList = (allergies || []).join(", ");

        return (
          <div key={id} className="recipe-card">
            <Link to={`/recipe/${id}`} tabIndex={0}>
              <h3>{name}</h3>
              <p>
                <strong>Ingredients:</strong> {ingredientList}
              </p>
              <p>
                <strong>Calories per portion:</strong> {calories || 0} kcal
              </p>
              <p>
                <strong>Protein per portion:</strong> {protein || 0} g
              </p>
              {allergyList && (
                <p>
                  <strong>Allergies:</strong> {allergyList}
                </p>
              )}
              <p>
                <strong>Pantry match:</strong> {matchedCount} /{" "}
                {ingredients?.length || 0} ingredients
              </p>
              {missing.length > 0 && (
                <p className="missing-ingredients">
                  <strong>You need:</strong>{" "}
                  {missing.map((i) => i.name).join(", ")}
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
              <button
                onClick={() => onEditRecipe(recipe)}
                className="edit-button"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteRecipe(id)}
                className="delete2-button"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

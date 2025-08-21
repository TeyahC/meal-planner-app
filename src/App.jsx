import React, { useState, useEffect } from "react";
import IngredientInput from "./components/IngredientInput/IngredientInput";
import AllergyFilter from "./components/AllergyFilter/AllergyFilter";
import RecipeList from "./components/RecipeList/RecipeList";
import MealTypeFilter from "./components/MealTypeFilter/MealTypeFilter";
import AddRecipeForm from "./components/AddRecipeForm/AddRecipeForm";
import recipesData from "./data/recipes";
import './styles/App.css';
import './index.css';
import { Routes, Route } from "react-router-dom";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import EditRecipeForm from "./components/EditRecipeForm/EditRecipeForm";
import WeekPlanner from "./components/WeekPlanner/WeekPlanner";
import Header from "./components/Header/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ Import Spoonacular component
import ImportFromSpoonacular from "./components/ImportFromSpoonacular/ImportFromSpoonacular";

export default function App() {
  const [ingredients, setIngredients] = useState(() => {
    const saved = localStorage.getItem("ingredients");
    return saved ? JSON.parse(saved) : [];
  });

  const [allergies, setAllergies] = useState(() => {
    const saved = localStorage.getItem("allergies");
    return saved ? JSON.parse(saved) : [];
  });

  const [mealType, setMealType] = useState("");
  const [allRecipes, setAllRecipes] = useState(() => {
    // Temporarily force loading from file to see new recipes
    return recipesData;
    // const saved = localStorage.getItem("allRecipes");
    // return saved ? JSON.parse(saved) : recipesData;
  });

  const [filteredRecipes, setFilteredRecipes] = useState(allRecipes);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showingAll, setShowingAll] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);

  const [shoppingList, setShoppingList] = useState(() => {
    const saved = localStorage.getItem("shoppingList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  }, [shoppingList]);

  function countMissingIngredients(recipeIngredients, pantry) {
    return recipeIngredients.filter((recipeIng) => {
      const recipeName = typeof recipeIng === "string" ? recipeIng.toLowerCase().trim() : recipeIng.name.toLowerCase().trim();
      return !pantry.some((item) => item.toLowerCase().trim() === recipeName);
    }).length;
  }

  useEffect(() => {
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
    localStorage.setItem("allergies", JSON.stringify(allergies));
    localStorage.setItem("allRecipes", JSON.stringify(allRecipes));

    let filtered = showingAll ? allRecipes : allRecipes.filter((recipe) => {
      const missingCount = countMissingIngredients(recipe.ingredients, ingredients);
      const matchesIngredients = ingredients.length === 0 || missingCount <= 2;
      const matchesAllergies = allergies.length === 0 || !recipe.allergies.some((a) => allergies.includes(a));
      const matchesMealType = mealType === "" || recipe.category === mealType;
      return matchesIngredients && matchesAllergies && matchesMealType;
    });

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(term) ||
          recipe.ingredients.some((ing) => {
            const name = typeof ing === "string" ? ing : ing.name || "";
            return name.toLowerCase().includes(term);
          })
      );
    }

    setFilteredRecipes(filtered);
  }, [ingredients, allergies, mealType, allRecipes, searchTerm, showingAll]);

  const addIngredient = (newIngredient) => {
    if (!ingredients.includes(newIngredient.toLowerCase())) {
      setIngredients([...ingredients, newIngredient.toLowerCase()]);
    }
  };

  const deleteIngredient = (ingredientToDelete) => {
    setIngredients(ingredients.filter((item) => item !== ingredientToDelete));
  };

  const toggleAllergy = (allergy) => {
    if (allergies.includes(allergy)) {
      setAllergies(allergies.filter((a) => a !== allergy));
    } else {
      setAllergies([...allergies, allergy]);
    }
  };

  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

  const addUserRecipe = (newRecipe) => {
    const updated = [...allRecipes, newRecipe];
    setAllRecipes(updated);
    setFilteredRecipes(updated);
    localStorage.setItem("allRecipes", JSON.stringify(updated));
  };

  const handleDeleteRecipe = (id) => {
    const updatedRecipes = allRecipes.filter(recipe => recipe.id !== id);
    setAllRecipes(updatedRecipes);
    setFilteredRecipes(updatedRecipes);
    localStorage.setItem("allRecipes", JSON.stringify(updatedRecipes));
  };

  const startEditingRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setShowForm(false);
  };

  const updateRecipe = (updatedRecipe) => {
    const updatedAllRecipes = allRecipes.map(r =>
      r.id === updatedRecipe.id ? updatedRecipe : r
    );
    setAllRecipes(updatedAllRecipes);
    setFilteredRecipes(updatedAllRecipes);
    setEditingRecipe(null);
  };

  const cancelEditing = () => {
    setEditingRecipe(null);
  };

  const handleAddToShoppingList = (missingItems) => {
    setShoppingList((prev) => {
      const updated = [...prev];
      let addedCount = 0;

      missingItems.forEach(item => {
        if (!updated.find(i => i.name.toLowerCase() === item.name.toLowerCase())) {
          updated.push(item);
          addedCount++;
        }
      });

      if (addedCount > 0) {
        toast.success(`${addedCount} item${addedCount > 1 ? "s" : ""} added to shopping list.`);
      } else {
        toast.info("All missing ingredients are already in the shopping list.");
      }

      return updated;
    });
  };

  return (
    <div className="app-container">
      <Header />
      <h2>Recipe Manager</h2>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <IngredientInput onAddIngredient={addIngredient} />
              <div className="layout-container">
                <div className="left-panel">
                  <h2>Ingredients in your cupboard:</h2>
                  <ul className="ingredient-list">
                    {ingredients.map((item) => (
                      <li key={item}>
                        {item}
                        <button
                          onClick={() => deleteIngredient(item)}
                          className="delete-button"
                          aria-label={`Delete ${item}`}
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="right-panel">
                  <AllergyFilter
                    selectedAllergies={allergies}
                    onToggleAllergy={toggleAllergy}
                  />

                  <MealTypeFilter
                    selectedType={mealType}
                    onSelectType={setMealType}
                  />

                  <input
                    type="search"
                    placeholder="Search recipes by name or ingredient..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      padding: "0.6rem",
                      fontSize: "1rem",
                      width: "100%",
                      maxWidth: "400px",
                      marginBottom: "1rem",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                    aria-label="Search recipes"
                  />

                  <div className="filter-buttons">
                    <button
                      onClick={() => {
                        setAllergies([]);
                        setMealType("");
                      }}
                      className="clear-button"
                    >
                      Clear All Filters
                    </button>

                    <button
                      onClick={() => setShowingAll(allRecipes)}
                      className="show-all-button"
                    >
                      Show All Recipes
                    </button>
                    {showingAll && (
                      <button
                        onClick={() => setShowingAll(false)}
                        className="clear-button"
                      >
                        Back to Filtered View
                      </button>
                    )}
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <button onClick={toggleForm} className="add-new-button">
                      {showForm ? "Close Recipe Form" : "Add New Recipe"}
                    </button>

                    {editingRecipe ? (
                      <EditRecipeForm
                        initialRecipe={editingRecipe}
                        onUpdateRecipe={updateRecipe}
                        onCancel={cancelEditing}
                      />
                    ) : (
                      showForm && <AddRecipeForm onAddRecipe={addUserRecipe} />
                    )}

                  </div>

                  <RecipeList
                    recipes={filteredRecipes}
                    onDeleteRecipe={handleDeleteRecipe}
                    onEditRecipe={startEditingRecipe}
                    pantryIngredients={ingredients}
                    onAddMissingToList={handleAddToShoppingList}
                  />
                </div>
              </div>
              <ToastContainer />
            </>
          }
        />
        <Route
          path="/recipe/:id"
          element={<RecipeDetails recipes={allRecipes} />}
        />
        <Route path="/week-planner" element={<WeekPlanner recipes={allRecipes} />} />
      </Routes>
    </div>
  );
}

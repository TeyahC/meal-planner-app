import React, { useState, useEffect } from "react";
import IngredientInput from "./components/IngredientInput/IngredientInput";
import AllergyFilter from "./components/AllergyFilter/AllergyFilter";
import RecipeList from "./components/RecipeList/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm/AddRecipeForm";
import EditRecipeForm from "./components/EditRecipeForm/EditRecipeForm";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import WeekPlanner from "./components/WeekPlanner/WeekPlanner";
import Header from "./components/Header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { supabase } from "./lib/supabase";
import "./styles/App.css";
import "./index.css";

export default function App() {
  const [ingredients, setIngredients] = useState(() => {
    const saved = localStorage.getItem("ingredients");
    return saved ? JSON.parse(saved) : [];
  });
  const [allergies, setAllergies] = useState(() => {
    const saved = localStorage.getItem("allergies");
    return saved ? JSON.parse(saved) : [];
  });
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);

  // Fetch recipes once
  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase.from("recipes").select("*");
      if (!error && data) {
        // Parse JSON fields only once
        const parsed = data.map((r) => ({
          ...r,
          ingredients:
            typeof r.ingredients === "string"
              ? JSON.parse(r.ingredients)
              : r.ingredients || [],
          allergies:
            typeof r.allergies === "string"
              ? JSON.parse(r.allergies)
              : r.allergies || [],
        }));
        setAllRecipes(parsed);
      } else {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  // Filter recipes dynamically based on ingredients, allergies, searchTerm
  useEffect(() => {
    if (!allRecipes.length) return;

    const term = searchTerm.toLowerCase();

    const filtered = allRecipes.filter((r) => {
      // Ingredient filter: allow up to 2 missing ingredients
      const missingCount = r.ingredients.filter((ing) => {
        const name =
          typeof ing === "string"
            ? ing.toLowerCase().trim()
            : ing.name.toLowerCase().trim();
        return !ingredients.some((i) => i.toLowerCase().trim() === name);
      }).length;
      const matchesIngredients = ingredients.length === 0 || missingCount <= 2;

      // Allergy filter (case-insensitive)
      // Allergy filter: exclude recipes that contain any selected allergy
      const normalizedRecipeAllergies = (r.allergies || []).map((a) =>
        a.toLowerCase()
      );
      const normalizedAllergies = (allergies || []).map((a) => a.toLowerCase());
      const matchesAllergies =
        normalizedAllergies.length === 0 ||
        !normalizedRecipeAllergies.some((a) => normalizedAllergies.includes(a));

      // Search filter: recipe name or ingredients
      const matchesSearch =
        term === "" ||
        r.name.toLowerCase().includes(term) ||
        r.ingredients.some((ing) => {
          const name = typeof ing === "string" ? ing : ing.name || "";
          return name.toLowerCase().includes(term);
        });

      return matchesIngredients && matchesAllergies && matchesSearch;
    });

    setFilteredRecipes(filtered);
  }, [ingredients, allergies, searchTerm, allRecipes]);

  // persist ingredients and allergies
  useEffect(() => {
    localStorage.setItem("ingredients", JSON.stringify(ingredients || []));
  }, [ingredients]);
  useEffect(() => {
    localStorage.setItem("allergies", JSON.stringify(allergies || []));
  }, [allergies]);

  // Handlers
  const addIngredient = (newIng) => {
    const lower = newIng.toLowerCase();
    if (!ingredients.includes(lower)) setIngredients([...ingredients, lower]);
  };
  const deleteIngredient = (ing) =>
    setIngredients(ingredients.filter((i) => i !== ing));
  const toggleAllergy = (allergy) =>
    setAllergies(
      allergies.includes(allergy)
        ? allergies.filter((a) => a !== allergy)
        : [...allergies, allergy]
    );
  const toggleForm = () => setShowForm((prev) => !prev);
  const clearFilters = () => {
    setIngredients([]);
    setAllergies([]);
    setSearchTerm("");
    // localStorage will be updated by effects that watch these states
  };
  const addUserRecipe = (recipe) => setAllRecipes([...allRecipes, recipe]);
  const handleDeleteRecipe = (id) =>
    setAllRecipes(allRecipes.filter((r) => r.id !== id));
  const startEditingRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setShowForm(false);
  };
  const updateRecipe = (updatedRecipe) => {
    const updated = allRecipes.map((r) =>
      r.id === updatedRecipe.id ? updatedRecipe : r
    );
    setAllRecipes(updated);
    setEditingRecipe(null);
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
              <IngredientInput
                onAddIngredient={addIngredient}
                availableIngredients={allRecipes
                  .flatMap((r) =>
                    (r.ingredients || []).map((i) =>
                      typeof i === "string" ? i : i.name
                    )
                  )
                  .filter(Boolean)}
              />
              <div className="layout-container">
                <div className="left-panel">
                  <h2>Ingredients in your cupboard:</h2>
                  <ul className="ingredient-list">
                    {ingredients.map((i) => (
                      <li key={i}>
                        {i}{" "}
                        <button onClick={() => deleteIngredient(i)}>✕</button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="right-panel">
                  <AllergyFilter
                    selectedAllergies={allergies}
                    onToggleAllergy={toggleAllergy}
                  />
                  <input
                    type="search"
                    placeholder="Search recipes by name or ingredient..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      padding: "0.6rem",
                      width: "100%",
                      maxWidth: "400px",
                      marginBottom: "1rem",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <div style={{ marginBottom: "2rem" }}>
                    <button onClick={toggleForm}>
                      {showForm ? "Close Recipe Form" : "Add New Recipe"}
                    </button>
                    <button onClick={clearFilters} style={{ marginLeft: 8 }}>
                      Clear Filters / Show All Recipes
                    </button>
                    {editingRecipe ? (
                      <EditRecipeForm
                        initialRecipe={editingRecipe}
                        onUpdateRecipe={updateRecipe}
                        onCancel={() => setEditingRecipe(null)}
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
                    onAddMissingToList={(missing) =>
                      console.log("Add missing:", missing)
                    }
                    // provide a flat list of known ingredients for suggestions
                    availableIngredients={allRecipes
                      .flatMap((r) =>
                        (r.ingredients || []).map((i) =>
                          typeof i === "string" ? i : i.name
                        )
                      )
                      .filter(Boolean)}
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
        <Route
          path="/week-planner"
          element={<WeekPlanner recipes={allRecipes} />}
        />
      </Routes>
    </div>
  );
}

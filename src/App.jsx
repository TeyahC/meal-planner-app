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
  const [shoppingList, setShoppingList] = useState(() => {
    const saved = localStorage.getItem("shoppingList");
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch recipes from Supabase
  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase.from("recipes").select("*");
      if (!error && data) {
        const parsedData = data.map((r) => ({
          ...r,
          ingredients:
            typeof r.ingredients === "string"
              ? JSON.parse(r.ingredients)
              : r.ingredients,
          allergies:
            typeof r.allergies === "string"
              ? JSON.parse(r.allergies)
              : r.allergies,
        }));
        setAllRecipes(parsedData);
        setFilteredRecipes(parsedData);
      } else {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  }, [shoppingList]);

  const countMissingIngredients = (recipeIngredients, pantry) =>
    recipeIngredients.filter((ri) => {
      const name =
        typeof ri === "string"
          ? ri.toLowerCase().trim()
          : ri.name?.toLowerCase().trim() || "";
      return !pantry.some((p) => p.toLowerCase().trim() === name);
    }).length;

  // Filter recipes whenever ingredients, allergies, search, or recipes change
  useEffect(() => {
    if (!allRecipes.length) return;

    let filtered = allRecipes.filter((r) => {
      // Ingredient match: allow up to 2 missing
      const missingCount = countMissingIngredients(r.ingredients, ingredients);
      const matchesIngredients = ingredients.length === 0 || missingCount <= 2;

      // Allergy match
      const matchesAllergies =
        allergies.length === 0 ||
        !r.allergies.some((a) =>
          allergies.map((x) => x.toLowerCase()).includes(a.toLowerCase())
        );

      return matchesIngredients && matchesAllergies;
    });

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(term) ||
          r.ingredients.some((ing) => {
            const name = typeof ing === "string" ? ing : ing.name || "";
            return name.toLowerCase().includes(term);
          })
      );
    }

    setFilteredRecipes(filtered);
  }, [ingredients, allergies, searchTerm, allRecipes]);

  // Handlers
  const addIngredient = (newIng) => {
    if (!ingredients.includes(newIng.toLowerCase()))
      setIngredients([...ingredients, newIng.toLowerCase()]);
  };
  const deleteIngredient = (ing) =>
    setIngredients(ingredients.filter((i) => i !== ing));
  const toggleAllergy = (allergy) => {
    setAllergies(
      allergies.includes(allergy)
        ? allergies.filter((a) => a !== allergy)
        : [...allergies, allergy]
    );
  };
  const toggleForm = () => setShowForm((prev) => !prev);
  const addUserRecipe = (recipe) => {
    const updated = [...allRecipes, recipe];
    setAllRecipes(updated);
    setFilteredRecipes(updated);
  };
  const handleDeleteRecipe = (id) => {
    const updated = allRecipes.filter((r) => r.id !== id);
    setAllRecipes(updated);
    setFilteredRecipes(updated);
  };
  const startEditingRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setShowForm(false);
  };
  const updateRecipe = (updatedRecipe) => {
    const updated = allRecipes.map((r) =>
      r.id === updatedRecipe.id ? updatedRecipe : r
    );
    setAllRecipes(updated);
    setFilteredRecipes(updated);
    setEditingRecipe(null);
  };
  const cancelEditing = () => setEditingRecipe(null);
  const handleAddToShoppingList = (items) => {
    setShoppingList((prev) => {
      const updated = [...prev];
      let count = 0;
      items.forEach((i) => {
        if (
          !updated.find((x) => x.name.toLowerCase() === i.name.toLowerCase())
        ) {
          updated.push(i);
          count++;
        }
      });
      if (count > 0)
        toast.success(
          `${count} item${count > 1 ? "s" : ""} added to shopping list.`
        );
      else
        toast.info("All missing ingredients are already in the shopping list.");
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
                    {ingredients.map((i) => (
                      <li key={i}>
                        {i}
                        <button
                          onClick={() => deleteIngredient(i)}
                          className="delete-button"
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
        <Route
          path="/week-planner"
          element={<WeekPlanner recipes={allRecipes} />}
        />
      </Routes>
    </div>
  );
}

import React, { useState } from "react";
import { searchRecipes, getRecipeDetails } from "../../api/spoonacular";
import { v4 as uuidv4 } from "uuid";

export default function ImportFromSpoonacular({ onAddRecipe }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const recipes = await searchRecipes(query);
        setResults(recipes);
    };

    const handleImport = async (id) => {
        const details = await getRecipeDetails(id);
        const formattedRecipe = {
            id: uuidv4(),
            name: details.title,
            category: "lunch", // default or detect based on dishTypes
            ingredients: details.extendedIngredients.map((ing) => ({
                name: ing.name,
                quantity: ing.amount,
                unit: ing.unit,
            })),
            allergies: [], // user can edit later
            instructions: details.instructions || "",
        };
        onAddRecipe(formattedRecipe);
    };

    return (
        <div>
            <h3>Import Recipes from Spoonacular</h3>
            <input
                type="text"
                placeholder="Search for recipes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map((recipe) => (
                    <li key={recipe.id}>
                        {recipe.title}{" "}
                        <button onClick={() => handleImport(recipe.id)}>Import</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

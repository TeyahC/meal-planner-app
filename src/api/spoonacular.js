const API_KEY = "53dd788cb65e4fe885cdee83ce7e84e4";
const BASE_URL = "https://api.spoonacular.com/recipes";

export async function searchRecipes(query) {
    const response = await fetch(
        `${BASE_URL}/complexSearch?query=${encodeURIComponent(query)}&number=10&addRecipeInformation=true&apiKey=${API_KEY}`
    );
    const data = await response.json();
    return data.results;
}

export async function getRecipeDetails(recipeId) {
    const response = await fetch(`${BASE_URL}/${recipeId}/information?apiKey=${API_KEY}`);
    const data = await response.json();
    return data;
}

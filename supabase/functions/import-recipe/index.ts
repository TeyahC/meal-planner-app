// @ts-nocheck
import { serve } from "https://deno.land/std/http/server.ts";

// Allowed origins (localhost for dev, add your Netlify URL for production)
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "https://your-netlify-site.netlify.app", // replace with your production URL
];

serve(async (req) => {
  const origin = req.headers.get("origin") || "";

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin)
      ? origin
      : "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, x-client-info, apikey",
  };

  // Preflight handling
  if (req.method === "OPTIONS") {
    return new Response(null, { headers });
  }

  try {
    // Parse request body
    const { url } = await req.json();
    if (!url) {
      return new Response(JSON.stringify({ error: "No URL provided" }), {
        status: 400,
        headers,
      });
    }

    // Hardcoded Spoonacular key for dev
    const SPOONACULAR_API_KEY = "53dd788cb65e4fe885cdee83ce7e84e4";

    // Fetch recipe from Spoonacular
    const apiRes = await fetch(
      `https://api.spoonacular.com/recipes/extract?url=${encodeURIComponent(
        url
      )}&apiKey=${SPOONACULAR_API_KEY}`
    );

    if (!apiRes.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch recipe" }), {
        status: 500,
        headers,
      });
    }

    const data = await apiRes.json();

    // Normalize ingredients for AddRecipeForm
    const ingredients = (data.extendedIngredients || []).map((i) => {
      const original = i.original || "";
      const match = original.match(/^([\d./]+)?\s*([a-zA-Z]+)?\s*(.+)$/);
      if (match) {
        const quantity = match[1] ? parseFloat(match[1]) : 1;
        const unit = match[2] || "unit";
        const name = match[3];
        return { quantity, unit, name };
      }
      return { quantity: 1, unit: "unit", name: original };
    });

    // Return full recipe JSON
    return new Response(
      JSON.stringify({
        name: data.title || "",
        ingredients,
        instructions: data.instructions || "",
        servings: data.servings || 1,
        calories:
          data.nutrition?.nutrients?.find((n) => n.name === "Calories")
            ?.amount || null,
        protein:
          data.nutrition?.nutrients?.find((n) => n.name === "Protein")
            ?.amount || null,
      }),
      { headers }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "Error extracting recipe",
        details: err.message,
      }),
      { status: 500, headers }
    );
  }
});

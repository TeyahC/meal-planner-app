import React, { useState, useEffect, useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { supabase } from "../../lib/supabase";
import "../../styles/WeekPlanner.css";

export default function WeekPlanner() {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const createEmptyWeekPlanner = () =>
    days.reduce((acc, day) => {
      acc[day] = [];
      return acc;
    }, {});

  const [planner, setPlanner] = useState(() => {
    const saved = localStorage.getItem("multiWeekPlanner");
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.values(parsed).forEach((week) =>
        days.forEach((day) => {
          if (!Array.isArray(week[day])) week[day] = [];
        })
      );
      return parsed;
    }
    return { week1: createEmptyWeekPlanner() };
  });

  const [currentWeek, setCurrentWeek] = useState(
    () => localStorage.getItem("currentWeek") || "week1"
  );
  const [portions, setPortions] = useState(() => {
    const saved = localStorage.getItem("plannerPortions");
    return saved ? parseInt(saved, 10) : 1;
  });

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Shopping list state
  const [removedIngredients, setRemovedIngredients] = useState([]);

  // Fetch recipes from Supabase
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

  // Persist planner and portions
  useEffect(() => {
    localStorage.setItem("multiWeekPlanner", JSON.stringify(planner));
  }, [planner]);
  useEffect(() => {
    localStorage.setItem("currentWeek", currentWeek);
  }, [currentWeek]);
  useEffect(() => {
    localStorage.setItem("plannerPortions", portions.toString());
  }, [portions]);

  const handleRemoveRecipe = (day, index) => {
    setPlanner((prev) => ({
      ...prev,
      [currentWeek]: {
        ...prev[currentWeek],
        [day]: prev[currentWeek][day].filter((_, i) => i !== index),
      },
    }));
  };

  const handlePortionsChange = (day, index, newPortions) => {
    if (newPortions < 1) return;
    setPlanner((prev) => {
      const updated = [...prev[currentWeek][day]];
      updated[index] = { ...updated[index], portions: newPortions };
      return {
        ...prev,
        [currentWeek]: { ...prev[currentWeek], [day]: updated },
      };
    });
  };

  const handleDragEnd = ({ source, destination, draggableId }) => {
    if (!destination) return;
    if (destination.droppableId === "recipe-list") return;

    const recipeId = draggableId;
    const recipe = recipes.find((r) => r.id.toString() === recipeId);
    if (!recipe) return;

    // From sidebar → day
    if (source.droppableId === "recipe-list") {
      const day = destination.droppableId;
      setPlanner((prev) => ({
        ...prev,
        [currentWeek]: {
          ...prev[currentWeek],
          [day]: [...prev[currentWeek][day], { recipe, portions: 1 }],
        },
      }));
      return;
    }

    // Day → day reorder
    const sourceDay = source.droppableId;
    const destDay = destination.droppableId;

    setPlanner((prev) => {
      const sourceList = Array.from(prev[currentWeek][sourceDay]);
      const destList = Array.from(prev[currentWeek][destDay]);
      const [moved] = sourceList.splice(source.index, 1);
      destList.splice(destination.index, 0, moved);
      return {
        ...prev,
        [currentWeek]: {
          ...prev[currentWeek],
          [sourceDay]: sourceDay === destDay ? destList : sourceList,
          [destDay]: destList,
        },
      };
    });
  };

  // Calculate aggregated shopping list
  const ingredientTotals = useMemo(() => {
    const totals = {};
    Object.values(planner[currentWeek]).forEach((dayRecipes) => {
      dayRecipes.forEach(({ recipe, portions: recipePortions }) => {
        recipe.ingredients.forEach(({ name, unit, quantity }) => {
          const key = `${name}-${unit}`;
          const qty = (quantity || 0) * recipePortions * portions;
          if (totals[key]) {
            totals[key].quantity += qty;
          } else {
            totals[key] = { name, unit, quantity: qty };
          }
        });
      });
    });
    return totals;
  }, [planner, currentWeek, portions]);

  if (loading) return <p>Loading recipes...</p>;

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="planner-layout">
          <div className="week-grid">
            {days.map((day) => (
              <div key={day} className="day-column">
                <h3>{day}</h3>
                <Droppable droppableId={day}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="meal-slot"
                    >
                      <strong>Dinner</strong>
                      {planner[currentWeek][day].map(
                        ({ recipe, portions: recipePortions }, index) => (
                          <Draggable
                            key={`${recipe.id}-${day}-${index}`}
                            draggableId={recipe.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="assigned-recipe"
                              >
                                <div className="top-row">
                                  <span>{recipe.name}</span>
                                  <button
                                    onClick={() =>
                                      handleRemoveRecipe(day, index)
                                    }
                                  >
                                    ✖
                                  </button>
                                </div>
                                <label>
                                  Portions:
                                  <input
                                    type="number"
                                    min="1"
                                    value={recipePortions}
                                    onChange={(e) =>
                                      handlePortionsChange(
                                        day,
                                        index,
                                        parseInt(e.target.value, 10)
                                      )
                                    }
                                  />
                                </label>
                              </div>
                            )}
                          </Draggable>
                        )
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>

          <div className="recipe-sidebar">
            <h3>All Recipes</h3>
            <Droppable droppableId="recipe-list" isDropDisabled>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {recipes.map((recipe, index) => (
                    <Draggable
                      key={recipe.id}
                      draggableId={recipe.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="draggable-recipe"
                        >
                          <h4>{recipe.name}</h4>
                          <p>
                            <strong>Calories:</strong> {recipe.calories || 0}{" "}
                            kcal
                          </p>
                          <p>
                            <strong>Protein:</strong> {recipe.protein || 0} g
                          </p>
                          {recipe.allergies?.length > 0 && (
                            <p>
                              <strong>Allergies:</strong>{" "}
                              {recipe.allergies.join(", ")}
                            </p>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>

      {/* Global portion selector */}
      <div className="portion-selector">
        <label htmlFor="portion-selector">
          Number of people (global multiplier):
        </label>
        <select
          id="portion-selector"
          value={portions}
          onChange={(e) => setPortions(parseInt(e.target.value, 10))}
          className="portion-select"
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Shopping list */}
      <div className="shopping-list">
        <h3>Shopping List</h3>
        {Object.keys(ingredientTotals).length === 0 ? (
          <p>No ingredients selected yet.</p>
        ) : (
          <>
            <ul>
              {Object.entries(ingredientTotals)
                .filter(([key]) => !removedIngredients.includes(key))
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map(([key, { name, quantity, unit }], index) => (
                  <li key={index}>
                    {name} —{" "}
                    <strong>
                      {Number.isInteger(quantity)
                        ? quantity
                        : quantity.toFixed(2)}
                      {unit}
                    </strong>
                    <button
                      onClick={() =>
                        setRemovedIngredients((prev) => [...prev, key])
                      }
                      className="remove-ingredients-button"
                      aria-label={`Remove ${name} from shopping list`}
                    >
                      ✖
                    </button>
                  </li>
                ))}
            </ul>
            {removedIngredients.length > 0 && (
              <button
                onClick={() => setRemovedIngredients([])}
                className="reset-remove-button"
              >
                Reset Removed Items
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}

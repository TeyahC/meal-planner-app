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

  const [recipes, setRecipes] = useState([]);
  const [planner, setPlanner] = useState(createEmptyWeekPlanner());
  const [currentWeekId, setCurrentWeekId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [portions, setPortions] = useState(1);

  // Fetch recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) console.error(error);
      else setRecipes(data || []);
    };
    fetchRecipes();
  }, []);

  // Fetch or create current week
  useEffect(() => {
    const fetchOrCreateWeek = async () => {
      setLoading(true);
      // Find the latest week
      const { data, error } = await supabase
        .from("week_planner")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error(error);
        // If no weeks exist, create one
        const { data: newWeek, error: createError } = await supabase
          .from("week_planner")
          .insert([{ planner: createEmptyWeekPlanner() }])
          .select()
          .single();

        if (createError) console.error(createError);
        else {
          setPlanner(newWeek.planner);
          setCurrentWeekId(newWeek.id);
        }
      } else {
        setPlanner(data.planner);
        setCurrentWeekId(data.id);
      }
      setLoading(false);
    };

    fetchOrCreateWeek();
  }, []);

  // Save planner changes to Supabase
  const savePlanner = async (newPlanner) => {
    if (!currentWeekId) return;
    const { error } = await supabase
      .from("week_planner")
      .update({ planner: newPlanner })
      .eq("id", currentWeekId);
    if (error) console.error("Error saving week:", error);
  };

  const handleDragEnd = ({ source, destination, draggableId }) => {
    if (!destination) return;
    if (destination.droppableId === "recipe-list") return;

    const recipe = recipes.find((r) => r.id.toString() === draggableId);
    if (!recipe) return;

    if (source.droppableId === "recipe-list") {
      const day = destination.droppableId;
      const newPlanner = {
        ...planner,
        [day]: [...planner[day], { recipe, portions: 1 }],
      };
      setPlanner(newPlanner);
      savePlanner(newPlanner);
      return;
    }

    // Day → day reorder
    const sourceDay = source.droppableId;
    const destDay = destination.droppableId;
    const newPlanner = { ...planner };
    const [moved] = newPlanner[sourceDay].splice(source.index, 1);
    newPlanner[destDay].splice(destination.index, 0, moved);
    setPlanner(newPlanner);
    savePlanner(newPlanner);
  };

  const handleRemoveRecipe = (day, index) => {
    const newPlanner = { ...planner };
    newPlanner[day].splice(index, 1);
    setPlanner(newPlanner);
    savePlanner(newPlanner);
  };

  const handlePortionsChange = (day, index, newPortions) => {
    if (newPortions < 1) return;
    const newPlanner = { ...planner };
    newPlanner[day][index].portions = newPortions;
    setPlanner(newPlanner);
    savePlanner(newPlanner);
  };

  const ingredientTotals = useMemo(() => {
    const totals = {};
    Object.values(planner).forEach((dayRecipes) => {
      dayRecipes.forEach(({ recipe, portions: recipePortions }) => {
        recipe.ingredients.forEach(({ name, unit, quantity }) => {
          const key = `${name}-${unit}`;
          const qty = (quantity || 0) * recipePortions * portions;
          if (totals[key]) totals[key].quantity += qty;
          else totals[key] = { name, unit, quantity: qty };
        });
      });
    });
    return totals;
  }, [planner, portions]);

  if (loading) return <p>Loading week planner...</p>;

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
                      {planner[day].map(
                        ({ recipe, portions: rPortions }, idx) => (
                          <Draggable
                            key={`${recipe.id}-${day}-${idx}`}
                            draggableId={recipe.id.toString()}
                            index={idx}
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
                                    onClick={() => handleRemoveRecipe(day, idx)}
                                  >
                                    ✖
                                  </button>
                                </div>
                                <label>
                                  Portions:
                                  <input
                                    type="number"
                                    min="1"
                                    value={rPortions}
                                    onChange={(e) =>
                                      handlePortionsChange(
                                        day,
                                        idx,
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

      <div className="portion-selector">
        <label>Number of people (global multiplier):</label>
        <select
          value={portions}
          onChange={(e) => setPortions(parseInt(e.target.value, 10))}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="shopping-list">
        <h3>Shopping List</h3>
        {Object.keys(ingredientTotals).length === 0 ? (
          <p>No ingredients selected yet.</p>
        ) : (
          <ul>
            {Object.entries(ingredientTotals).map(
              ([key, { name, quantity, unit }]) => (
                <li key={key}>
                  {name} —{" "}
                  {Number.isInteger(quantity) ? quantity : quantity.toFixed(2)}{" "}
                  {unit}
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </>
  );
}

import React, { useState, useEffect, useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { supabase } from "../../lib/supabase";
import "../../styles/WeekPlanner.css";
import AllergyFilter from "../AllergyFilter/AllergyFilter";

export default function WeekPlanner() {
  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const createEmptyWeekPlanner = () =>
    days.reduce((acc, day) => {
      acc[day] = [];
      return acc;
    }, {});

  const [recipes, setRecipes] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [planner, setPlanner] = useState(createEmptyWeekPlanner());
  const [currentWeekId, setCurrentWeekId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [portions, setPortions] = useState(1);
  const [editingWeekId, setEditingWeekId] = useState(null);
  const [weekNameInput, setWeekNameInput] = useState("");
  const [removedShoppingItems, setRemovedShoppingItems] = useState(new Set());

  // Search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  // Load recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) console.error(error);
      else {
        const parsed = (data || []).map((r) => ({
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
        setRecipes(parsed);
      }
    };
    fetchRecipes();
  }, []);

  // Load weeks
  useEffect(() => {
    const fetchWeeks = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("week_planner")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) console.error(error);
      else {
        setWeeks(data || []);
        const savedWeekId = localStorage.getItem("currentWeekId");
        const weekToLoad =
          data?.find((w) => w.id.toString() === savedWeekId) || data?.[0];
        if (weekToLoad) loadWeek(weekToLoad);
        else createNewWeek();
      }
      setLoading(false);
    };
    fetchWeeks();
  }, []);

  const loadWeek = (week) => {
    setCurrentWeekId(week.id);
    setPlanner(week.planner || createEmptyWeekPlanner());
    setWeekNameInput(week.name || "Unnamed Week");
  };

  const savePlanner = async (newPlanner) => {
    if (!currentWeekId) return;
    const { error } = await supabase
      .from("week_planner")
      .update({ planner: newPlanner, updated_at: new Date() })
      .eq("id", currentWeekId);
    if (error) console.error("Error saving week:", error);
  };

  const createNewWeek = async () => {
    setLoading(true);
    const { data: newWeek, error } = await supabase
      .from("week_planner")
      .insert([{ name: "New Week", planner: createEmptyWeekPlanner() }])
      .select()
      .single();
    if (error) console.error(error);
    else {
      setWeeks((prev) => [newWeek, ...prev]);
      loadWeek(newWeek);
      localStorage.setItem("currentWeekId", newWeek.id);
    }
    setLoading(false);
  };

  const switchWeek = (weekId) => {
    localStorage.setItem("currentWeekId", weekId);
    window.location.reload();
  };

  const renameWeek = async (weekId, newName) => {
    if (!newName.trim()) return;
    const { error } = await supabase
      .from("week_planner")
      .update({ name: newName, updated_at: new Date() })
      .eq("id", weekId);
    if (error) console.error(error);
    else
      setWeeks((prev) =>
        prev.map((w) => (w.id === weekId ? { ...w, name: newName } : w))
      );
  };

  const deleteWeek = async (weekId) => {
    const { error } = await supabase
      .from("week_planner")
      .delete()
      .eq("id", weekId);
    if (error) console.error(error);
    else {
      const remainingWeeks = weeks.filter((w) => w.id !== weekId);
      setWeeks(remainingWeeks);
      localStorage.removeItem("currentWeekId");
      if (remainingWeeks.length) loadWeek(remainingWeeks[0]);
      else createNewWeek();
    }
  };

  const handleDragEnd = ({ source, destination, draggableId }) => {
    if (!destination || destination.droppableId === "recipe-list") return;
    const recipe = recipes.find((r) => r.id.toString() === draggableId);
    if (!recipe) return;

    const newPlanner = { ...planner };

    if (source.droppableId === "recipe-list") {
      newPlanner[destination.droppableId] = [
        ...newPlanner[destination.droppableId],
        { recipe, portions: 1 },
      ];
    } else {
      const [moved] = newPlanner[source.droppableId].splice(source.index, 1);
      newPlanner[destination.droppableId].splice(destination.index, 0, moved);
    }

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
      dayRecipes.forEach(({ recipe, portions: rPortions }) => {
        (recipe.ingredients || []).forEach(({ name, unit, quantity }) => {
          const key = `${name}-${unit}`;
          const qty = (quantity || 0) * rPortions * portions;
          if (!removedShoppingItems.has(key)) {
            totals[key] = totals[key]
              ? { ...totals[key], quantity: totals[key].quantity + qty }
              : { name, unit, quantity: qty };
          }
        });
      });
    });
    return totals;
  }, [planner, portions, removedShoppingItems]);

  const removeShoppingItem = (key) => {
    setRemovedShoppingItems((prev) => new Set(prev).add(key));
  };

  const resetShoppingList = () => {
    setRemovedShoppingItems(new Set());
  };

  if (loading) return <p>Loading week planner...</p>;

  return (
    <div className="planner-container">
      {/* Week Selector */}
      <div className="week-selector">
        {weeks.map((w) => (
          <div key={w.id} className="week-button-wrapper">
            <button
              className={`week-button ${
                currentWeekId === w.id ? "active" : ""
              }`}
            >
              {editingWeekId === w.id ? (
                <input
                  type="text"
                  value={weekNameInput}
                  autoFocus
                  onChange={(e) => setWeekNameInput(e.target.value)}
                  onBlur={() => {
                    renameWeek(w.id, weekNameInput);
                    setEditingWeekId(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      renameWeek(w.id, weekNameInput);
                      setEditingWeekId(null);
                    }
                  }}
                />
              ) : (
                <span
                  className="week-name"
                  onClick={() => {
                    if (editingWeekId === null) switchWeek(w.id);
                  }}
                >
                  {w.name || "Unnamed Week"}
                </span>
              )}
            </button>

            {editingWeekId !== w.id && (
              <button
                className="edit-week-button"
                onClick={() => {
                  setEditingWeekId(w.id);
                  setWeekNameInput(w.name || "Unnamed Week");
                }}
              >
                ✏️
              </button>
            )}

            <button
              className="delete-week-button"
              onClick={() => deleteWeek(w.id)}
            >
              🗑
            </button>
          </div>
        ))}
        <button className="add-week-button" onClick={createNewWeek}>
          ➕ Add Week
        </button>
      </div>

      {/* Planner & Sidebar */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="planner-layout">
          {/* Week Grid */}
          <div className="week-grid">
            {days.map((day) => (
              <div key={day} className="day-column">
                <h3>{day}</h3>
                <h4 className="meal-label">Dinner</h4>
                <Droppable droppableId={day}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="meal-slot"
                    >
                      {planner[day]?.length === 0 && (
                        <div className="empty-slot">No recipes</div>
                      )}
                      {planner[day]?.map(
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
                                    className="remove-button"
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

          {/* Recipe Sidebar */}
          <div className="recipe-sidebar">
            <h3>All Recipes</h3>

            {/* Search */}
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

            {/* Allergy Filter */}
            <AllergyFilter
              selectedAllergies={allergies}
              onToggleAllergy={(allergy) =>
                setAllergies((prev) =>
                  prev.includes(allergy)
                    ? prev.filter((a) => a !== allergy)
                    : [...prev, allergy]
                )
              }
            />

            <Droppable droppableId="recipe-list" isDropDisabled>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {recipes
                    .filter((recipe) => {
                      const term = searchTerm.toLowerCase();
                      if (!term) return true;

                      const inName = recipe.name.toLowerCase().includes(term);
                      const inIngredients = (recipe.ingredients || []).some(
                        (ing) => {
                          const name = typeof ing === "string" ? ing : ing.name;
                          return name?.toLowerCase().includes(term);
                        }
                      );
                      return inName || inIngredients;
                    })
                    .map((recipe, index) => (
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
                            <p>
                              <strong>Fibre:</strong> {recipe.fibre || 0} g
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

      {/* Portions */}
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

      {/* Shopping List */}
      <div className="shopping-list">
        <h3>Shopping List</h3>
        {Object.keys(ingredientTotals).length === 0 ? (
          <p>No ingredients selected yet.</p>
        ) : (
          <>
            <ul>
              {Object.entries(ingredientTotals).map(
                ([key, { name, quantity, unit }]) => (
                  <li key={key}>
                    {name} —{" "}
                    {Number.isInteger(quantity)
                      ? quantity
                      : quantity.toFixed(2)}{" "}
                    {unit}
                    <button
                      className="remove-ingredients-button"
                      onClick={() => removeShoppingItem(key)}
                    >
                      ✖
                    </button>
                  </li>
                )
              )}
            </ul>
            <button
              className="reset-remove-buttton"
              onClick={resetShoppingList}
            >
              Reset shopping list
            </button>
          </>
        )}
      </div>
    </div>
  );
}

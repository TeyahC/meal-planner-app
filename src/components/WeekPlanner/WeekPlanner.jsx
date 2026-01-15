import React, { useState, useEffect, useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { supabase } from "../../lib/supabase";
import "../../styles/WeekPlanner.css";

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

  /* ✅ NEW: removed shopping items */
  const [removedShoppingItems, setRemovedShoppingItems] = useState(new Set());

  /* ---------------- LOAD RECIPES ---------------- */
  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) setRecipes(data || []);
    };
    fetchRecipes();
  }, []);

  /* ---------------- LOAD WEEKS ---------------- */
  useEffect(() => {
    const fetchWeeks = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("week_planner")
        .select("*")
        .order("created_at", { ascending: false });

      setWeeks(data || []);

      const savedWeekId = localStorage.getItem("currentWeekId");
      const weekToLoad =
        data?.find((w) => w.id.toString() === savedWeekId) || data?.[0];

      if (weekToLoad) loadWeek(weekToLoad);
      else createNewWeek();

      setLoading(false);
    };
    fetchWeeks();
  }, []);

  const loadWeek = (week) => {
    setCurrentWeekId(week.id);
    setPlanner(week.planner || createEmptyWeekPlanner());
    setWeekNameInput(week.name || "Unnamed Week");
    setRemovedShoppingItems(new Set()); // reset removals on week switch
  };

  const savePlanner = async (newPlanner) => {
    if (!currentWeekId) return;
    await supabase
      .from("week_planner")
      .update({ planner: newPlanner, updated_at: new Date() })
      .eq("id", currentWeekId);
  };

  const createNewWeek = async () => {
    const { data: newWeek } = await supabase
      .from("week_planner")
      .insert([{ name: "New Week", planner: createEmptyWeekPlanner() }])
      .select()
      .single();

    if (newWeek) {
      setWeeks((prev) => [newWeek, ...prev]);
      loadWeek(newWeek);
      localStorage.setItem("currentWeekId", newWeek.id);
    }
  };

  const switchWeek = (weekId) => {
    localStorage.setItem("currentWeekId", weekId);
    window.location.reload();
  };

  const renameWeek = async (weekId, newName) => {
    if (!newName.trim()) return;
    await supabase
      .from("week_planner")
      .update({ name: newName })
      .eq("id", weekId);

    setWeeks((prev) =>
      prev.map((w) => (w.id === weekId ? { ...w, name: newName } : w))
    );
  };

  const deleteWeek = async (weekId) => {
    await supabase.from("week_planner").delete().eq("id", weekId);
    const remaining = weeks.filter((w) => w.id !== weekId);
    setWeeks(remaining);
    localStorage.removeItem("currentWeekId");
    remaining.length ? loadWeek(remaining[0]) : createNewWeek();
  };

  /* ---------------- DRAG & DROP ---------------- */
  const handleDragEnd = ({ source, destination, draggableId }) => {
    if (!destination || destination.droppableId === "recipe-list") return;

    const recipe = recipes.find((r) => r.id.toString() === draggableId);
    if (!recipe) return;

    const newPlanner = { ...planner };

    if (source.droppableId === "recipe-list") {
      newPlanner[destination.droppableId].push({
        recipe,
        portions: 1,
      });
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

  const handlePortionsChange = (day, index, value) => {
    if (value < 1) return;
    const newPlanner = { ...planner };
    newPlanner[day][index].portions = value;
    setPlanner(newPlanner);
    savePlanner(newPlanner);
  };

  /* ---------------- SHOPPING LIST ---------------- */
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
      {/* ---------- WEEK SELECTOR ---------- */}
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
                  value={weekNameInput}
                  autoFocus
                  onChange={(e) => setWeekNameInput(e.target.value)}
                  onBlur={() => {
                    renameWeek(w.id, weekNameInput);
                    setEditingWeekId(null);
                  }}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    renameWeek(w.id, weekNameInput) &&
                    setEditingWeekId(null)
                  }
                />
              ) : (
                <span
                  className="week-name"
                  onClick={() => editingWeekId === null && switchWeek(w.id)}
                >
                  {w.name || "Unnamed Week"}
                </span>
              )}
            </button>

            <button
              className="edit-week-button"
              onClick={() => {
                setEditingWeekId(w.id);
                setWeekNameInput(w.name || "Unnamed Week");
              }}
            >
              ✏️
            </button>

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

      {/* ---------- PLANNER ---------- */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="planner-layout">
          <div className="week-grid">
            {days.map((day) => (
              <div key={day} className="day-column">
                <h3>{day}</h3>
                <Droppable droppableId={day}>
                  {(p) => (
                    <div
                      ref={p.innerRef}
                      {...p.droppableProps}
                      className="meal-slot"
                    >
                      {planner[day].map(({ recipe, portions }, i) => (
                        <Draggable
                          key={`${recipe.id}-${i}`}
                          draggableId={recipe.id.toString()}
                          index={i}
                        >
                          {(p) => (
                            <div
                              ref={p.innerRef}
                              {...p.draggableProps}
                              {...p.dragHandleProps}
                              className="assigned-recipe"
                            >
                              <div className="top-row">
                                <span>{recipe.name}</span>
                                <button
                                  className="remove-button"
                                  onClick={() => handleRemoveRecipe(day, i)}
                                >
                                  ✖
                                </button>
                              </div>
                              <label>
                                Portions:
                                <input
                                  type="number"
                                  min="1"
                                  value={portions}
                                  onChange={(e) =>
                                    handlePortionsChange(
                                      day,
                                      i,
                                      parseInt(e.target.value, 10)
                                    )
                                  }
                                />
                              </label>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {p.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </div>
      </DragDropContext>

      {/* ---------- SHOPPING LIST ---------- */}
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

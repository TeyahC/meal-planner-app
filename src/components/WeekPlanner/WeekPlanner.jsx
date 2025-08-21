import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../../styles/WeekPlanner.css";

export default function WeekPlanner({ recipes }) {
  const days = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

  const createEmptyWeekPlanner = () =>
    days.reduce((acc, day) => {
      acc[day] = {};
      mealTypes.forEach(meal => {
        acc[day][meal] = [];
      });
      return acc;
    }, {});

  // Load multi-week planner or default to one empty week
  const [planner, setPlanner] = useState(() => {
    const saved = localStorage.getItem("multiWeekPlanner");
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.values(parsed).forEach(weekPlanner => {
        days.forEach(day => {
          mealTypes.forEach(meal => {
            if (!Array.isArray(weekPlanner[day][meal])) weekPlanner[day][meal] = [];
            else {
              weekPlanner[day][meal] = weekPlanner[day][meal].map(item =>
                item.recipe ? item : { recipe: item, portions: 1 }
              );
            }
          });
        });
      });
      return parsed;
    }
    return { week1: createEmptyWeekPlanner() };
  });

  const [currentWeek, setCurrentWeek] = useState(() => {
    const savedWeek = localStorage.getItem("currentWeek");
    return savedWeek || "week1";
  });

  const [weekNames, setWeekNames] = useState(() => {
    const saved = localStorage.getItem("weekNames");
    if (saved) return JSON.parse(saved);

    const keys = Object.keys(planner);
    const names = {};
    keys.forEach((key, i) => {
      names[key] = `Week ${i + 1}`;
    });
    return names;
  });

  // Inline rename editing state
  const [editingWeekId, setEditingWeekId] = useState(null);
  const [tempWeekName, setTempWeekName] = useState("");

  const [portions, setPortions] = useState(() => {
    const saved = localStorage.getItem("plannerPortions");
    return saved ? parseInt(saved, 10) : 1;
  });

  const [removedIngredients, setRemovedIngredients] = useState(() => {
    const saved = localStorage.getItem("removedIngredients");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("multiWeekPlanner", JSON.stringify(planner));
  }, [planner]);

  useEffect(() => {
    localStorage.setItem("currentWeek", currentWeek);
  }, [currentWeek]);

  useEffect(() => {
    localStorage.setItem("plannerPortions", portions.toString());
  }, [portions]);

  useEffect(() => {
    localStorage.setItem("removedIngredients", JSON.stringify(removedIngredients));
  }, [removedIngredients]);

  useEffect(() => {
    localStorage.setItem("weekNames", JSON.stringify(weekNames));
  }, [weekNames]);

  const renameWeek = (weekId, newName) => {
    setWeekNames(prev => ({
      ...prev,
      [weekId]: newName || prev[weekId]
    }));
  };

  const startEditing = (weekId) => {
    setEditingWeekId(weekId);
    setTempWeekName(weekNames[weekId] || "");
  };

  const finishEditing = (weekId) => {
    renameWeek(weekId, tempWeekName.trim() || weekNames[weekId]);
    setEditingWeekId(null);
  };

  const cancelEditing = () => {
    setEditingWeekId(null);
  };

  const addNewWeek = () => {
    const newWeekId = `week${Object.keys(planner).length + 1}`;
    setPlanner(prev => ({
      ...prev,
      [newWeekId]: createEmptyWeekPlanner()
    }));
    setWeekNames(prev => ({
      ...prev,
      [newWeekId]: `Week ${Object.keys(planner).length + 1}`
    }));
    setCurrentWeek(newWeekId);
  };

  // Delete week but never allow deleting last week
  const deleteWeek = (weekId) => {
    if (Object.keys(planner).length <= 1) return; // don't delete last week

    const newPlanner = { ...planner };
    const newWeekNames = { ...weekNames };
    delete newPlanner[weekId];
    delete newWeekNames[weekId];

    setPlanner(newPlanner);
    setWeekNames(newWeekNames);

    // Switch current week if deleted was selected
    if (currentWeek === weekId) {
      const remainingWeeks = Object.keys(newPlanner);
      setCurrentWeek(remainingWeeks[0]);
    }
  };

  const handleRemoveRecipe = (day, meal, indexToRemove) => {
    setPlanner(prev => ({
      ...prev,
      [currentWeek]: {
        ...prev[currentWeek],
        [day]: {
          ...prev[currentWeek][day],
          [meal]: prev[currentWeek][day][meal].filter((_, i) => i !== indexToRemove),
        },
      },
    }));
  };

  const handlePortionsChange = (day, meal, index, newPortions) => {
    if (newPortions < 1) return;
    setPlanner(prev => {
      const updatedList = [...prev[currentWeek][day][meal]];
      updatedList[index] = { ...updatedList[index], portions: newPortions };
      return {
        ...prev,
        [currentWeek]: {
          ...prev[currentWeek],
          [day]: {
            ...prev[currentWeek][day],
            [meal]: updatedList,
          }
        }
      };
    });
  };

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === "recipe-list") return;

    const recipeId = draggableId.split("-")[0];
    const recipe = recipes.find(r => r.id.toString() === recipeId);
    if (!recipe) return;

    if (source.droppableId === "recipe-list") {
      const [destDay, destMeal] = destination.droppableId.split("_");
      setPlanner(prev => ({
        ...prev,
        [currentWeek]: {
          ...prev[currentWeek],
          [destDay]: {
            ...prev[currentWeek][destDay],
            [destMeal]: [...prev[currentWeek][destDay][destMeal], { recipe, portions: 1 }],
          },
        }
      }));
      return;
    }

    const [sourceDay, sourceMeal] = source.droppableId.split("_");
    const [destDay, destMeal] = destination.droppableId.split("_");

    setPlanner(prev => {
      const sourceList = Array.from(prev[currentWeek][sourceDay][sourceMeal]);
      const destList = Array.from(prev[currentWeek][destDay][destMeal]);

      const [movedItem] = sourceList.splice(source.index, 1);
      destList.splice(destination.index, 0, movedItem);

      return {
        ...prev,
        [currentWeek]: {
          ...prev[currentWeek],
          [sourceDay]: {
            ...prev[currentWeek][sourceDay],
            [sourceMeal]: sourceDay === destDay && sourceMeal === destMeal ? destList : sourceList,
          },
          [destDay]: {
            ...prev[currentWeek][destDay],
            [destMeal]: destList,
          },
        }
      };
    });
  };

  const allIngredients = Object.values(planner[currentWeek])
    .flatMap(dayMeals =>
      Object.values(dayMeals)
        .flatMap(recipeItems => recipeItems)
        .filter(Boolean)
        .flatMap(({ recipe, portions: recipePortions }) =>
          (recipe.ingredients || []).map(ing => {
            if (typeof ing === "string") {
              return { name: ing, quantity: 1, unit: "", totalPortions: recipePortions };
            } else {
              return {
                name: ing.name || "",
                quantity: ing.quantity || 1,
                unit: ing.unit || "",
                totalPortions: recipePortions,
              };
            }
          })
        )
    );

  const ingredientTotals = allIngredients.reduce((acc, { name, quantity, unit, totalPortions }) => {
    const key = name.toLowerCase();
    if (!acc[key]) {
      acc[key] = { name, quantity: 0, unit };
    }
    acc[key].quantity += quantity * totalPortions * portions;
    return acc;
  }, {});

  return (
    <>
      <div className="week-selector">
        {Object.keys(planner).map(weekId => (
          <span key={weekId} className="week-button-wrapper">
            <button
              onClick={() => setCurrentWeek(weekId)}
              className={`week-button ${weekId === currentWeek ? "active" : ""}`}
              aria-current={weekId === currentWeek ? "true" : undefined}
            >
              {editingWeekId === weekId ? (
                <input
                  type="text"
                  value={tempWeekName}
                  onChange={e => setTempWeekName(e.target.value)}
                  onBlur={() => finishEditing(weekId)}
                  onKeyDown={e => {
                    if (e.key === "Enter") finishEditing(weekId);
                    else if (e.key === "Escape") cancelEditing();
                  }}
                  autoFocus
                  aria-label={`Rename ${weekNames[weekId] || weekId}`}
                />
              ) : (
                <span
                  className="week-name"
                  onDoubleClick={() => startEditing(weekId)}
                  title="Double-click to rename"
                >
                  {weekNames[weekId] || weekId}
                </span>
              )}
            </button>

            {Object.keys(planner).length > 1 && (
              <button
                onClick={() => deleteWeek(weekId)}
                className="delete-week-button"
                title={`Delete ${weekNames[weekId] || weekId}`}
                aria-label={`Delete ${weekNames[weekId] || weekId}`}
              >
                ✖
              </button>
            )}
          </span>
        ))}

        <button
          onClick={addNewWeek}
          className="add-week-button"
          aria-label="Add new week"
        >
          + Add Week
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd} isCombineEnabled={false}>
        <div className="planner-layout">
          <div className="week-grid">
            {days.map(day => (
              <div key={day} className="day-column">
                <h3>{day}</h3>
                {mealTypes.map(meal => (
                  <Droppable key={`${day}_${meal}`} droppableId={`${day}_${meal}`}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="meal-slot"
                      >
                        <strong>{meal}</strong>
                        {(planner[currentWeek][day][meal] || []).map(({ recipe, portions: recipePortions }, index) => (
                          <Draggable
                            key={`${recipe.id}-${day}-${meal}-${index}`}
                            draggableId={`${recipe.id}-${day}-${meal}-${index}`}
                            index={index}
                            isDragDisabled={true}
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
                                    onClick={() => handleRemoveRecipe(day, meal, index)}
                                    aria-label={`Remove ${recipe.name} from ${meal}`}
                                  >
                                    ✖
                                  </button>
                                </div>
                                <div className="portions-input-container">
                                  <label>
                                    Portions:&nbsp;
                                    <input
                                      type="number"
                                      min="1"
                                      value={recipePortions}
                                      onChange={e => handlePortionsChange(day, meal, index, Math.max(1, parseInt(e.target.value) || 1))}
                                      className="portions-input"
                                    />
                                  </label>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            ))}
          </div>

          <div className="recipe-sidebar">
            <h3>All Recipes</h3>
            <Droppable droppableId="recipe-list" isDropDisabled={true}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="recipe-list">
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
                          {recipe.name}
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
        <label htmlFor="portion-selector">
          Number of people (global multiplier):
        </label>
        <select
          id="portion-selector"
          value={portions}
          onChange={(e) => setPortions(parseInt(e.target.value, 10))}
          className="portion-select"
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

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
                    {name} — <strong>{Number.isInteger(quantity) ? quantity : quantity.toFixed(2)}{unit}</strong>
                    <button
                      onClick={() => setRemovedIngredients(prev => [...prev, key])}
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

import React, { useState, useEffect } from "react";
import defaultMealImage from "../asset/Default meal image.avif";
import { getDefaultData } from "../data/defaultMealPlanData";


function MealPlanner() {
  const [tdee, setTdee] = useState(null);
  const [timeFrame, setTimeFrame] = useState("daily"); //set default to daily
  const [dietaryPreference, setDietaryPreference] = useState("");
  const [mealPlan, setMealPlan] = useState(null);
  const [mealNutrients, setMealNutrients] = useState(null);
  const [mealImages, setMealImages] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertMessage, setShowAlertMessage] = useState("");
  const [showAlertClassName, setShowAlertClassName] = useState("");

  let apiKey = process.env.REACT_APP_MEAL_API_KEY;
  const setUAT = false;
  // Effect to fetch and set the TDEE from localStorage when the component mounts.
  useEffect(() => {
    const storedTdee = localStorage.getItem("tdee");
    if (storedTdee) {
      setTdee(parseFloat(storedTdee));
    }
  }, []);
  // Effect to fetch the meal plan when `tdee`, `timeFrame`, or `dietaryPreference` changes.
  useEffect(() => {
    if (tdee) {
      fetchMealPlan();
    }
  }, [tdee, timeFrame, dietaryPreference]);
  // Function to fetch meal plans from an external API or use test data.
  const fetchMealPlan = async () => {
    if (setUAT) {
      // UAT logic to use hardcoded data or simulated API limits.
      if (timeFrame === "daily") {
        let data = getDefaultData(timeFrame);
        console.log(data);
        setMealPlan(data);
        fetchMealDetails(data);
      } else {
        setShowAlert(true);
        setShowAlertMessage(
          "Sorry! It looks like you've exceeded your API quota limit. Please consider upgrading your plan or contacting support for assistance."
        );
        setShowAlertClassName("alert alert-danger");
        setMealPlan(null);
      }
    } // Production API call.
    else {
      let apiKey = process.env.REACT_APP_MEAL_API_KEY;
      let url = `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&targetCalories=${tdee}&timeFrame=${
        timeFrame === "daily" ? "day" : "week"
      }`;
      if (dietaryPreference && dietaryPreference !== "none") {
        url += `&diet=${dietaryPreference}`;
      }
      try {
        const response = await fetch(url);
        if (response.status === 402) {
          setShowAlert(true);
          setShowAlertMessage(
            "Sorry! It looks like you've exceeded your API quota limit. Please consider upgrading your plan or contacting support for assistance."
          );
          setShowAlertClassName("alert alert-danger");
          setMealPlan(null);

          return;
        }
        if (response.ok) {
          setShowAlert(false);
          const data = await response.json();
          setMealPlan(data);
          fetchMealDetails(data);
          // console.log(data);
        } else {
        }
      } catch (error) {
        // console.error("Error fetching meal paln:", error);
        setMealPlan(null); // Reset meal plan on error.
      }
    }
  };
  // Fetches detailed meal data including images.
  const fetchMealDetails = async (mealData) => {
    console.log("Fetching meal details...");

    let mealsToFetch = [];
    if (timeFrame === "weekly" && mealData.week) {
      // console.log("Weekly");
      Object.values(mealData.week).forEach((day) => {
        mealsToFetch = [...mealsToFetch, day];
      });
    } else if (mealData.meals) {
      // console.log("Daily");
      mealsToFetch = [mealData];
    }

    const mealImagesMap = {};
    if (mealsToFetch.length === 1) {
      const dailyPlan = mealsToFetch[0];
      console.log("Day's meals:", dailyPlan.meals);
      console.log("Day's nutrients:", dailyPlan.nutrients);
      //get image from url
      await Promise.all(
        dailyPlan.meals.map(async (meal) => {
          const detailUrl = `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=${apiKey}`;
          try {
            const mealResponse = await fetch(detailUrl);
            const mealDetails = await mealResponse.json();
            // console.log(mealDetails)
            // console.log(mealDetails )
            if (mealDetails != null) {
              if (mealDetails.image) {
                mealImagesMap[meal.id] = mealDetails.image;
              } else {
                mealImagesMap[meal.id] = defaultMealImage;
              }
            } else {
              console.log("null");
            }
            // if (mealDetails.code === 200) {

            // } else {
            //   mealImagesMap[meal.id] = defaultMealImage;
            // }
          } catch (error) {
            console.error(`Error fetching details for meal ${meal.id}:`, error);
          }
        })
      );

      setMealNutrients(dailyPlan.nutrients);
    } else {
      await Promise.all(
        mealsToFetch.map(async (day) => {
          // console.log("Day xxxxx")
          // console.log("Day's meals:", day.meals);
          // console.log("Day's nutrients:", day.nutrients);
          //get image from url
          await Promise.all(
            day.meals.map(async (meal) => {
              const detailUrl = `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=${apiKey}`;
              try {
                const mealResponse = await fetch(detailUrl);
                const mealDetails = await mealResponse.json();
                if (mealDetails != null) {
                  if (mealDetails.image) {
                    mealImagesMap[meal.id] = mealDetails.image;
                  } else {
                    mealImagesMap[meal.id] = defaultMealImage;
                  }
                } else {
                  console.log("null");
                }
              } catch (error) {
                console.error(
                  `Error fetching details for meal ${meal.id}:`,
                  error
                );
              }
              setMealNutrients(day.nutrients);
            })
          );
        })
      );
    }

    setMealImages(mealImagesMap); // Update state with meal images.
  };
  // Handles the form submission to fetch a new meal plan.
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchMealPlan();
  };
  // Render function to display meals, nutrients, and images.
  const renderMeals = (
    meals,
    nutrients,
    mealTypes = ["Breakfast", "Lunch", "Dinner"]
  ) => (
    <div className="row">
      <div className="col-12">
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "1.25rem",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          <div>
            <strong>Calories:</strong> {Math.round(nutrients.calories)}{" "}
            calories.
          </div>
          <div>
            <strong>Protein:</strong> {Math.round(nutrients.protein)} g.
          </div>
          <div>
            <strong>Fat:</strong> {Math.round(nutrients.fat)} g.
          </div>
          <div>
            <strong>Carbohydrates:</strong>{" "}
            {Math.round(nutrients.carbohydrates)} g.
          </div>
        </div>
      </div>

      {meals.map((meal, index) => (
        <div key={meal.id} className="col-md-4 mb-3">
          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title mb-3">
                {mealTypes[index % mealTypes.length]}
              </h5>
              {mealImages[meal.id] ? (
                <img
                  src={mealImages[meal.id] || defaultMealImage}
                  className="card-img-top mb-3"
                  alt={meal.title}
                  style={{ marginBottom: 10 }}
                />
              ) : (
                <div
                  className="card-img-top"
                  style={{
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Loading image...
                </div>
              )}
              <h5>
                <a
                  href={meal.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {meal.title}
                </a>
              </h5>
              <h5>
                <a
                  href={meal.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.8em" }}
                >
                  Recipe
                </a>
              </h5>
              <p>
                <strong>Ready in:</strong> {meal.readyInMinutes} minutes
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  // Main component return, rendering the form and meal details.
  return (
    <div className="container mt-5">
      <h3 className="mb-4">
        Your Recommended Daily Calories Intake: {tdee} Calories
      </h3>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold form-label">
              Meal Plan Duration:
            </label>
            <select
              className="form-select"
              onChange={(e) => setTimeFrame(e.target.value)}
              value={timeFrame}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold form-label">
              Dietary Preference:
            </label>
            <select
              className="form-select"
              onChange={(e) => setDietaryPreference(e.target.value)}
              value={dietaryPreference}
            >
              <option value="">Select Dietary Preference</option>
              <option value="Gluten Free">Gluten Free</option>
              <option value="ketogenic">Ketogenic</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
      </form>

      {mealPlan ? (
        <div>
          <div
            className="text-center p-3 mb-3"
            style={{
              backgroundColor: "#D9F6D5",
              width: "100%",
              padding: "1.25rem",
              borderRadius: "5px",
            }}
          >
            <h4 className="mb-3 fs-3">Meal Plan</h4>
          </div>

          {timeFrame === "weekly" && mealPlan.week ? (
            Object.keys(mealPlan.week).map((day) => (
              <div key={day} className="mb-4">
                <h5 className="mb-3 fw-bold">
                  {day.charAt(0).toUpperCase() + day.slice(1)}:
                </h5>
                {renderMeals(
                  mealPlan.week[day].meals,
                  mealPlan.week[day].nutrients
                )}
              </div>
            ))
          ) : (
            <>
              {mealPlan.meals ? (
                renderMeals(mealPlan.meals, mealPlan.nutrients)
              ) : (
                <p>Loading...</p>
              )}
            </>
          )}
        </div>
      ) : (
        <div className={showAlertClassName} role="alert">
          {showAlertMessage}
        </div>
      )}
    </div>
  );
}
export default MealPlanner;

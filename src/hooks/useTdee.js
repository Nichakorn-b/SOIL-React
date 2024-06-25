import { useState, useEffect } from "react";

//TDEE formula
//https://nutrium.com/blog/mifflin-st-jeor-for-nutrition-professionals/#:~:text=The%20simplified%20equations%20are%20as,(in%20years)%20%2D%20161.
//https://tdeecalculator.net/result.php?s=metric&g=male&age=30&kg=65&cm=171&act=1.2&f=1

function useTdee() {
  // Initialize tdee from local storage or set to null if not available
  const [tdee, setTdee] = useState(null);

  /**
   * Calculates Total Daily Energy Expenditure (TDEE) based on user's age, weight, height, gender, activity level, and health goals
   * @param {*} data
   */
  const calculateTdee = (data) => {
    const { age, weight, height, gender, activityLevel, healthGoals } = data;
    let bmr = 0;
    //TDEE formula
    // Males: (10 x weight in kg) + (6.25 x height in cm) – (5.0 x age in years) + 5
    // Females: (10 x weight in kg) + (6.25 x height in cm) – (5.0 x age in years) – 161
    if (gender === "male") {
      bmr = 10.0 * weight + 6.25 * height - 5.0 * age + 5;
    } else if (gender === "female") {
      bmr = 10.0 * weight + 6.25 * height - 5.0 * age - 161;
    }
    // Sedentary - BMR X 1,2 (little to no exercise, desk job)
    // Light Activity - BMR X 1.375 (exercise 1 to 3 days per week)
    // Moderate Activity - BMR X 1.55 (exercise 3 to 5 days per week)
    // Very Active - BMR X 1.725 (exercise 6 to 7 days per week)
    // Extra Active - BMR X 1.9 (exercise 2x per day)
    let activityFactor;
    switch (activityLevel) {
      case "lightlyActive":
        activityFactor = 1.375;
        break;
      case "moderatelyActive":
        activityFactor = 1.55;
        break;
      case "veryActive":
        activityFactor = 1.725;
        break;
      case "extraActive":
        activityFactor = 1.9;
        break;
      default: //sedentary
        activityFactor = 1.2;
        break;
    }
    let baseTdee = bmr * activityFactor;

    //adjusting base Tdee based on health goal
    switch (healthGoals) {
      case "weight_loss":
        baseTdee *= 0.8;
        break;
      case "muscle_gain":
        baseTdee *= 1.2;
        break;
      default: //"health_improvement":
        //no change needed
        break;
    }
    let roundedTdee = Math.round(baseTdee);
    console.log(
      "Calculated TDEE with goal (" + healthGoals + "): " + roundedTdee
    );
    setTdee(roundedTdee);
  };
  // Watches for changes in the tdee state and updates local storage when tdee changes
  useEffect(() => {
    if (tdee !== null) {
      localStorage.setItem("tdee", tdee);
      console.log("TDEE updated to: " + tdee);
    }
  }, [tdee]);

  const getTdee = () => {
    return tdee;
  };

  return { getTdee, calculateTdee };
}

export default useTdee;

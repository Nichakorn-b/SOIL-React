//import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useTdee from "../hooks/useTdee";
import { useNavigate } from "react-router-dom";

function UserPersonalised() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { calculateTdee, getTdee } = useTdee();

  const onSubmit = (data) => {
    calculateTdee(data);
    console.log("data from getTdee " + getTdee());
    navigate("/mealplanner");
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="col-md-6">
        <h1 className="display-4 mb-4 mt-4">Start Your Journey</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card mb-3">
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="gender" className="fw-bold form-label">
                  Gender
                </label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    {...register("gender", { required: "Gender is required" })}
                    value="male"
                    id="genderMale"
                    checked
                  />
                  <label
                    className="form-check-label form-label"
                    htmlFor="gender"
                  >
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    {...register("gender", { required: "Gender is required" })}
                    value="female"
                    id="genderFemale"
                  />
                  <label
                    className="form-check-labe form-label"
                    htmlFor="gender"
                  >
                    Female
                  </label>
                </div>
                {errors.gender && (
                  <span className="text-danger">{errors.gender.message}</span>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="age" className="fw-bold form-label">
                  Age
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  {...register("age", { required: true, min: 0, max: 120 })}
                  placeholder="Enter your age"
                  //value="30"
                />
                {errors.age && (
                  <span className="text-danger">
                    Age is required and must be between 0 and 120
                  </span>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="weight" className="fw-bold form-label">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="weight"
                  placeholder="Enter your weight in kg"
                  {...register("weight", { required: true, min: 30, max: 250 })}
                />
                {errors.weight && (
                  <span className="text-danger">
                    Weight is required and must be between 30 kg and 250 kg
                  </span>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="height" className="fw-bold form-label">
                  Height (cm)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="height"
                  placeholder="Enter your height in cm"
                  {...register("height", {
                    required: true,
                    min: 120,
                    max: 250,
                  })}
                />
                {errors.height && (
                  <span className="text-danger">
                    Height is required and must be between 120 cm and 250 cm
                  </span>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="activityLevel" className="fw-bold form-label">
                  Activity Level
                </label>
                <select
                  className="form-control"
                  id="activityLevel"
                  {...register("activityLevel", { required: true })}
                >
                  <option value="">Select activity level</option>
                  <option value="sedentary">little or no exercise</option>
                  <option value="lightlyActive">Exercise 1-3 times/week</option>
                  <option value="moderatelyActive">
                    Exercise 4-5 times/week
                  </option>
                  <option value="veryActive">
                    Daily exercise or intense exercise 3-4 times/week
                  </option>
                  <option value="extraActive">
                    Intense exercise 6-7 times/week
                  </option>
                </select>{" "}
                {/*source: https://www.pediatriconcall.com/calculators/basel-metabolic-rate-bmr-calculator*/}
              </div>

              <div className="mb-3">
                <label htmlFor="healthGoals" className="fw-bold form-label">
                  Health Goals
                </label>
                <select
                  className="form-control"
                  id="healthGoals"
                  {...register("healthGoals", { required: true })}
                >
                  <option value="">Select health goal</option>
                  <option value="weight_loss">Weight Loss</option>
                  <option value="muscle_gain">Muscle Gain</option>
                  <option value="health_improvement">
                    Overall Health Improvement
                  </option>
                </select>
                {errors.healthGoals && (
                  <span className="text-danger">Health goal is required</span>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block mt-3 mb-3"
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserPersonalised;

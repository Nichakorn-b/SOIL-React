import { React, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerUser, verifyUser } from "../data/repository";
import UserContext from "../contexts/UserContext";
import Alert from "../fragments/Alert";
import useAlert from "../hooks/useAlert";

//https://stackoverflow.com/questions/63000638/form-pattern-validation-with-react-hook-form
//password regex https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a

/**
 * Registration component that handle user signup functionality.
 * @returns
 */
function Register() {
  const { loginUser ,loginName} = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const password = watch("password");

  const [successMessage, setSuccessMessage] = useState("");

  const { showAlert, showAlertMessage, showAlertClassName, triggerAlert } =
    useAlert();

  /**
   * Handles the form submission for user registration.
   * @param {Objecgt} data - Form data containing email, firstname, lastname, and password.
   * @param {string} data.email user email
   * @param {string} data.firstname user firstname
   * @param {string} data.lastname user lastname
   * @param {string} data.password user password
   *
   */
  const onSubmit = async (data) => {
    const { email, firstname, lastname, password } = data;
    const response = await registerUser(email, firstname, lastname, password);

    if (response.success) {
      const [user, success, message] = await verifyUser(
        response.user.email,
        password
      );
      // console.log(user);

      triggerAlert(response.message, response.success, 4000, () => {
        loginUser(user);
        loginName(user.name);
        navigate("/profile");
      });
    } else {
      triggerAlert(response.message, false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Sign up</h1>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="control-label form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-danger">{errors.email.message}</span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="firstname" className="control-label form-label">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                className="form-control"
                {...register("firstname", { required: true })}
              />
              {errors.firstname && (
                <span className="text-danger">First Name is required</span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="lastname" className="control-label form-label">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                className="form-control"
                {...register("lastname", { required: true })}
              />
              {errors.lastname && (
                <span className="text-danger">Last Name is required</span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="control-label form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,

                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                  },
                })}
              />
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
            </div>

            <div className="mb-3">
              <label
                htmlFor="passwordConfirm"
                className="control-label form-label"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="passwordConfirm"
                className={`form-control ${
                  errors.passwordConfirm ? "is-invalid" : ""
                }`}
                {...register("passwordConfirm", {
                  validate: (value) =>
                    value === password || "The password do not match",
                })}
              />
              {errors.passwordConfirm && (
                <span className="text-danger">
                  {errors.passwordConfirm.message}
                </span>
              )}
            </div>

            <div className="mb-3 mt-4 d-grid gap-2">
              <input
                type="submit"
                className="btn btn-primary btn-block"
                value="Sign up"
              />
            </div>

            <div className="mb-3 d-grid gap-2">
              <button
                className="btn btn-light btn-block"
                onClick={() => navigate("/Login")}
              >
                Already have an account? Login
              </button>
            </div>
          </form>
          {successMessage && (
            <div className="alert alert-success mt-3">{successMessage}</div>
          )}

          <Alert
            show={showAlert}
            message={showAlertMessage}
            className={showAlertClassName}
          />
        </div>
      </div>
    </div>
  );
}

export default Register;

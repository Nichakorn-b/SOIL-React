import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { verifyUser } from "../data/repository";
import UserContext from "../contexts/UserContext";
import Alert from "../fragments/Alert";
import useAlert from "../hooks/useAlert";

/**
 * Login component that handles user login functionality.
 * @returns
 */
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const { loginUser, loginName } = useContext(UserContext);
  const { showAlert, showAlertMessage, showAlertClassName, triggerAlert } =
    useAlert();

  /**
   * Handles form submission for user login.
   * @param {Object} data
   * @param {string} data.email user email
   * @param {string} data.password user password
   */
  const onSubmit = async (data) => {
    const { email, password } = data;
    const [user, success, message] = await verifyUser(email, password);

    // If verified login the user.
    if (success) {
      triggerAlert(message, success, 3000, () => {
        loginUser(user);
        loginName(user.name);
        navigate("/profile");
      });
    } else {
      reset({ password: "" });
      triggerAlert(message, success);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Login</h1>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                {...register("email", { required: "Email is required" })}
                id="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                id="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>

            <div className="mb-3 mt-4 d-grid gap-2">
              <input type="submit" className="btn btn-primary" value="Login" />
            </div>
            <div className="mb-3 d-grid gap-2">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => navigate("/Register")}
              >
                Not a member with us? Create an account
              </button>
            </div>
            <Alert
              show={showAlert}
              message={showAlertMessage}
              className={showAlertClassName}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

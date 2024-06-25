import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getProfile, updateProfile } from "../data/repository";
import { useNavigate } from "react-router-dom";
import { deleteUser, updatePassword } from "../data/repository";
import ModalConfirmDelete from "../fragments/ModalConfirmDelete";
import UserContext from "../contexts/UserContext";
import Alert from "../fragments/Alert";
import useAlert from "../hooks/useAlert";

//https://react-hook-form.com/get-started
//https://stackoverflow.com/questions/70480928/how-to-validate-password-and-confirm-password-in-react-hook-form-is-there-any-v
//https://stackoverflow.com/questions/60276510/how-to-make-react-hook-form-work-with-multiple-forms-in-one-page
//https://getbootstrap.com/docs/4.0/components/card/
//https://stackoverflow.com/questions/59214668/how-to-compose-react-hook-form-into-component
//https://getbootstrap.com/docs/4.0/components/modal/ for bootstrap 4

/**
 * MyProfile component that allows users to view and update their profile information,change their password, and delete their account.
 *
 */
function MyProfile() {
  const { username, logoutUser, loginUser, loginName } =
    useContext(UserContext);

  const { showAlert, showAlertMessage, showAlertClassName, triggerAlert } =
    useAlert();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    watch,
    formState: { errors: errors2 },
    reset,
  } = useForm();

  const [profile, setProfile] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [successMessagePassword, setSuccessMessagePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Loads the user profile data.
     */
    async function loadProfile() {
      const currentProfile = await getProfile();
      setProfile(currentProfile);
      setValue("firstname", currentProfile.firstname);
      setValue("lastname", currentProfile.lastname);
    }
    loadProfile();
  }, [username.id, setValue]);

  const password = watch("password");

  /**
   * Handles submission of the form to update the user's name.
   *
   * @param {Object} data The form data containing the new first and last name.
   * @param {string} data.firstname
   * @param {string} data.lastname
   */
  const onSubmitName = async (data) => {
    const result = await updateProfile(data);

    if (result) {
      triggerAlert(result.message, result.success);

      let firstname = result.output.firstname;
      let lastname = result.output.lastname;

      loginName(firstname + " " + lastname);

      setProfile((prevProfile) => ({
        ...prevProfile,
        firstname: data.firstname,
        lastname: data.lastname,
      }));
    } else {
      triggerAlert("Update failed. Please try again.", false);
    }
  };

  /**
   * Handles submission of the form to update the user's password.
   *
   * @param {Object} data
   * @param {string} data.password
   */
  const onSubmitPassword = async (data) => {
    const result = await updatePassword(data.password);
    if (result.success) {
      triggerAlert(result.message, result.success);
      reset();
    }
  };

  /**
   * Handles deletion of the user's account.
   */
  const onDeleteAccount = async () => {
    await deleteUser(username);
    logoutUser();
    navigate("/");
  };

  if (profile === null) return null;

  return (
    <div className="d-flex justify-content-center">
      <Alert
        show={showAlert}
        message={showAlertMessage}
        className={showAlertClassName}
      />
      <div className="col-md-6">
        <h1 className="display-4">My Profile</h1>

        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title"> </h5>

            <div className="mb-3">
              <label htmlFor="name" className="fw-bold form-label">
                Email
              </label>

              <p className="card-text"> {profile.email}</p>
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="fw-bold form-label">
                Name
              </label>

              <p className="card-text">
                {" "}
                {profile.firstname + " " + profile.lastname}
              </p>
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="fw-bold form-label">
                Joined Date
              </label>

              <p className="card-text"> {profile.joined_date}</p>
            </div>
          </div>
        </div>

        {/* Change Name Section */}
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Change Name</h5>
            <form onSubmit={handleSubmit(onSubmitName)}>
              <div className="mb-3">
                <label htmlFor="firstname" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  {...register("firstname", { required: true })}
                />
                {errors.firstname && (
                  <span className="text-danger">First name is required</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="lastname" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  {...register("lastname", { required: true })}
                />
                {errors.lastname && (
                  <span className="text-danger">Last name is required</span>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            {successMessage && (
              <div className="alert alert-success mt-3">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="alert alert-danger mt-3">{errorMessage}</div>
            )}
          </div>
        </div>

        {/* Update Password Section */}
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Update Password</h5>
            <form onSubmit={handleSubmit2(onSubmitPassword)}>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  {...register2("password", {
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
                {errors2.password && (
                  <span className="text-danger">
                    {errors2.password.message}
                  </span>
                )}
              </div>
              {/* Confirm Password Input */}
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  {...register2("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                {errors2.confirmPassword && (
                  <span className="text-danger">
                    {errors2.confirmPassword.message}
                  </span>
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            {successMessagePassword && (
              <div className="alert alert-success mt-3">
                {successMessagePassword}
              </div>
            )}
            {errorMessagePassword && (
              <div className="alert alert-danger mt-3">
                {errorMessagePassword}
              </div>
            )}
          </div>
        </div>
        {/*Delete Accout section */}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Permanently delete </h5>
            <p className="card-text">
              Be careful - this will delete all your data and cannot be undone
            </p>

            <button
              type="button"
              className="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#confirmDeleteModal"
            >
              {" "}
              Delete Account{" "}
            </button>
          </div>
        </div>
      </div>

      <ModalConfirmDelete onDeleteAccount={onDeleteAccount} />
    </div>
  );
}

export default MyProfile;

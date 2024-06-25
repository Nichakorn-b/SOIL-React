import React, { useContext, useState } from "react";
import soil from "../asset/soil.png";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Alert from "../fragments/Alert";

/**
 * Header component for the SOIL website.
 * Displays the navigation links, user information, and cart notification.
 * @returns
 */
function Header() {
  const { username, logoutUser, cartNotificationCount, name } =
    useContext(UserContext);

  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [showAlertMessage, setShowAlertMessage] = useState("");
  const [showAlertClassName, setShowAlertClassName] = useState("");

  /**
   * Handles the click event on the cart button.
   * If the user is not logged in, shows an alert and redirects to the login page.
   * Otherwise, navigates to the cart page.
   */
  const handleCartClick = () => {
    if (!username) {
      setShowAlert(true);
      setShowAlertMessage(
        "Please log in to access the cart. You will be redirected to the login page shortly."
      );
      setShowAlertClassName("alert alert-danger");
      setTimeout(() => {
        setShowAlert(false);
        navigate("/login");
      }, 4000);
    } else {
      navigate("/cart");
    }
  };

  return (
    <header className="d-flex flex-wrap justify-content-center py-2 mb-6 sticky-top bg-white border-bottom">
      <Alert
        show={showAlert}
        message={showAlertMessage}
        className={showAlertClassName}
      />

      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none px-3">
        <img src={soil} style={{ maxWidth: "60px" }} className="w-50" alt="" />
        {/*Icon made by Stickers from www.flaticon.com"*/}
        <Link className="nav-link fs-3" to="/">
          SOIL
        </Link>
      </div>
      <ul className="nav nav-pills mr-4">
        {username === undefined || username === null ? (
          <li className="nav-item">
            <Link
              className="nav-link d-flex flex-column align-items-center"
              to="/login"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
              <span>Login/ Sign up</span>
            </Link>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <Link
                className="nav-link d-flex flex-column align-items-center"
                to="/profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg>
                <span>Welcome, {name} </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link d-flex flex-column align-items-center"
                to="/login"
                onClick={logoutUser}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-box-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                  />
                </svg>
                <span>Logout</span>
              </Link>
            </li>
          </>
        )}
        <li className="nav-item position-relative">
          <button
            className="nav-link d-flex flex-column align-items-center"
            onClick={handleCartClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-cart"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
            <span>Cart</span>

            {cartNotificationCount > 0 && (
              <span
                className="position-absolute badge rounded-pill bg-danger"
                style={{ transform: "translate(15px, -10px)" }}
              >
                {cartNotificationCount}
              </span>
            )}
          </button>
        </li>
      </ul>
    </header>
  );
}

export default Header;

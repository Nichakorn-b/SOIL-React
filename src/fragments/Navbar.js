import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import Alert from "../fragments/Alert";

/**
 * Navbar component for the SOIL website.
 * Displays navigation links, handles user authentication alerts, and manages personalized diet plan access.
 *
 * @returns
 */
function Navbar() {
  const { username } = useContext(UserContext);

  const [showAlert, setShowAlert] = useState(false);
  const [showAlertMessage, setShowAlertMessage] = useState("");
  const [showAlertClassName, setShowAlertClassName] = useState("");

  const navigate = useNavigate();

  /**
   * Handles the click event for accessing the personalized diet plan.
   * If the user is not logged in, shows an alert and redirects to the login page.
   * Otherwise, navigates to the user personalized diet plan page.
   */
  const handleUserPersonalisedClick = () => {
    if (!username) {
      setShowAlert(true);
      setShowAlertMessage(
        "Please log in to access the diet plan. You will be redirected to the login page shortly."
      );
      setShowAlertClassName("alert alert-danger");
      setTimeout(() => {
        setShowAlert(false);
        navigate("/login");
      }, 4000);
    } else {
      navigate("/userpersonalised");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Alert
          show={showAlert}
          message={showAlertMessage}
          className={showAlertClassName}
        />

        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a
                  className="nav-link text-dark mx-3"
                  data-bs-toggle="offcanvas"
                  href="#offcanvasExample"
                  role="button"
                  aria-controls="offcanvasExample"
                >
                  Shop product{" "}
                </a>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link text-dark mx-3"
                  to="/categoryProducts?category_id=All"
                >
                  {" "}
                  All Products
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-dark mx-3"
                  to="/categoryProducts?category_id=Specials"
                >
                  {" "}
                  Weekly Specials{" "}
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link text-dark mx-3"
                  onClick={handleUserPersonalisedClick}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Create a diet plan
                </button>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-ite">
                <Link className="nav-link text-dark mx-3" to="/aboutUs">
                  About us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark mx-3" to="/contactUs">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Shop products
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div>
            <Link
              className="nav-link text-dark mr-3 mb-3"
              to="/categoryProducts?category_id=All"
            >
              {" "}
              All Products{" "}
            </Link>
            <Link
              className="nav-link text-dark mr-3 mb-3"
              to="/categoryProducts?category_id=Specials"
            >
              {" "}
              Weekly Specials{" "}
            </Link>
            <Link
              className="nav-link text-dark mr-3 mb-3"
              to="/categoryProducts?category_id=1"
            >
              {" "}
              Fruit & Vegetable{" "}
            </Link>
            <Link
              className="nav-link text-dark mr-3 mb-3"
              to="/categoryProducts?category_id=2"
            >
              {" "}
              Dairy, Eggs & Fridge{" "}
            </Link>
            <Link
              className="nav-link text-dark mr-3 mb-3"
              to="/categoryProducts?category_id=3"
            >
              {" "}
              Bakery
            </Link>
            <Link
              className="nav-link text-dark mr-3 mb-3"
              to="/categoryProducts?category_id=4"
            >
              {" "}
              Drinks
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

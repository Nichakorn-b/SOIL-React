import React from "react";
import { Link } from "react-router-dom";
import soil from "../asset/soil.png";

/**
 * Footer component for the SOIL website.
 * Displays company information, links to various pages, and a copyright notice.
 *
 * @returns
 */
function Footer() {
  return (
    <footer className="mt-auto py-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-row align-items-top mb-3">
          <div className="d-flex flex-column align-items-top mr-3 px-3">
            <img
              src={soil}
              style={{ maxWidth: "100px" }}
              className="mr-3 ml=3 w-60"
              alt=""
            />{" "}
            {/*Icon made by Stickers from www.flaticon.com"*/}
            <span className="d-flex flex-column align-items-center fw-bold">
              SOIL
            </span>
          </div>
          <div className="d-flex flex-column align-items-top mr-3 px-3">
            <span className="fw-bold">Company</span>
            <Link className="nav-link text-light mr-3" to="/aboutUs">
              About us
            </Link>
            <Link className="nav-link text-light mr-3" to="/contactUs">
              Contact us
            </Link>
          </div>
          <div className="d-flex flex-column align-items-top mr-3 px-3">
            <span className="fw-bold">Shop Groceries Online</span>
            <Link
              className="nav-link text-light mr-3"
              to="/categoryProducts?category_id=All"
            >
              All products
            </Link>
            <Link
              className="nav-link text-light mr-3"
              to="/categoryProducts?category_id=Specials"
            >
              {" "}
              Weekly Specials{" "}
            </Link>
            <Link
              className="nav-link text-light mr-3"
              to="/categoryProducts?category_id=1"
            >
              {" "}
              Fruit & Vegetable{" "}
            </Link>
            <Link
              className="nav-link text-light mr-3"
              to="/categoryProducts?category_id=2"
            >
              {" "}
              Dairy, Eggs & Fridge{" "}
            </Link>
            <Link
              className="nav-link text-light mr-3"
              to="/categoryProducts?category_id=3"
            >
              {" "}
              Bakery
            </Link>
            <Link
              className="nav-link text-light mr-3"
              to="/categoryProducts?category_id=4"
            >
              {" "}
              Drinks
            </Link>
          </div>
        </div>
        <span className="px-3 text-light">
          SOIL Online - Melbourne, Victoria Australia 3000 © Copyright SOIL 2024
        </span>
      </div>
    </footer>
  );
}

export default Footer;

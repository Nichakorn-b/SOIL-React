import React, { useState, useContext, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Alert from "../fragments/Alert";
import useAlert from "../hooks/useAlert";
import AddToCart from "../utility/cartUtility";
import {
  getAllProducts,
  getEndpoint,
  getAllCategories,
} from "../data/repository";

//https://stackoverflow.com/questions/25982135/why-does-left-50-transform-translatex-50-horizontally-center-an-element

/**
 * CategoryProducts component that displays a list of products filtered by category.
 *
 * @returns
 */
function CategoryProducts() {
  const { username, addToCart } = useContext(UserContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category_id = queryParams.get("category_id");
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const { showAlert, showAlertMessage, showAlertClassName, triggerAlert } =
    useAlert();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []); // Fetch products only once when the component mounts

  /**
   * Fetches all products and sets the products state.
   */
  const fetchProducts = async () => {
    try {
      const products = await getAllProducts();
      setProducts(products);
    } catch (error) {
      triggerAlert("Failed to fetch products. Please try again later.", false);
    }
  };

  /**
   * Fetches all categories and sets the categories state.
   */
  const fetchCategories = async () => {
    try {
      const categories = await getAllCategories();
      setCategories(categories);
    } catch (error) {
      setCategories([]);
      triggerAlert("Failed to fetch products. Please try again later.", false);
    }
  };

  /**
   * Retrieves the category name based on the category ID.
   *
   * @param {number} categoryId - The ID of the category.
   * @returns {string} - The name of the category.
   */
  const getCategoryName = useCallback(
    (categoryId) => {
      const category = categories.find(
        (category) => category.category_id === parseInt(categoryId)
      );
      return category ? category.category_name : "Unknown Category";
    },
    [categories]
  );

  const filteredProducts = products.filter((product) => {
    if (category_id === "All") return true;
    if (category_id === "Specials") return product.is_special;
    return product.category_id === parseInt(category_id);
  });

  const handleCart = (product) => {
    AddToCart(username, triggerAlert, navigate, addToCart, product);
  };

  return (
    <div className="text-dark">
      {/*Banner*/}
      <div className="container mt-auto mx-auto">
        <h2>
          Shop{" "}
          {category_id === "All"
            ? "All Products"
            : category_id === "Specials"
            ? "Weekly Specials"
            : getCategoryName(category_id)}
        </h2>
      </div>
      <Alert
        show={showAlert}
        message={showAlertMessage}
        className={showAlertClassName}
      />

      {/*Products*/}
      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {filteredProducts.map((product) => (
            <div key={product.product_id} className="col">
              <div className="card h-100">
                {product.is_special === true && (
                  <div className="position-absolute top-0 start-0 p-2 bg-danger text-white fw-bold fs-6">
                    {" "}
                    special{" "}
                  </div>
                )}

                <img
                  // src={`${process.env.PUBLIC_URL}/${product.image_url}`}
                  src={`${getEndpoint()}${product.image_url}`}
                  className="card-img-top mx-auto mt-3"
                  alt={product.product_name}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: "250px",
                    maxHeight: "250px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{product.product_name}</h5>
                  <p className="card-text fs-5">${product.price}</p>

                  <button
                    className="nav-link mt-auto link-dark link-opacity-50-hover"
                    onClick={() => navigate(`/product/${product.product_id}`)}
                    style={{ textAlign: "left" }}
                  >
                    View Details
                  </button>

                  <button
                    className="btn btn-outline-danger mb-2 mt-2"
                    onClick={() => handleCart(product)}
                  >
                    {" "}
                    Add to cart
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className="ml-2 bi bi-cart"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryProducts;

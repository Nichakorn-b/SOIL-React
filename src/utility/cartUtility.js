/**
 * @function AddToCart
 * @param {string|null} username - The username of the logged-in user.
 * @param {function} triggerAlert - Function to trigger an alert with a message.
 * @param {function} navigate - Function to navigate to a different route.
 * @param {function} addToCart - Function to add a product to the cart.
 * @param {Object} product - The product to be added to the cart.
 * @returns
 */
const AddToCart = async (
  username,
  triggerAlert,
  navigate,
  addToCart,
  product
) => {
  if (username == null) {
    triggerAlert(
      "Please login to add items to your cart. You will be redirected to the login page shortly.",
      false, // isSuccess = false
      4000,
      () => navigate("/login")
    );
    return;
  }

  const response = await addToCart(product);

  if (!response.success) {
    triggerAlert(response.message, false); // isSuccess = false
  } else {
    triggerAlert("Item added to cart successfully!", true); // isSuccess = true
  }
};

export default AddToCart;

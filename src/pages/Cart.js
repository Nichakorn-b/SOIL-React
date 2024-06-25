import React, { useContext, useState, useEffect } from "react";
import CartItem from "../fragments/CartItem";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Alert from "../fragments/Alert";
import useAlert from "../hooks/useAlert";

/**
 * Cart component that displays the user's shopping cart items, allows quantity adjustments, and proceeds to the order summary.
 *
 *
 * @returns
 */
function Cart() {
  const { removeFromCart, displayCartItem, updateCartItemQuantity } =
    useContext(UserContext);
  const [itemList, setItemList] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const { showAlert, showAlertMessage, showAlertClassName, triggerAlert } =
    useAlert();

  /**
   * Handles the proceed to checkout action.
   */
  const handleProceedToCheckout = () => {
    navigate("/OrderSummary");
  };

  /**
   * Fetches the cart items and updates the state.
   */
  const fetchCartItems = async () => {
    const { itemList, total } = await displayCartItem();
    setItemList(itemList);
    setTotal(total);
  };

  useEffect(() => {
    fetchCartItems();
  }, [displayCartItem]);

  /**
   * Handles changing the quantity of a cart item.
   *
   * @param {Object} item - The cart item.
   * @param {number} item.quantity quantity of that item
   * @param {string} action - The action to perform, either 'increment' or 'decrement'.
   */
  const handleQuantityChange = async (item, action) => {
    const newQuantity =
      action === "increment" ? item.quantity + 1 : item.quantity - 1;

    if (newQuantity < 1) return;

    const response = await updateCartItemQuantity(item.id, newQuantity);

    if (!response.success) {
      triggerAlert(response.message, response.success);
    } else {
      fetchCartItems();
    }
  };

  return (
    <div className="container">
      <Alert
        show={showAlert}
        message={showAlertMessage}
        className={showAlertClassName}
      />

      <div className="d-flex justify-content-center">
        <div className="">
          <h2 className="text-center my-5">Shopping Cart</h2>

          {itemList.length === 0 ? (
            <p className="text-center">
              You have nothing in your shopping cart.
            </p>
          ) : (
            <div className="col-12">
              {itemList.map((item, index) => (
                <CartItem
                  key={index}
                  item={item}
                  isOrderSummary={false}
                  onRemove={(itemId) => removeFromCart(itemId)}
                  onIncrement={() => handleQuantityChange(item, "increment")}
                  onDecrement={() => handleQuantityChange(item, "decrement")}
                />
              ))}
            </div>
          )}

          {itemList.length > 0 && (
            <div className="mt-5">
              <div className="row">
                <div className="col-6 text-center fw-bold">Total</div>
                <div className="col-6 text-center">
                  <span>AUD {total.toFixed(2)}</span>
                </div>
              </div>
              <div className="row mb-5">
                <button
                  onClick={handleProceedToCheckout}
                  className="btn btn-primary btn-block mt-5"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;

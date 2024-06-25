import { useState, useEffect } from "react";
import {
  getCartDetails,
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
  submitCart,
} from "../data/cartRepository";

/**
 * Custom hook to manage cart operations.
 *
 * @param {string} cartID - The ID of the cart.
 * @returns {Object} The cart operations and state.
 */
const useCart = (cartID) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartNotificationCount, setCartNotificationCount] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      if (cartID) {
        try {
          const items = await getCartDetails(cartID);
          setCartItems(items);
        } catch (error) {
          console.error("Failed to fetch cart items", error);
        }
      }
    };

    fetchItems();
  }, [cartID]);

  useEffect(() => {
    const count = calculateCartNotificationCount(cartItems);
    setCartNotificationCount(count);
  }, [cartItems]);

  /**
   * Adds an item to the cart.
   *
   * @param {Object} item - The item to add to the cart.
   * @param {number} item.product_id - The ID of the product.
   * @returns
   */
  const addToCart = async (item) => {
    const response = await addItemToCart(item.product_id, 1, cartID);
    const success = response.success;
    // console.log(response);
    if (success) {
      // console.log("success");
      setCartItems((prevItems) => {
        const existingItem = prevItems.find(
          (x) => x.product_id === item.product_id
        );
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          prevItems.push({ product_id: item.product_id, quantity: 1 });
        }

        return [...prevItems];
      });
    }
    return response;
  };

  /**
   * Removes an item from the cart.
   *
   * @param {number} productId - The ID of the product to remove.
   * @returns
   */
  const removeFromCart = async (productId) => {
    // console.log(productId)
    await removeItemFromCart(productId, cartID);
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product_id !== productId)
    );
  };

  /**
   * Displays the cart items with details.
   *
   * @returns
   */
  const displayCartItem = async () => {
    const items = await getCartDetails(cartID);
    const result = items.map((item) => ({
      id: item.product.product_id,
      name: item.product.product_name,
      price: item.product.price,
      quantity: item.quantity,
      imageUrl: item.product.image_url,
      totalPrice: item.product.price * item.quantity,
    }));

    const total = result.reduce((acc, item) => acc + item.totalPrice, 0);
    return { itemList: result, total };
  };

  /**
   * Submits the cart.
   *
   * @returns
   */
  const cartSubmit = async () => {
    const response = await submitCart(cartID);
    if (response.success) {
      setCartItems([]);
    }

    return response;
  };

  /**
   * Clears all items from the cart.
   */
  const clearCartItems = () => {
    setCartNotificationCount(0);
    setCartItems([]);
  };

  /**
   * Calculates the cart notification count.
   *
   * @param {Array} items - The cart items.
   * @returns {number} The number of unique products in the cart.
   */
  const calculateCartNotificationCount = (items) => {
    return items.length;
  };

  /**
   * Updates the quantity of an item in the cart.
   *
   * @param {number} product_id - The ID of the product to update.
   * @param {number} quantity - The new quantity of the product.
   * @returns
   */
  const updateCartItemQuantity = async (product_id, quantity) => {
    const response = await updateCartItem(product_id, quantity, cartID);
    if (response.success) {
      setCartItems((prevItems) => {
        const item = prevItems.find((x) => x.product_id === product_id);
        if (item) {
          item.quantity = quantity;
        }
        return [...prevItems];
      });
    }
    return response;
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    displayCartItem,
    cartSubmit,
    cartNotificationCount,
    clearCartItems,
    updateCartItemQuantity,
  };
};

export default useCart;

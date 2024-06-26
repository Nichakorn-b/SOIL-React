import axios from "axios";
let API_HOST = process.env.REACT_APP_Heroku_API_HOST;

/**
 * get cart detail by cart_id
 * @param {int} cart_id
 * @returns
 */
async function getCartDetails(cart_id) {
  const response = await axios.get(API_HOST + `/api/cart/${cart_id}`);
  return response.data;
}

/**
 * add item to cart
 * @param {int} product_id
 * @param {int} quantity
 * @param {int} cart_id
 * @returns
 */
async function addItemToCart(product_id, quantity, cart_id) {
  const response = await axios.post(API_HOST + "/api/cart/add", {
    product_id,
    quantity,
    cart_id,
  });

  return response.data;
}

/**
 * update item in cart
 * @param {int} product_id
 * @param {int} quantity
 * @param {int} cart_id
 * @returns
 */
async function updateCartItem(product_id, quantity, cart_id) {
  const response = await axios.post(API_HOST + "/api/cart/update", {
    product_id,
    quantity,
    cart_id,
  });

  return response.data;
}

/**
 * remove item from cart
 * @param {int} product_id
 * @param {int} cart_id
 * @returns
 */
async function removeItemFromCart(product_id, cart_id) {
  const response = await axios.post(API_HOST + "/api/cart/remove", {
    product_id,
    cart_id,
  });
  return response.data;
}

/**
 * submit cart to create order and order detail
 * @param {int} cart_id
 * @returns
 */
async function submitCart(cart_id) {
  const response = await axios.post(API_HOST + "/api/cart/submit", { cart_id });
  return response.data;
}

export {
  getCartDetails,
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
  submitCart,
};

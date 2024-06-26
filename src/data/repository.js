import axios from "axios";
// --- Constants ----------------------------------------------------------------------------------
const API_HOST = process.env.REACT_APP_Heroku_API_HOST;
const USER_KEY = "user";
const CART_KEY = "cart";
const SERVER_MSG = "Unable to connect to the server. Please try again later.";

// --- User ---------------------------------------------------------------------------------------

/**
 * verify user login by email and password
 * @param {string} email
 * @param {string} password
 * @returns object of user data
 * success : true or false
 * message : use to show in server side
 */
async function verifyUser(email, password) {
  try {
    const response = await axios.post(API_HOST + "/api/users/login", {
      email,
      password,
    });
    const result = response.data;

    if (result.success) {
      const user = {
        id: result.user.user_id,
        name: result.user.firstname + " " + result.user.lastname,
      };

      setUser({ id: result.user.user_id });
      setCart(result.cartID);

      return [user, result.success, result.message];
    } else return [null, result.success, result.message];
  } catch (error) {
    return [null, false, SERVER_MSG];
  }
}

/**
 * get user profile by local storage login user ID
 * @returns user information
 */
async function getProfile() {
  const current = getUser();

  const response = await axios.get(
    API_HOST + `/api/users/profile/${current.id}`
  );

  return response.data;
}

/**
 * update firstname and lastname
 * @param {object} profile
 * @param {string} profile.firstname
 * @param {string} profile.lastname
 * @returns new user data profile
 */
async function updateProfile(profile) {
  const current = getUser();
  let data = {
    firstname: profile.firstname,
    lastname: profile.lastname,
    user_id: current.id,
  };
  const response = await axios.put(API_HOST + "/api/users/updateProfile", data);

  return response.data;
}

/**
 * Updates the password for the current user
 * @param {string} password
 * @returns
 */
async function updatePassword(password) {
  const current = getUser();
  const data = { user_id: current.id, password };
  const response = await axios.put(
    API_HOST + "/api/users/updatePassword",
    data
  );
  return response.data;
}

/**
 *  Adds a new user to the local storage if they do not already exist.
 * @param {string} email
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} password
 * @returns success and true or false and message
 */
async function registerUser(email, firstname, lastname, password) {
  try {
    const data = { email, firstname, lastname, password };
    const response = await axios.post(API_HOST + "/api/users/register", data);

    return response.data;
  } catch (error) {
    return { success: false, message: SERVER_MSG };
  }
}

/**
 *  Deletes a user and their cart items from database.
 * @returns
 */
async function deleteUser() {
  const current = getUser();
  const response = await axios.delete(
    API_HOST + `/api/users/deleteAccount/${current.id}`
  );
  return response.data;
}

// --- Products ---------------------------------------------------------------------------------------

/**
 * get all products from database
 * @returns
 */
async function getAllProducts() {
  try {
    const response = await axios.get(API_HOST + "/api/products/");
    return response.data;
  } catch (error) {
    // console.error("Error fetching products:", error);
    throw error;
  }
}

/**
 * get all category detail
 * @returns category object from database
 */
async function getAllCategories() {
  try {
    const response = await axios.get(API_HOST + "/api/products/categories");

    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

/**
 * get product detail by id
 * @param {int} id
 * @returns product detail
 */
async function getProductById(id) {
  try {
    const response = await axios.get(API_HOST + `/api/products/select/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
}

// --- Reviews ---------------------------------------------------------------------------------------
/**
 * get all reviews from database
 * @returns
 */
async function getAllReviews() {
  try {
    const response = await axios.get(API_HOST + "/api/reviews/");
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
}

/**
 * get all preview by product id
 * @param {number} productId
 * @returns review related to product id
 */
async function getProductReviews(productId) {
  try {
    const response = await axios.get(
      API_HOST + `/api/reviews/${productId}/reviews`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching reviews for product with id ${productId}:`,
      error
    );
    throw error;
  }
}

/**
 * create new review
 * @param {object} review
 * @param {string} review.title
 * @param {string} review.description
 * @param {number}    review.stars
 * @param {number}    review.product_id
 * @param {number}    review.user_id
 * @returns
 */
async function createReview(review) {
  try {
    review.user_id = getUser().id;
    const response = await axios.post(API_HOST + "/api/reviews", review);
    return response.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
}

/**
 * update review by review_id
 * @param {number} review_id
 * @param {object} review
 * @param {number} review.stars
 * @param {number} review.user_id
 * @returns
 */
async function updateReview(review_id, review) {
  try {
    const response = await axios.put(
      API_HOST + `/api/reviews/${review_id}`,
      review
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating review with id ${review_id}:`, error);
    throw error;
  }
}

/**
 * delete review by review_id and user_id
 * @param {number} review_id
 * @param {number} user_id
 * @returns
 */
async function deleteReview(review_id, user_id) {
  try {
    const response = await axios.delete(
      API_HOST + `/api/reviews/${review_id}`,
      {
        data: { user_id },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting review with id ${review_id}:`, error);
    throw error;
  }
}

// --- Replies ---------------------------------------------------------------------------------------

/**
 * create new reply
 * @param {object} reply reply detail
 * @param {string} reply.description
 * @param {number} reply.product_id
 * @param {number} reply.user_id
 * @param {number} reply.parent_id
 * @returns
 */
async function createReply(reply) {
  try {
    const response = await axios.post(
      API_HOST + `/api/reviews/${reply.parent_id}/reply`,
      reply
    );
    return response.data;
  } catch (error) {
    console.error("Error creating reply", error);
    throw error;
  }
}

/**
 * update reply by reply_id
 * @param {number} reply_id
 * @param {object} reply
 * @param {object} reply.user_id
 * @param {object} reply.description
 * @returns
 */
export async function updateReply(reply_id, reply) {
  try {
    const response = await axios.put(
      API_HOST + `/api/reviews/replies/${reply_id}`,
      reply
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating reply with id ${reply_id}:`, error);
    throw error;
  }
}

/**
 * delete reply id by reply_id and user_id
 * @param {number} reply_id
 * @param {number} user_id
 * @returns
 */
async function deleteReply(reply_id, user_id) {
  try {
    const response = await axios.delete(
      API_HOST + `/api/reviews/replies/${reply_id}`,
      {
        data: { user_id },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting reply with id ${reply_id}:`, error);
    throw error;
  }
}

//----- Follow ---------------------------------------------------------------------------
/**
 * follow user
 * @param {number} follower_id
 * @param {number} following_id
 * @returns
 */
async function followUser(follower_id, following_id) {
  try {
    const response = await axios.post(API_HOST + `/api/follow/follow`, {
      follower_id,
      following_id,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to follow user.");
    throw error;
  }
}

/**
 * unfollower user
 * @param {number} follower_id
 * @param {number} following_id
 * @returns
 */
async function unfollowUser(follower_id, following_id) {
  try {
    const response = await axios.post(API_HOST + `/api/follow/unfollow`, {
      follower_id,
      following_id,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to follow user.");
    throw error;
  }
}

/**
 *
 * @param {number} follower_id
 * @param {number} following_id
 * @returns
 */
async function isUserFollowing(follower_id, following_id) {
  try {
    const response = await axios.post(API_HOST + "/api/follow/isFollowing", {
      follower_id,
      following_id,
    });
    return response.data.isFollowing;
  } catch (error) {
    console.error("Failed to check following status:", error);
    throw error;
  }
}

// --- Helper functions to interact with local storage --------------------------------------------
/**
 * set user object to local storage
 * @param {object} user
 */
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/**
 * get user object from local storage
 * @returns user object
 */
function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

/**
 * set cart id to local storage
 * @param {int} cartID
 */
function setCart(cartID) {
  localStorage.setItem(CART_KEY, JSON.stringify(cartID));
}

/**
 * get cart from local storage
 * @returns
 */
function getCart() {
  return localStorage.getItem(CART_KEY);
}

/**
 * delete user from local storage
 */
function removeUser() {
  localStorage.removeItem(USER_KEY);
}

/**
 * remove cart from local storage
 */
function removeCart() {
  localStorage.removeItem(CART_KEY);
}

/**
 * get end point
 * @returns end point url
 */
function getEndpoint() {
  return API_HOST;
}
export {
  verifyUser,
  getProfile,
  updateProfile,
  getUser,
  removeUser,
  registerUser,
  deleteUser,
  updatePassword,
  getAllProducts,
  getProductById,
  getCart,
  removeCart,
  getAllReviews,
  getProductReviews,
  setUser,
  createReview,
  updateReview,
  getEndpoint,
  deleteReview,
  createReply,
  getAllCategories,
  deleteReply,
  followUser,
  unfollowUser,
  isUserFollowing,
};

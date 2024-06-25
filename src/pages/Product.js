import React, { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Alert from "../fragments/Alert";
import useAlert from "../hooks/useAlert";
import AddToCart from "../utility/cartUtility";
import {
  getProductById,
  getProductReviews,
  getEndpoint,
  deleteReply,
  isUserFollowing,
  followUser,
  unfollowUser,
  deleteReview,
} from "../data/repository";
import StarRatings from "react-star-ratings";
import ReviewForm from "../fragments/ReviewForm";
import ReviewEditForm from "../fragments/ReviewEditForm";
import ReviewDelete from "../fragments/ReviewDelete";
import ReviewReplyForm from "../fragments/ReviewReplyForm";
import ReviewReplyEditForm from "../fragments/ReviewReplyEditForm";
import ConfirmDeleteReview from "../fragments/ConfirmDeleteReview";
import FollowButton from "../fragments/FollowButton";
import ReplyDelete from "../fragments/ReplyDelete";

// Import obscenity classes
import {
  RegExpMatcher,
  TextCensor,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";

const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});
const censor = new TextCensor();

const censorText = (text) => {
  const matches = matcher.getAllMatches(text);
  return censor.applyTo(text, matches);
};

/**
 * Product component that displays product details, handles reviews and replies.
 * @returns
 */
function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [editReviewId, setEditReviewId] = useState(null);
  const [replyReviewId, setReplyReviewId] = useState(null);
  const [editReplyId, setEditReplyId] = useState(null);
  const [replyToDelete, setReplyToDelete] = useState(null);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followingUsers, setFollowingUsers] = useState({});

  const { username, addToCart } = useContext(UserContext);
  const navigate = useNavigate();

  const { showAlert, showAlertMessage, showAlertClassName, triggerAlert } =
    useAlert();

  useEffect(() => {
    /**
     * load product data
     */
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        setError("Failed to fetch product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  /**
   * get review data
   */
  const fetchReviews = useCallback(async () => {
    try {
      const data = await getProductReviews(id);
      setReviews(data);

      if (username) {
        const followStatus = {};
        await Promise.all(
          data.map(async (review) => {
            if (review.user_id !== username.id) {
              const isFollowingResponse = await isUserFollowing(
                username.id,
                review.user_id
              );
              followStatus[review.user_id] = isFollowingResponse;
            }
          })
        );
        setFollowingUsers(followStatus);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  }, [id, username]);

  /**
   * fetch review
   */
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  /**
   * Handles following a user.
   *
   * @param {string} user_id - ID of the user to follow.
   */
  const handleFollow = async (user_id) => {
    if (!username) {
      triggerAlert("Please, login to follow the user", false, 3000);
      return;
    }

    if (username && username.id === user_id) {
      triggerAlert("You cannot follow yourself", false, 3000);
      return;
    }

    try {
      await followUser(username.id, user_id);
      setFollowingUsers((prev) => ({ ...prev, [user_id]: true }));
      triggerAlert("User followed successfully!", true, 3000);
    } catch (error) {
      console.error("Failed to follow user:", error);
      triggerAlert("Failed to follow user.", false, 3000);
    }
  };

  /**
   * Handles unfollowing a user.
   *
   * @param {string} user_id - ID of the user to unfollow.
   */
  const handleUnfollow = async (user_id) => {
    try {
      await unfollowUser(username.id, user_id);
      setFollowingUsers((prev) => ({ ...prev, [user_id]: false }));
      triggerAlert("User unfollowed successfully!", true, 3000);
    } catch (error) {
      console.error("Failed to unfollow user:", error);
      triggerAlert("Failed to unfollow user.", false, 3000);
    }
  };

  /**
   * Sets the review to be edited.
   *
   * @param {Object} review - Review object to edit.
   */
  const handleEditClick = (review) => {
    setEditReviewId(review.review_id);
  };

  /**
   * Cancels editing a review.
   */
  const handleCancelEdit = () => {
    setEditReviewId(null);
  };

  /**
   * Handles adding a product to the cart.
   *
   * @param {Object} product - Product object to add to cart.
   */
  const handleCart = (product) => {
    AddToCart(username, triggerAlert, navigate, addToCart, product);
  };

  /**
   * Handles success after submitting a review.
   */
  const handleReviewSuccess = () => {
    triggerAlert("Your review has been submitted successfully!", true, 3000);
  };

  /**
   * Handles success after submitting a reply.
   */
  const handleReplySuccess = () => {
    triggerAlert(
      "Your reply has been submitted successfully!",
      true,
      3000,
      () => setReplyReviewId(null)
    );
  };

  /**
   * Handles success after editing a review.
   */
  const handleEditReviewSuccess = () => {
    triggerAlert("Your review has been edited successfully!", true, 3000);
  };

  /**
   * Handles success after editing a reply.
   */
  const handleEditReplySuccess = () => {
    triggerAlert("Your reply has been edited successfully!", true, 3000);
  };

  /**
   * Sets the review to be replied to.
   *
   * @param {string} reviewId - ID of the review to reply to.
   */
  const handleReplyClick = (reviewId) => {
    setReplyReviewId(reviewId);
  };

  /**
   * Cancels replying to a review.
   */
  const handleCancelReply = () => {
    setReplyReviewId(null);
  };

  /**
   * Sets the reply to be edited.
   *
   * @param {string} replyId - ID of the reply to edit.
   */
  const handleEditReplyClick = (replyId) => {
    setEditReplyId(replyId);
  };

  /**
   * Cancels editing a reply.
   */
  const handleCancelEditReply = () => {
    setEditReplyId(null);
  };

  /**
   * Deletes a reply.
   */
  const handleDeleteReply = async () => {
    if (replyToDelete && username.id) {
      try {
        await deleteReply(replyToDelete.review_id, username.id);
        fetchReviews();
      } catch (error) {
        console.error("Failed to delete reply:", error);
      } finally {
        setReplyToDelete(null); // Clear the state after deleting
      }
    }
  };

  /**
   * Confirms and deletes a review.
   */
  const handleConfirmDeleteReview = async () => {
    if (reviewToDelete && username.id) {
      try {
        await deleteReview(reviewToDelete.review_id, username.id);
        fetchReviews();
      } catch (error) {
        console.error("Failed to delete review:", error);
      } finally {
        setReviewToDelete(null); // Clear the state after deleting
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="d-flex justify-content-center">
      <Alert
        show={showAlert}
        message={showAlertMessage}
        className={showAlertClassName}
      />
      <div className="card h-100" style={{ width: "40rem" }}>
        {product && (
          <div>
            <div className="d-flex justify-content-center">
              <img
                src={`${getEndpoint()}${product.image_url}`}
                className="card-img-top mx-auto mt-3 image-wrapper"
                alt={product.product_name}
                style={{ maxWidth: "250px" }}
              />
            </div>
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title text-center fs-4">
                {product.product_name}
              </h5>
              <p className="card-text text-center fs-4">${product.price}</p>
              <button
                className="btn btn-outline-danger mb-2 mt-2"
                onClick={() => handleCart(product)}
              >
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
              <h5 className="card-title mt-3 mb-3">Product Details</h5>
              <p className="card-text">{product.description}</p>
              <h5 className="card-title mt-3 mb-3">Customer Reviews</h5>
              {reviews.length > 0 ? (
                <div className="mt-3">
                  {reviews.map((review) => (
                    <div
                      key={review.review_id}
                      className="card mb-3 position-relative"
                    >
                      {/* <span>{review.review_id}</span> */}
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <div>
                            <h5 className="card-title mb-2">
                              {review.firstname}{" "}
                              {username && username.id !== review.user_id && (
                                <FollowButton
                                  user_id={review.user_id}
                                  isFollowing={
                                    followingUsers[review.user_id] || false
                                  }
                                  handleFollow={handleFollow}
                                  handleUnfollow={handleUnfollow}
                                />
                              )}
                            </h5>
                            {!review.is_deleted && (
                              <>
                                <div className="d-flex align-items-end">
                                  <StarRatings
                                    rating={review.stars}
                                    starRatedColor="gold"
                                    numberOfStars={5}
                                    name="rating"
                                    starDimension="18px"
                                    starSpacing="2px"
                                  />
                                  <h5 className="card-title mx-2 mb-0">
                                    {censorText(review.title)}
                                  </h5>
                                </div>
                              </>
                            )}
                            <div
                              className="mt-3"
                              dangerouslySetInnerHTML={{
                                __html: review.is_deleted
                                  ? review.delete_message
                                  : censorText(review.description),
                              }}
                            />
                            {!review.is_deleted && (
                              <p className="card-text">
                                <small className="text-muted">
                                  Reviewed on{" "}
                                  {new Date(
                                    review.create_datetime
                                  ).toLocaleString()}
                                  {review.update_datetime && (
                                    <span className="fst-italic">
                                      {" "}
                                      (Edited on{" "}
                                      {new Date(
                                        review.update_datetime
                                      ).toLocaleString()}
                                      )
                                    </span>
                                  )}
                                </small>
                              </p>
                            )}
                          </div>
                          {username &&
                            review.user_id === username.id &&
                            !review.is_deleted && (
                              <div>
                                <button
                                  className="btn btn-outline-secondary btn-sm"
                                  onClick={() => handleEditClick(review)}
                                  style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "80px",
                                  }}
                                >
                                  Edit
                                </button>
                                <ReviewDelete
                                  review={review}
                                  setReviewToDelete={setReviewToDelete}
                                />
                              </div>
                            )}
                        </div>
                        {review.review_id &&
                          editReviewId === review.review_id &&
                          !review.is_deleted && (
                            <ReviewEditForm
                              review={review}
                              fetchReviews={fetchReviews}
                              handleCancelEdit={handleCancelEdit}
                              setEditReviewId={setEditReviewId}
                              handleEditReviewSuccess={handleEditReviewSuccess}
                            />
                          )}
                        {review.replies && review.replies.length > 0 && (
                          <div className="ml-4 mt-3">
                            <h6 className="mb-3">Replies</h6>
                            {review.replies.map((reply) => (
                              <div key={reply.review_id} className="card mt-2">
                                <div className="card-body">
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: censorText(reply.description),
                                    }}
                                  />
                                  {!reply.is_deleted && (
                                    <p className="card-text">
                                      <small className="text-muted">
                                        Replied by {reply.firstname} on{" "}
                                        {new Date(
                                          reply.create_datetime
                                        ).toLocaleString()}
                                        {reply.update_datetime && (
                                          <span className="text-muted fst-italic">
                                            {" "}
                                            Edited on{" "}
                                            {new Date(
                                              reply.update_datetime
                                            ).toLocaleString()}
                                          </span>
                                        )}
                                      </small>
                                    </p>
                                  )}
                                  {username &&
                                    reply.user_id === username.id &&
                                    !reply.is_deleted && (
                                      <div className="d-flex justify-content-end">
                                        <button
                                          className="btn btn-outline-secondary btn-sm"
                                          onClick={() =>
                                            handleEditReplyClick(
                                              reply.review_id
                                            )
                                          }
                                          style={{
                                            position: "absolute",
                                            top: "10px",
                                            right: "80px",
                                          }}
                                        >
                                          Edit
                                        </button>
                                        <ReplyDelete
                                          reply={reply}
                                          setReplyToDelete={setReplyToDelete}
                                        />
                                      </div>
                                    )}
                                  {reply.review_id &&
                                    editReplyId === reply.review_id && (
                                      <ReviewReplyEditForm
                                        reply={reply}
                                        fetchReviews={fetchReviews}
                                        handleCancelEditReply={
                                          handleCancelEditReply
                                        }
                                        handleEditReplySuccess={
                                          handleEditReplySuccess
                                        }
                                      />
                                    )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        {username && (
                          <div className="d-grid gap-1">
                            <button
                              className="btn btn-outline-secondary mt-3"
                              style={{
                                padding: "0.20rem 0.5rem",
                                fontSize: "1rem",
                              }}
                              onClick={() => handleReplyClick(review.review_id)}
                            >
                              Reply
                            </button>
                          </div>
                        )}
                        {username && replyReviewId === review.review_id && (
                          <ReviewReplyForm
                            productId={product.product_id}
                            parentId={review.review_id}
                            fetchReviews={fetchReviews}
                            handleReplySuccess={handleReplySuccess}
                            handleCancelReply={handleCancelReply}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No reviews available.</p>
              )}
              <ReviewForm
                productId={id}
                fetchReviews={fetchReviews}
                handleReviewSuccess={handleReviewSuccess}
              />
            </div>
          </div>
        )}
      </div>
      <ConfirmDeleteReview
        onConfirmDelete={
          reviewToDelete ? handleConfirmDeleteReview : handleDeleteReply
        }
        onCancel={() => {
          setReviewToDelete(null);
          setReplyToDelete(null);
        }}
      />
    </div>
  );
}

export default Product;

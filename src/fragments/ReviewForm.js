import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import StarRatings from "react-star-ratings";
import { validateReview } from "../utility/validateReview";
import { createReview } from "../data/repository";
import UserContext from "../contexts/UserContext";

/**
 * ReviewEditForm component allows a user to edit their review.
 *
 * @param {Object} review - The review object to be edited.
 * @param {function} fetchReviews - Function to fetch reviews.
 * @param {function} handleCancelEdit - Function to handle canceling the edit.
 * @param {function} setEditReviewId - Function to set the ID of the review being edited.
 * @param {function} handleEditReviewSuccess - Function to handle successful edit of the review.
 * @returns
 */
const ReviewForm = ({ productId, fetchReviews, handleReviewSuccess }) => {
  const { username } = useContext(UserContext);
  const [newReview, setNewReview] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  /**
   * Resets the review form content.
   */
  const resetReviewContent = () => {
    setNewReview("");
    setNewTitle("");
    setNewRating(0);
    setErrorMessage(null);
  };

  /**
   * Handles the form submission for creating a new review.
   *
   * @param {Event} event - The form submission event.
   */
  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    if (!validateReview(newTitle, newReview, newRating, setErrorMessage)) {
      return;
    }

    if (!username) {
      setErrorMessage("You must be logged in to post a review.");
      return;
    }

    //create review
    const reviewData = {
      title: newTitle,
      description: newReview,
      stars: newRating,
      product_id: productId,
      user_id: username.id,
    };

    try {
      await createReview(reviewData);

      fetchReviews();
      handleReviewSuccess();

      resetReviewContent();
    } catch (error) {
      //console.log(error.request.status === 404);
      if (error.request.status === 404 || error.request.status === 403) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Failed to create review. Please try again later.");
      }
    }
  };

  return (
    <form onSubmit={handleReviewSubmit} className="mt-4">
      <fieldset>
        <h5 className="mb-3">Leave a Review</h5>
        <div className="form-group">
          <label htmlFor="reviewTitle" className="fw-bold mb-1">
            Title
          </label>
          <input
            type="text"
            id="reviewTitle"
            className="form-control mb-2"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div className="form-group d-flex align-items-center mt-3 mb-2">
          <label
            htmlFor="reviewRating"
            className="fw-bold mt-1 mr-2"
            style={{ marginRight: "10px" }}
          >
            Rating:
          </label>

          <StarRatings
            rating={newRating}
            changeRating={(newRating) => setNewRating(newRating)}
            starRatedColor="gold"
            numberOfStars={5}
            name="rating"
            starDimension="18px"
            starSpacing="2px"
          />
        </div>
        <div className="form-group " style={{ marginBottom: "60px" }}>
          <label htmlFor="reviewContent" className="fw-bold mb-1">
            Review
          </label>
          <ReactQuill
            theme="snow"
            value={newReview}
            onChange={setNewReview}
            style={{ height: "180px" }}
          />
        </div>
        {errorMessage !== null && (
          <div className="form-group mt-2 mb-2">
            <span className="text-danger">{errorMessage}</span>
          </div>
        )}
        <div className="form-group">
          <input type="submit" className="btn btn-primary" value="Post" />

          <input
            type="button"
            className="btn btn-secondary"
            value="Cancel"
            onClick={resetReviewContent}
            style={{ marginLeft: "10px" }}
          />
        </div>
      </fieldset>
    </form>
  );
};

export default ReviewForm;

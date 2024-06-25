import React, { useState, useContext } from "react";
import StarRatings from "react-star-ratings";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updateReview } from "../data/repository";
import { validateReview } from "../utility/validateReview";
import UserContext from "../contexts/UserContext";

/**
 *  ReviewEditForm component allows a user to edit their review.
 *
 * @param {Object} review - The review object to be edited.
 * @param {function} fetchReviews - Function to fetch reviews.
 * @param {function} handleCancelEdit - Function to handle canceling the edit.
 * @param {function} setEditReviewId - Function to set the ID of the review being edited.
 * @param {function} handleEditReviewSuccess - Function to handle successful edit of the review.
 * @returns
 */
const ReviewEditForm = ({
  review,
  fetchReviews,
  handleCancelEdit,
  setEditReviewId,
  handleEditReviewSuccess,
}) => {
  const { username } = useContext(UserContext);

  const [editReviewContent, setEditReviewContent] = useState(
    review.description
  );
  const [editTitle, setEditTitle] = useState(review.title);
  const [editRating, setEditRating] = useState(review.stars);
  const [errorMessage, setErrorMessage] = useState(null);

  /**
   * Handles the form submission for editing the review.
   *
   * @param {Event} event
   * @returns
   */
  const handleReviewEdit = async (event) => {
    event.preventDefault();
    const reviewData = {
      title: editTitle,
      description: editReviewContent,
      stars: editRating,
      user_id: username.id,
    };

    if (
      !validateReview(editTitle, editReviewContent, editRating, setErrorMessage)
    ) {
      return;
    }

    try {
      await updateReview(review.review_id, reviewData);
      fetchReviews(); // Refresh reviews after editing
      handleEditReviewSuccess();
      setEditReviewId(null);
      setEditReviewContent("");
      setEditTitle("");
      setEditRating(0);
      // console.log("update review: " + update_Review);
    } catch (error) {
      if (error.request.status === 404 || error.request.status === 403) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Failed to create review. Please try again later.");
      }
    }
  };

  return (
    <form onSubmit={handleReviewEdit} className="mt-4 mb-4">
      <div className="form-group">
        <label htmlFor="editTitle" className="fw-bold mb-1">
          Title
        </label>
        <input
          type="text"
          id="editTitle"
          className="form-control"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Edit Title"
        />
      </div>

      <div className="form-group d-flex align-items-center mt-3 mb-2">
        <label
          htmlFor="editRating"
          className="fw-bold mt-1 mr-2"
          style={{ marginRight: "10px" }}
        >
          Rating:
        </label>

        <StarRatings
          rating={editRating}
          changeRating={(newRating) => setEditRating(newRating)}
          starRatedColor="gold"
          numberOfStars={5}
          name="rating"
          starDimension="18px"
          starSpacing="2px"
        />
      </div>
      <div className="form-group mt-2 mb-5">
        <label htmlFor="editReviewContent" className="fw-bold mb-1">
          Review
        </label>
        <ReactQuill
          theme="snow"
          value={editReviewContent}
          onChange={setEditReviewContent}
          style={{ height: "180px" }}
        />
      </div>

      {errorMessage && (
        <div className="form-group mt-5">
          <span className="text-danger">{errorMessage}</span>
        </div>
      )}

      <div className="form-group">
        <button type="submit" className="btn btn-primary mt-2">
          Update Review
        </button>
        <button
          type="button"
          className="btn btn-secondary mt-2"
          onClick={handleCancelEdit}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ReviewEditForm;

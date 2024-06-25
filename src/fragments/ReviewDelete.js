import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";

/**
 * ReviewDelete component renders a button to delete a review.
 * When clicked, it triggers a modal confirmation for deleting the review.
 *
 * @param {Object} review - The review object to be deleted.
 * @param {function} setReviewToDelete - Function to set the review to be deleted.
 * @returns
 */
const ReviewDelete = ({ review, setReviewToDelete }) => {
  const { username } = useContext(UserContext);

  /**
   * Handles the click event for the delete button.
   * Sets the review to be deleted.
   */
  const handleDeleteClick = () => {
    setReviewToDelete(review);
  };

  return (
    <>
      <button
        className="btn btn-outline-danger btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#confirmDeleteModal"
        style={{ position: "absolute", top: "10px", right: "10px" }}
        onClick={handleDeleteClick}
      >
        Delete
      </button>
    </>
  );
};

export default ReviewDelete;

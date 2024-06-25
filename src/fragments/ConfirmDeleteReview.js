import React from "react";

/**
 * ConfirmDeleteReview component renders a modal for confirming the deletion of a review.
 *
 * @param {function} onConfirmDelete - Function to call when the delete action is confirmed.
 * @param {function} onCancel - Function to call when the cancel action is triggered.
 * @returns
 */
const ConfirmDeleteReview = ({ onConfirmDelete, onCancel }) => {
  return (
    <div
      className="modal fade"
      id="confirmDeleteModal"
      tabIndex="-1"
      aria-labelledby="confirmDeleteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="confirmDeleteModalLabel">
              Confirm Delete
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onCancel}
            ></button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete this review? This action cannot be
            undone.
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirmDelete}
              data-bs-dismiss="modal"
            >
              Delete Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteReview;

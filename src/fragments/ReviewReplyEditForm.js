import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updateReply } from "../data/repository";
import UserContext from "../contexts/UserContext";

/**
 * ReviewReplyEditForm component allows a user to edit a reply to a review.
 *
 * @param {Object} reply - The reply object to be edited.
 * @param {function} fetchReviews - Function to fetch reviews after editing a reply.
 * @param {function} handleCancelEditReply - Function to handle canceling the edit of a reply.
 * @param {function} handleEditReplySuccess - Function to handle successful edit of the reply.
 * @returns
 */
const ReviewReplyEditForm = ({
  reply,
  fetchReviews,
  handleCancelEditReply,
  handleEditReplySuccess,
}) => {
  const { username } = useContext(UserContext);
  const [replyContent, setReplyContent] = useState(reply.description);
  const [errorMessage, setErrorMessage] = useState(null);

  /**
   * Handles the form submission for editing a reply.
   *
   * @param {Event} event - The form submission event.
   */
  const handleReplyEditSubmit = async (event) => {
    event.preventDefault();

    if (!username) {
      setErrorMessage("You must be logged in to edit a reply.");
      return;
    }

    const replyData = {
      description: replyContent,
      user_id: username.id,
    };

    try {
      const response = await updateReply(reply.review_id, replyData);
      console.log(response);
      fetchReviews();
      handleEditReplySuccess();
      handleCancelEditReply();
    } catch (error) {
      console.log(error);
      if (error.request.status === 404 || error.request.status === 403) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Failed to update reply. Please try again later.");
      }
    }
  };

  return (
    <form onSubmit={handleReplyEditSubmit} className="mt-3">
      <div className="form-group">
        <ReactQuill
          theme="snow"
          value={replyContent}
          onChange={setReplyContent}
          style={{ height: "120px" }}
        />
      </div>

      <div className="form-group mt-5">
        {errorMessage && (
          <div className="form-group mt-2 mb-2">
            <span className="text-danger">{errorMessage}</span>
          </div>
        )}
        <button type="submit" className="btn btn-primary mt-2">
          Update Reply
        </button>
        <button
          type="button"
          className="btn btn-secondary mt-2"
          onClick={handleCancelEditReply}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ReviewReplyEditForm;

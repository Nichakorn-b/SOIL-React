import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createReply } from "../data/repository";
import UserContext from "../contexts/UserContext";

/**
 *
 * @param {number} productId - The ID of the product being reviewed.
 * @param {number} parentId - The ID of the parent review being replied to.
 * @param {function} fetchReviews - Function to fetch reviews after submitting a new reply.
 * @param {function} handleReplySuccess - Function to handle successful reply submission.
 * @param {function} handleCancelReply - Function to handle canceling the reply.
 * @returns
 */
const ReviewReplyForm = ({
  productId,
  parentId,
  fetchReviews,
  handleReplySuccess,
  handleCancelReply,
}) => {
  const { username } = useContext(UserContext);
  const [reply, setReply] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  /**
   * Resets the reply form content.
   */
  const resetReplyContent = () => {
    setReply("");
    setErrorMessage(null);
  };

  /**
   * Handles the form submission for creating a new reply.
   *
   * @param {Event} event - The form submission event.
   */
  const handleReplySubmit = async (event) => {
    event.preventDefault();
    if (!reply) {
      setErrorMessage("Reply content is required.");
      return;
    }

    if (!username) {
      setErrorMessage("You must be logged in to post a reply.");
      return;
    }

    const replyData = {
      description: reply,
      product_id: productId,
      user_id: username.id,
      parent_id: parentId,
    };

    try {
      const addReply = await createReply(replyData);
      fetchReviews();
      handleReplySuccess();
      console.log(addReply);
      resetReplyContent();
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
    <form onSubmit={handleReplySubmit} className="mt-4">
      <fieldset>
        <h5 className="mb-3">Leave a Reply</h5>
        {/* {!username && (
          <div className="form-group mt-2 mb-2">
            <span className="text-danger">You must be logged in to post a reply.</span>
          </div>
        )} */}
        <div className="form-group" style={{ marginBottom: "60px" }}>
          <label htmlFor="replyContent" className="fw-bold mb-1">
            Reply
          </label>
          <ReactQuill
            theme="snow"
            value={reply}
            onChange={setReply}
            style={{ height: "180px" }}
          />
        </div>
        {errorMessage && (
          <div className="form-group mt-2 mb-2">
            <span className="text-danger">{errorMessage}</span>
          </div>
        )}
        <div className="form-group">
          <input
            type="submit"
            className="btn btn-primary"
            value="Post Reply"
            disabled={!username}
          />
          <input
            type="button"
            className="btn btn-secondary"
            value="Cancel"
            onClick={handleCancelReply}
            style={{ marginLeft: "10px" }}
          />
        </div>
      </fieldset>
    </form>
  );
};

export default ReviewReplyForm;

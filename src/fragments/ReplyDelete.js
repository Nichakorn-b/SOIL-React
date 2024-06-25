import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";

/**
 * ReplyDelete component renders a button to delete a reply.
 * When clicked, it triggers a modal confirmation for deleting the reply.
 *
 * @param {Object} reply - The reply object to be deleted.
 * @param {function} setReplyToDelete - Function to set the reply to be deleted.
 * @returns
 */
const ReplyDelete = ({ reply, setReplyToDelete }) => {
  const { username } = useContext(UserContext);
  /**
   * Handles the click event for the delete button.
   * Sets the reply to be deleted.
   */
  const handleDeleteClick = () => {
    setReplyToDelete(reply);
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

export default ReplyDelete;

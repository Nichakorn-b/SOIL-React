import React from "react";

/**
 * Alert component that displays a message when triggered.
 *
 * @param {boolean} show - Determines whether the alert is shown.
 * @param {string} message - The message to display in the alert.
 * @param {string} className - The CSS class for styling the alert.
 * @returns
 */
function Alert({ show, message, className }) {
  return (
    <>
      {show && (
        <div
          className={className}
          role="alert"
          style={{
            position: "fixed",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
          }}
        >
          {message}
        </div>
      )}
    </>
  );
}

export default Alert;

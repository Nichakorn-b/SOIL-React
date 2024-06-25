import { useState } from "react";

/**
 * Custom hook to manage alert notifications.
 *
 * @returns {Object} The alert state and functions to manage alerts.
 */
const useAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertMessage, setShowAlertMessage] = useState("");
  const [showAlertClassName, setShowAlertClassName] = useState("");

  const triggerAlert = (message, isSuccess, duration = 4000, actions) => {
    const className = isSuccess ? "alert alert-success" : "alert alert-danger";

    setShowAlert(true);
    setShowAlertMessage(message);
    setShowAlertClassName(className);

    setTimeout(() => {
      setShowAlert(false);
      if (actions) actions();
    }, duration);
  };

  return {
    showAlert,
    showAlertMessage,
    showAlertClassName,
    triggerAlert,
  };
};

export default useAlert;

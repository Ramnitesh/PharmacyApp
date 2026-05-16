import React from "react";
import "../styles/Toast.css";

/**
 * Toast notification component
 * @param {String} message - Toast message
 * @param {String} type - Toast type: 'success', 'error', 'info'
 * @param {Function} onClose - Callback to close toast
 */
const Toast = ({ message, type = "info", onClose }) => {
  React.useEffect(() => {
    // Auto-dismiss after 4 seconds
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-icon">
        {type === "success" && "✅"}
        {type === "error" && "❌"}
        {type === "info" && "ℹ️"}
      </span>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose}>
        ✕
      </button>
    </div>
  );
};

export default Toast;

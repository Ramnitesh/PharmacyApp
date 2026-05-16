import React from "react";
import "../styles/Loader.css";

/**
 * Loading spinner component
 * Displays a centered loading animation
 */
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Loading medicines...</p>
    </div>
  );
};

export default Loader;

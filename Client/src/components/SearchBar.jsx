import React from "react";
import "../styles/SearchBar.css";

/**
 * Search bar component for filtering medicines by name
 * @param {String} searchTerm - Current search term
 * @param {Function} onSearchChange - Callback when search term changes
 */
const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search medicines by name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      <span className="search-icon">🔍</span>
    </div>
  );
};

export default SearchBar;

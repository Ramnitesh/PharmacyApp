import React from "react";
import "../styles/MedicineTable.css";

/**
 * MedicineTable component - Displays medicines in a responsive table
 * @param {Array} medicines - Array of medicine objects
 * @param {Function} onEdit - Callback for edit action
 * @param {Function} onDelete - Callback for delete action
 */
const MedicineTable = ({ medicines, onEdit, onDelete }) => {
  /**
   * Determine row background color based on expiry date and quantity
   * Expiry date has higher priority than quantity
   */
  const getRowClass = (medicine) => {
    const expiryDate = new Date(medicine.expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.floor(
      (expiryDate - today) / (1000 * 60 * 60 * 24),
    );

    // Red if expiry date is less than 30 days
    if (daysUntilExpiry < 30) {
      return "row-danger";
    }

    // Yellow if quantity is less than 10
    if (medicine.quantity < 10) {
      return "row-warning";
    }

    return "";
  };

  /**
   * Format date to readable format (DD/MM/YYYY)
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  /**
   * Format currency to readable format
   */
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  if (medicines.length === 0) {
    return (
      <div className="empty-state">
        <p>📦 No medicines found. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="medicine-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Brand</th>
            <th>Expiry Date</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine.id} className={getRowClass(medicine)}>
              <td data-label="Full Name" className="fullname-cell">
                <span title={medicine.notes ? medicine.notes : "No notes"}>
                  {medicine.fullName}
                </span>
              </td>
              <td data-label="Brand">{medicine.brand}</td>
              <td data-label="Expiry Date">
                {formatDate(medicine.expiryDate)}
              </td>
              <td data-label="Quantity">{medicine.quantity}</td>
              <td data-label="Price">{formatCurrency(medicine.price)}</td>
              <td data-label="Actions" className="action-buttons">
                <button
                  onClick={() => onEdit(medicine)}
                  className="btn-edit"
                  title="Edit medicine"
                >
                  ✏️
                </button>
                <button
                  onClick={() => onDelete(medicine.id)}
                  className="btn-delete"
                  title="Delete medicine"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicineTable;

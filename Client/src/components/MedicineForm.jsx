import React, { useState, useEffect } from "react";
import "../styles/MedicineForm.css";

/**
 * MedicineForm component - Form to add/edit medicines
 * @param {Function} onSubmit - Callback when form is submitted
 * @param {Object} initialValues - Initial form values (for editing)
 * @param {Boolean} loading - Loading state
 * @param {Function} onCancel - Callback to cancel editing
 */
const MedicineForm = ({
  onSubmit,
  initialValues = null,
  loading = false,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    brand: "",
    expiryDate: "",
    quantity: "",
    price: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with existing values if editing
  useEffect(() => {
    if (initialValues) {
      setFormData({
        fullName: initialValues.fullName || "",
        brand: initialValues.brand || "",
        expiryDate: initialValues.expiryDate
          ? new Date(initialValues.expiryDate).toISOString().split("T")[0]
          : "",
        quantity: initialValues.quantity || "",
        price: initialValues.price || "",
        notes: initialValues.notes || "",
      });
    }
  }, [initialValues]);

  /**
   * Validate form data
   * @returns {Object} Errors object
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!formData.brand.trim()) {
      newErrors.brand = "Brand is required";
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry Date is required";
    } else {
      const expiryDate = new Date(formData.expiryDate);
      const today = new Date();
      if (expiryDate < today) {
        newErrors.expiryDate = "Expiry Date must be in the future";
      }
    }

    if (!formData.quantity) {
      newErrors.quantity = "Quantity is required";
    } else if (isNaN(formData.quantity) || parseFloat(formData.quantity) <= 0) {
      newErrors.quantity = "Quantity must be a positive number";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.price)) {
      newErrors.price = "Price must have max 2 decimal places";
    }

    return newErrors;
  };

  /**
   * Handle form input changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert string values to appropriate types
      const submitData = {
        ...formData,
        quantity: parseInt(formData.quantity),
        price: parseFloat(formData.price),
      };

      await onSubmit(submitData);

      // Reset form after successful submission
      setFormData({
        fullName: "",
        brand: "",
        expiryDate: "",
        quantity: "",
        price: "",
        notes: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>{initialValues ? "✏️ Edit Medicine" : "➕ Add New Medicine"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="medicine-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g., Paracetamol"
              className={errors.fullName ? "input-error" : ""}
              disabled={isSubmitting || loading}
            />
            {errors.fullName && (
              <span className="error-message">{errors.fullName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="brand">Brand *</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="e.g., Calpol"
              className={errors.brand ? "input-error" : ""}
              disabled={isSubmitting || loading}
            />
            {errors.brand && (
              <span className="error-message">{errors.brand}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date *</label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className={errors.expiryDate ? "input-error" : ""}
              disabled={isSubmitting || loading}
            />
            {errors.expiryDate && (
              <span className="error-message">{errors.expiryDate}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity *</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="e.g., 100"
              min="1"
              className={errors.quantity ? "input-error" : ""}
              disabled={isSubmitting || loading}
            />
            {errors.quantity && (
              <span className="error-message">{errors.quantity}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price (USD) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., 5.99"
              step="0.01"
              min="0.01"
              className={errors.price ? "input-error" : ""}
              disabled={isSubmitting || loading}
            />
            {errors.price && (
              <span className="error-message">{errors.price}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <input
              type="text"
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional notes (optional)"
              disabled={isSubmitting || loading}
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn-submit"
            disabled={isSubmitting || loading}
          >
            {isSubmitting
              ? "Submitting..."
              : initialValues
                ? "Update Medicine"
                : "Add Medicine"}
          </button>
          {initialValues && (
            <button
              type="button"
              className="btn-cancel"
              onClick={onCancel}
              disabled={isSubmitting || loading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MedicineForm;

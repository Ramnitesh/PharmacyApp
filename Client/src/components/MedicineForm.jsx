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
  const validateForm = (data = formData) => {
    const values = data;
    const newErrors = {};

    if (!values.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!values.brand.trim()) {
      newErrors.brand = "Brand is required";
    }

    if (!values.expiryDate) {
      newErrors.expiryDate = "Expiry Date is required";
    } else {
      const expiryDate = new Date(values.expiryDate);
      const today = new Date();
      if (expiryDate < today) {
        newErrors.expiryDate = "Expiry Date must be in the future";
      }
    }

    if (!values.quantity) {
      newErrors.quantity = "Quantity is required";
    } else if (isNaN(values.quantity) || parseFloat(values.quantity) <= 0) {
      newErrors.quantity = "Quantity must be a positive number";
    }

    if (!values.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(values.price) || parseFloat(values.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    } else if (!/^\d+(\.\d{1,2})?$/.test(values.price)) {
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

  const trimFieldValue = (name, value) => {
    const trimFields = ["fullName", "brand", "notes"];
    return trimFields.includes(name) ? value.trim() : value;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const trimmedValue = trimFieldValue(name, value);
    if (trimmedValue !== value) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: trimmedValue,
      }));
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedData = {
      ...formData,
      fullName: formData.fullName.trim(),
      brand: formData.brand.trim(),
      notes: formData.notes.trim(),
    };

    setFormData(cleanedData);

    const newErrors = validateForm(cleanedData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert string values to appropriate types
      const submitData = {
        ...cleanedData,
        quantity: parseInt(cleanedData.quantity, 10),
        price: parseFloat(cleanedData.price),
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
        {onCancel && (
          <button
            type="button"
            className="form-close-btn"
            onClick={onCancel}
            disabled={isSubmitting || loading}
          >
            ✕
          </button>
        )}
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
              onBlur={handleBlur}
              placeholder="e.g., Paracetamol"
              maxLength="80"
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
              onBlur={handleBlur}
              placeholder="e.g., Calpol"
              maxLength="50"
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
              max="9999"
              step="1"
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
            <label htmlFor="price">Price (INR) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., 199.99"
              step="0.01"
              min="0.01"
              max="99999.99"
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
              onBlur={handleBlur}
              placeholder="Additional notes (optional)"
              maxLength="250"
              disabled={isSubmitting || loading}
            />
          </div>
        </div>

        <div className="form-actions">
          {onCancel && (
            <button
              type="button"
              className="btn-cancel"
              onClick={onCancel}
              disabled={isSubmitting || loading}
            >
              Cancel
            </button>
          )}
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
        </div>
      </form>
    </div>
  );
};

export default MedicineForm;

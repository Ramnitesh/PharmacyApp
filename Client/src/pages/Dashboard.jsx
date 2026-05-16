import React, { useState, useEffect, useCallback } from "react";
import MedicineTable from "../components/MedicineTable";
import MedicineForm from "../components/MedicineForm";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import {
  getMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
} from "../services/medicineService";
import "../styles/Dashboard.css";

/**
 * Dashboard page - Main view showing medicines and add/edit form
 */
const Dashboard = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [showForm, setShowForm] = useState(false);

  /**
   * Fetch medicines from API
   */
  const fetchMedicines = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMedicines();
      setMedicines(data);
      setFilteredMedicines(data);
    } catch (err) {
      console.error("Error fetching medicines:", err);
      setError(err.message);
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch medicines on component mount
  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  /**
   * Filter medicines based on search term
   */
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredMedicines(medicines);
    } else {
      const filtered = medicines.filter((medicine) =>
        medicine.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredMedicines(filtered);
    }
  }, [searchTerm, medicines]);

  /**
   * Show toast notification
   */
  const showToast = (message, type = "info") => {
    setToast({ message, type });
  };

  /**
   * Handle form submission for adding/editing medicine
   */
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingMedicine) {
        // Update existing medicine
        await updateMedicine(editingMedicine.id, formData);
        showToast("Medicine updated successfully!", "success");
      } else {
        // Add new medicine
        await addMedicine(formData);
        showToast("Medicine added successfully!", "success");
      }

      // Refresh medicine list
      await fetchMedicines();

      // Reset form state
      setEditingMedicine(null);
      setShowForm(false);
    } catch (err) {
      console.error("Error submitting form:", err);
      showToast(err.message || "An error occurred", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle edit button click
   */
  const handleEdit = (medicine) => {
    setEditingMedicine(medicine);
    setShowForm(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /**
   * Handle delete button click
   */
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      try {
        await deleteMedicine(id);
        showToast("Medicine deleted successfully!", "success");
        await fetchMedicines();
      } catch (err) {
        console.error("Error deleting medicine:", err);
        showToast(err.message || "An error occurred", "error");
      }
    }
  };

  /**
   * Handle cancel editing
   */
  const handleCancelEdit = () => {
    setEditingMedicine(null);
    setShowForm(false);
  };

  /**
   * Toggle form visibility
   */
  const toggleForm = () => {
    setShowForm(!showForm);
    setEditingMedicine(null);
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>💊 ABC Pharmacy Management System</h1>
          <p>Manage your medicines efficiently</p>
        </div>
      </header>

      <main className="dashboard-main">
        {/* Error Message */}
        {error && !toast && (
          <div className="error-banner">
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}

        {/* Form Section */}
        <section className="form-section">
          {showForm ? (
            <MedicineForm
              onSubmit={handleFormSubmit}
              initialValues={editingMedicine}
              loading={isSubmitting || loading}
              onCancel={handleCancelEdit}
            />
          ) : (
            <button className="btn-open-form" onClick={toggleForm}>
              + Add New Medicine
            </button>
          )}
        </section>

        {/* Search and Table Section */}
        <section className="medicines-section">
          <div className="section-header">
            <h2>📋 Medicines Inventory</h2>
            <div className="section-info">
              <span className="medicine-count">
                Total: {filteredMedicines.length} medicine
                {filteredMedicines.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

          {loading ? (
            <Loader />
          ) : (
            <MedicineTable
              medicines={filteredMedicines}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </section>

        {/* Legend */}
        <section className="legend-section">
          <h3>Color Indicators:</h3>
          <div className="legend-items">
            <div className="legend-item danger">
              <span className="legend-color"></span>
              <span>Expiry within 30 days</span>
            </div>
            <div className="legend-item warning">
              <span className="legend-color"></span>
              <span>Quantity less than 10</span>
            </div>
          </div>
        </section>
      </main>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;

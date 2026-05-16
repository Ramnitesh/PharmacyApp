import axios from "axios";

// API base URL - configure based on your environment
const API_BASE_URL = "https://localhost:7032/api";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // Allow self-signed certificates in development
  httpsAgent: {
    rejectUnauthorized: false,
  },
});

/**
 * Get all medicines from the API
 * @returns {Promise} Promise containing array of medicines
 */
export const getMedicines = async () => {
  try {
    const response = await apiClient.get("/medicine");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch medicines. Please check your API connection.",
    );
  }
};

/**
 * Add a new medicine to the system
 * @param {Object} medicineData - Medicine object with all required fields
 * @returns {Promise} Promise containing the created medicine
 */
export const addMedicine = async (medicineData) => {
  try {
    const response = await apiClient.post("/medicine", medicineData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to add medicine. Please try again.",
    );
  }
};

/**
 * Update an existing medicine
 * @param {number} id - Medicine ID
 * @param {Object} medicineData - Updated medicine data
 * @returns {Promise} Promise containing the updated medicine
 */
export const updateMedicine = async (id, medicineData) => {
  try {
    const response = await apiClient.put(`/medicine/${id}`, medicineData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to update medicine. Please try again.",
    );
  }
};

/**
 * Delete a medicine from the system
 * @param {number} id - Medicine ID
 * @returns {Promise} Promise containing success response
 */
export const deleteMedicine = async (id) => {
  try {
    const response = await apiClient.delete(`/medicine/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to delete medicine. Please try again.",
    );
  }
};

export default apiClient;

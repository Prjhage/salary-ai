// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // ✅ your FastAPI backend
});

export const predictSalary = async (formData) => {
  try {
    const response = await API.post("/predict/salary", formData);
    console.log("✅ Response from backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error predicting salary:", error);
    throw error;
  }
};

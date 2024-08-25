// auth.js
import axios from "axios";

// Define the base URL for the API
const API_URL = "http://localhost:8000/api/users";

// Function to handle login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error(
      "Login error:",
      error.response ? error.response.data : error.message
    );
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// Function to handle signup
export const signup = async (username, email, password, role) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Signup error:",
      error.response ? error.response.data : error.message
    );
    throw new Error(error.response ? error.response.data : error.message);
  }
};

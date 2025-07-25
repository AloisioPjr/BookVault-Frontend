// Import the axios HTTP client
import axios from "axios";

// Set the base URL from environment variable or default to localhost
const baseURL = "http://44.213.20.112/api/v1";

// Create an axios instance with default settings
const api = axios.create({
  baseURL,             // Root URL for all API requests
  withCredentials: true, // Enables sending cookies with requests (if needed)
});

// Intercept every request before it's sent
api.interceptors.request.use(config => {
  // Retrieve email and password from localStorage
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  // If credentials are found, add them as Basic Auth headers
  if (email && password) {
    config.headers.Authorization = "Basic " + btoa(`${email}:${password}`);
  } else {
    // If no credentials, remove Authorization header
    delete config.headers.Authorization;
  }

  return config; // Return the modified request config
});

// Export the configured axios instance for use throughout the app
export default api;

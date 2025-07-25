// Import necessary hooks and modules
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios"; // Custom Axios instance for API requests

const Register = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation

  // State variables for form fields and error handling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  // Handles registration form submission
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(""); // Reset error state

    // Basic validation: check if passwords match
    if (password !== confirm) {
      return setError("Passwords do not match");
    }

    try {
      // Send POST request to /register endpoint with user credentials
      const response = await axios.post("/register", {
        user: {
          email,
          password,
          password_confirmation: confirm,
        },
      });

      console.log("Registered successfully:", response.data);

      // Redirect to the books page after successful registration
      navigate("/books");
    } catch (err) {
      // Handle API errors and show error messages
      setError(err.response?.data?.errors?.join(", ") || "Registration failed");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {/* Registration Header */}
      <h2 className="text-xl font-semibold mb-4">Register</h2>

      {/* Display error message if any */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Registration Form */}
      <form onSubmit={handleRegister} className="space-y-4">
        {/* Email Input */}
        <input
          type="email"
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password Input */}
        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Confirm Password Input */}
        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        {/* Submit Button */}
        <button type="submit" className="bg-green-600 text-white p-2 rounded w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

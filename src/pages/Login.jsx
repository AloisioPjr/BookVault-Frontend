// Import React hooks and modules
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios"; // Custom Axios instance for backend communication

const Login = () => {
  const navigate = useNavigate(); // Navigation hook to redirect after login

  // State variables for login form fields and error handling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handles form submission and login request
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError(""); // Clear previous errors

    try {
      // Send login request to API
      const response = await axios.post("/login", {
        user: { email, password },
      });

      //  Store credentials locally for reuse (used for basic auth headers)
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      console.log("Login success:", response.data);

      // Navigate to the books page upon successful login
      navigate("/books");
    } catch (err) {
      // Show error message if login fails
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {/* Page header */}
      <h2 className="text-xl font-semibold mb-4">Login</h2>

      {/* Display any error messages */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Login form */}
      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email input */}
        <input
          type="email"
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password input */}
        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Submit button */}
        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

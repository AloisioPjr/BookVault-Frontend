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
    e.preventDefault();
    setError("");

    try {
      // Store credentials
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      // Test login by hitting protected route
      const response = await axios.get("/books");

      console.log("Login success:", response.data);
      navigate("/books");
    } catch (err) {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      setError("Login failed: Invalid email or password");
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

// Import navigation utilities and axios instance
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios"; // Custom Axios instance

const Navbar = () => {
  const navigate = useNavigate();

  // Retrieve stored credentials from localStorage (used for basic auth)
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  // Determine if user is logged in
  const isLoggedIn = email && password;

  // Hardcoded admin check (based on seeded admin email)
  const isAdmin = email === "admin@bookvault.dev";

  // Logout handler: clear credentials, redirect to login, reload
  const handleLogout = async () => {
    try {
      await axios.delete("/logout"); // Optional: tells backend to clear session
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      navigate("/login");
      window.location.reload(); // Refresh to update UI state
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-4 shadow">
      <div className="container-fluid">
        {/* Logo / Brand link */}
        <Link className="navbar-brand fw-bold" to="/books">🕮 BookVault</Link>

        <div className="collapse navbar-collapse">
          {/* Navigation Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/books">Books</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/loans">My Loans</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/reservations">My Reservations</Link>
                </li>
                {/* Only show Admin link if user is admin */}
                {isAdmin && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">Admin</Link>
                  </li>
                )}
              </>
            )}
          </ul>

          {/* Logout Button */}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="btn btn-outline-light btn-sm"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

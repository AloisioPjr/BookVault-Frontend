import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Navbar = () => {
  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");
  const isLoggedIn = email && password;

  const isAdmin = email === "admin@bookvault.dev";

  const handleLogout = async () => {
    try {
      await axios.delete("/logout");
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      navigate("/login");
      window.location.reload();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-4 shadow">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/books">🕮 BookVault</Link>

        <div className="collapse navbar-collapse">
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
                {isAdmin && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">Admin</Link>
                  </li>
                )}
              </>
            )}
          </ul>
          {isLoggedIn && (
            <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

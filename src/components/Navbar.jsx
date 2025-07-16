import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Navbar = () => {
  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");
  const isLoggedIn = email && password;

  const isAdmin = email === "admin@bookvault.dev"; // or dynamically check if needed

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
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <div className="space-x-4">
        {isLoggedIn && (
          <>
            <Link to="/books" className="hover:underline">Books</Link>
            <Link to="/loans" className="hover:underline">My Loans</Link>
            <Link to="/reservations" className="hover:underline">My Reservations</Link>
            {isAdmin && <Link to="/admin" className="hover:underline">Admin</Link>}
          </>
        )}
      </div>
      <div>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

// Import necessary hooks and modules
import { useEffect, useState } from "react";
import axios from "../api/axios"; // Custom Axios instance for API calls
import { useNavigate } from "react-router-dom"; // Hook for programmatic navigation

const MyReservations = () => {
  // State to store reservations and any potential error message
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch reservations from the API
  const fetchReservations = () => {
    axios.get("/reservations")
      .then(res => setReservations(res.data))
      .catch(err => {
        setError("Failed to load reservations");

        // Redirect to login if user is not authenticated
        if (err.response?.status === 401) navigate("/login");
      });
  };

  // Cancel a reservation by ID
  const cancelReservation = async (id) => {
    try {
      await axios.delete(`/reservations/${id}`);
      fetchReservations(); // Refresh reservation list after cancellation
    } catch (err) {
      alert(err.response?.data?.error || "Cancel failed");
    }
  };

  // Run once when the component mounts to fetch data
  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className="container mt-5 pt-4">
      <h2 className="mb-4 fw-bold text-center">My Reservations</h2>

      {/* Display error message if there's a problem fetching data */}
      {error && <p className="text-danger text-center">{error}</p>}

      {/* Conditional rendering: show message if no reservations */}
      {reservations.length === 0 ? (
        <p className="text-center">You have no reservations.</p>
      ) : (
        // Render reservations in a responsive grid layout
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {reservations.map(res => (
            <div key={res.id} className="col d-flex">
              <div className="card p-3 shadow-sm w-100" style={{ minWidth: "250px" }}>
                <h5 className="card-title">
                  {res.book?.title || `Book #${res.book_id}`}
                </h5>
                <p className="card-text">
                  Reserved At: {new Date(res.reserved_at).toLocaleDateString()}
                </p>
                {/* Cancel button for this reservation */}
                <button
                  onClick={() => cancelReservation(res.id)}
                  className="btn btn-outline-danger btn-sm mt-2 text-nowrap"
                >
                  Cancel Reservation
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReservations;

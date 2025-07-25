import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchReservations = () => {
    axios.get("/reservations")
      .then(res => setReservations(res.data))
      .catch(err => {
        setError("Failed to load reservations");
        if (err.response?.status === 401) navigate("/login");
      });
  };

  const cancelReservation = async (id) => {
    try {
      await axios.delete(`/reservations/${id}`);
      fetchReservations(); // Refresh list
    } catch (err) {
      alert(err.response?.data?.error || "Cancel failed");
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

return (
  <div className="d-flex justify-content-center mt-5 pt-4">
    <div className="container" style={{ maxWidth: "960px" }}>
      <h2 className="mb-4 fw-bold text-center">My Reservations</h2>
      {error && <p className="text-danger text-center">{error}</p>}

      {reservations.length === 0 ? (
        <p className="text-center">You have no reservations.</p>
      ) : (
        <div className="row g-3">
          {reservations.map(res => (
            <div key={res.id} className="col-md-4">
              <div className="card p-3 shadow-sm h-100">
                <h5 className="card-title">Book #{res.book_id}</h5>
                <p className="card-text">
                  Reserved At: {new Date(res.reserved_at).toLocaleDateString()}
                </p>
                <button
                  onClick={() => cancelReservation(res.id)}
                  className="btn btn-outline-danger btn-sm mt-2"
                >
                  Cancel Reservation
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

};

export default MyReservations;

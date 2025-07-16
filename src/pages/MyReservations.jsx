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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Reservations</h2>
      {error && <p className="text-red-500">{error}</p>}
      {reservations.length === 0 ? (
        <p>You have no reservations.</p>
      ) : (
        <ul className="space-y-4">
          {reservations.map(res => (
            <li key={res.id} className="border p-4 rounded shadow">
              <p><strong>Book ID:</strong> {res.book_id}</p>
              <p><strong>Reserved At:</strong> {new Date(res.reserved_at).toLocaleDateString()}</p>

              <button
                onClick={() => cancelReservation(res.id)}
                className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
              >
                Cancel Reservation
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyReservations;

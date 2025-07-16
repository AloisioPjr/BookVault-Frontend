import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const MyLoans = () => {
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchLoans = () => {
    axios.get("/loans")
      .then(res => setLoans(res.data))
      .catch(err => {
        setError("Failed to load loans");
        if (err.response?.status === 401) navigate("/login");
      });
  };

  const returnBook = async (loanId) => {
    try {
      await axios.patch(`/loans/${loanId}/return`);
      fetchLoans(); // Refresh after return
    } catch (err) {
      alert(err.response?.data?.error || "Return failed");
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Loans</h2>
      {error && <p className="text-red-500">{error}</p>}
      {loans.length === 0 ? (
        <p>You have no loans.</p>
      ) : (
        <ul className="space-y-4">
          {loans.map(loan => (
            <li key={loan.id} className="border p-4 rounded shadow">
              <p><strong>Book:</strong> {loan.book?.title || `ID: ${loan.book_id}`}</p>
              <p><strong>Borrowed At:</strong> {new Date(loan.borrowed_at).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {loan.returned_at ? "Returned" : "Active"}</p>

          {!loan.returned_at && (
            <button
              onClick={() => returnBook(loan.id)}
              className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
            >
              Return Book
            </button>
          )}
  </li>
))}

        </ul>
      )}
    </div>
  );
};

export default MyLoans;

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
    
    <div className="container mt-5 pt-4">
      <h2 className="mb-4 fw-bold">My Loans</h2>
      {error && <p className="text-danger">{error}</p>}

      {loans.length === 0 ? (
        <p>You have no loans.</p>
      ) : (
        <div className="row g-3">
          {loans.map(loan => (
            <div key={loan.id} className="col-md-4">
              <div className="card p-3 shadow-sm h-100">
                <h5 className="card-title">{loan.book?.title || `Book #${loan.book_id}`}</h5>
                <p className="card-text">Borrowed At: {new Date(loan.borrowed_at).toLocaleDateString()}</p>
                <p className="card-text">
                  Status: <strong>{loan.returned_at ? "Returned" : "Active"}</strong>
                </p>
                {!loan.returned_at && (
                  <button
                    onClick={() => returnBook(loan.id)}
                    className="btn btn-outline-danger btn-sm mt-2"
                  >
                    Return Book
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );


};

export default MyLoans;

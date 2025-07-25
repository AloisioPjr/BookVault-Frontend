// Import React hooks and required modules
import { useEffect, useState } from "react";
import axios from "../api/axios"; // Custom Axios instance
import { useNavigate } from "react-router-dom"; // For programmatic navigation

const MyLoans = () => {
  // State variables to store loans and error messages
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch current user's loans from the API
  const fetchLoans = () => {
    axios.get("/loans")
      .then(res => setLoans(res.data))
      .catch(err => {
        setError("Failed to load loans");

        // Redirect to login if the user is not authenticated
        if (err.response?.status === 401) navigate("/login");
      });
  };

  // Handle returning a book
  const returnBook = async (loanId) => {
    try {
      // Send PATCH request to return a specific loaned book
      await axios.patch(`/loans/${loanId}/return`);
      fetchLoans(); // Refresh the loan list after successful return
    } catch (err) {
      alert(err.response?.data?.error || "Return failed");
    }
  };

  // Run once on component mount to fetch data
  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div className="container mt-5 pt-4">
      <h2 className="mb-4 fw-bold">My Loans</h2>

      {/* Display error message if fetching fails */}
      {error && <p className="text-danger">{error}</p>}

      {/* Conditional rendering if there are no loans */}
      {loans.length === 0 ? (
        <p>You have no loans.</p>
      ) : (
        // Render loans in a Bootstrap grid layout
        <div className="row g-3">
          {loans.map(loan => (
            <div key={loan.id} className="col-md-4">
              <div className="card p-3 shadow-sm h-100">
                <h5 className="card-title">
                  {loan.book?.title || `Book #${loan.book_id}`}
                </h5>
                <p className="card-text">
                  Borrowed At: {new Date(loan.borrowed_at).toLocaleDateString()}
                </p>
                <p className="card-text">
                  Status: <strong>{loan.returned_at ? "Returned" : "Active"}</strong>
                </p>

                {/* Show return button only if the book hasn't been returned yet */}
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

// Import necessary hooks and modules
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios"; // Custom Axios instance

const BookDetail = () => {
  const { id } = useParams(); // Extract book ID from the URL
  const navigate = useNavigate();

  // Component state
  const [book, setBook] = useState(null);        // Stores the book data
  const [message, setMessage] = useState("");     // Stores success message
  const [error, setError] = useState("");         // Stores error message

  // Fetch book details on mount or when ID changes
  useEffect(() => {
    axios.get(`/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => {
        setError("Book not found");

        // Redirect to login if unauthorized
        if (err.response?.status === 401) navigate("/login");
      });
  }, [id]);

  // Handle borrowing the book
  const handleBorrow = async () => {
    try {
      await axios.post("/loans", { loan: { book_id: book.id } });
      setMessage("Book borrowed successfully.");
      setError("");

      // Update available copies locally to reflect change
      setBook({ ...book, copies_available: book.copies_available - 1 });
    } catch (err) {
      setError(err.response?.data?.error || "Borrowing failed");
    }
  };

  // Handle reserving the book
  const handleReserve = async () => {
    try {
      await axios.post("/reservations", { reservation: { book_id: book.id } });
      setMessage("Book reserved successfully.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Reservation failed");
    }
  };

  // Loading state if book hasn't been fetched yet
  if (!book) return <div className="p-4">Loading book...</div>;

  return (
    <div className="p-4 max-w-lg mx-auto">
      {/* Book details */}
      <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Available Copies:</strong> {book.copies_available}</p>

      {/* Success or error feedback */}
      {message && <p className="text-green-600 mt-3">{message}</p>}
      {error && <p className="text-red-500 mt-3">{error}</p>}

      {/* Conditional button rendering based on availability */}
      <div className="mt-4">
        {book.copies_available > 0 ? (
          <button
            onClick={handleBorrow}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Borrow
          </button>
        ) : (
          <button
            onClick={handleReserve}
            className="bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Reserve
          </button>
        )}
      </div>
    </div>
  );
};

export default BookDetail;

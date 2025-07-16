import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => {
        setError("Book not found");
        if (err.response?.status === 401) navigate("/login");
      });
  }, [id]);

  const handleBorrow = async () => {
    try {
      await axios.post("/loans", { loan: { book_id: book.id } });
      setMessage("Book borrowed successfully.");
      setError("");
      setBook({ ...book, copies_available: book.copies_available - 1 });
    } catch (err) {
      setError(err.response?.data?.error || "Borrowing failed");
    }
  };

  const handleReserve = async () => {
    try {
      await axios.post("/reservations", { reservation: { book_id: book.id } });
      setMessage("Book reserved successfully.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Reservation failed");
    }
  };

  if (!book) return <div className="p-4">Loading book...</div>;

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Available Copies:</strong> {book.copies_available}</p>

      {message && <p className="text-green-600 mt-3">{message}</p>}
      {error && <p className="text-red-500 mt-3">{error}</p>}

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

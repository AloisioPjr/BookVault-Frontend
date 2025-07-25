// Import React hooks and modules for routing and API access
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios"; // Custom Axios instance

const BookList = () => {
  const navigate = useNavigate();

  // State to hold the list of books and any error message
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  // Fetch all books on component mount
  useEffect(() => {
    axios.get("/books")
      .then(res => setBooks(res.data))
      .catch(err => {
        setError("Unable to fetch books");

        // Redirect to login if unauthorized
        if (err.response?.status === 401) {
          navigate("/login");
        }
      });
  }, []);

  return (
    <div className="p-4">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-4">Available Books</h2>

      {/* Show error if present */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Conditional rendering based on book list */}
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        // Display list of books in a responsive grid layout
        <div className="row g-3">
          {books.map(book => (
            <div key={book.id} className="col-md-4">
              <div className="card p-3 shadow-sm h-100">
                {/* Book details */}
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Author: {book.author}</p>
                <p className="card-text">Genre: {book.genre}</p>
                <p className="card-text">Available: {book.copies_available}</p>

                {/* Link to book detail page */}
                <Link to={`/books/${book.id}`} className="btn btn-link p-0">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;

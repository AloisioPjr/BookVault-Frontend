import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const BookList = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("/books")
      .then(res => setBooks(res.data))
      .catch(err => {
        setError("Unable to fetch books");
        if (err.response?.status === 401) {
          navigate("/login"); // redirect if not authenticated
        }
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Books</h2>
      {error && <p className="text-red-500">{error}</p>}

      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <div className="row g-3">
          {books.map(book => (
            <div key={book.id} className="col-md-4">
              <div className="card p-3 shadow-sm h-100">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Author: {book.author}</p>
                <p className="card-text">Genre: {book.genre}</p>
                <p className="card-text">Available: {book.copies_available}</p>
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

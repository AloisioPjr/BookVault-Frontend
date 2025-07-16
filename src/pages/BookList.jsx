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
        <div className="grid gap-4">
          {books.map(book => (
            <div key={book.id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
              <p>Available Copies: {book.copies_available}</p>
              <Link
                to={`/books/${book.id}`}
                className="text-blue-600 underline mt-2 inline-block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;

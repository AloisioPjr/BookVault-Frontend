// Import necessary hooks and modules
import { useEffect, useState } from "react";
import axios from "../api/axios"; // Custom Axios instance
import { useNavigate } from "react-router-dom"; // For redirecting unauthorized users

// Default form values for creating or editing a book
const emptyBook = {
  title: "",
  author: "",
  isbn: "",
  genre: "",
  copies_available: 1,
};

const AdminPanel = () => {
  const [books, setBooks] = useState([]);        // List of books in the system
  const [form, setForm] = useState(emptyBook);   // Form data for add/edit
  const [editingId, setEditingId] = useState(null); // ID of the book being edited
  const [error, setError] = useState("");         // Error messages for UI
  const navigate = useNavigate();

  // Fetch list of books from API
  const fetchBooks = () => {
    axios.get("/books")
      .then(res => setBooks(res.data))
      .catch(err => {
        setError("Access denied or failed to fetch books.");
        if (err.response?.status === 401) navigate("/login");
      });
  };

  // Load book list on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle input field changes in the form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form to create or update a book
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Update existing book
        await axios.put(`/books/${editingId}`, { book: form });
      } else {
        // Add new book
        await axios.post("/books", { book: form });
      }

      // Reset form state after submission
      setForm(emptyBook);
      setEditingId(null);
      fetchBooks();
    } catch (err) {
      setError(err.response?.data?.errors?.join(", ") || "Save failed.");
    }
  };

  // Populate form fields with selected book data for editing
  const handleEdit = (book) => {
    setForm(book);
    setEditingId(book.id);
  };

  // Delete book with confirmation
  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;

    try {
      await axios.delete(`/books/${id}`);
      fetchBooks();
    } catch {
      setError("Delete failed.");
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5 pt-4">
      <div className="container" style={{ maxWidth: "960px" }}>
        <h2 className="mb-4 fw-bold text-center">Admin Panel — Book Management</h2>

        {/* Book Form */}
        <form onSubmit={handleSubmit} className="mb-5 row g-3">
          {/* Title */}
          <div className="col-md-6">
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Author */}
          <div className="col-md-6">
            <input
              type="text"
              name="author"
              className="form-control"
              placeholder="Author"
              value={form.author}
              onChange={handleChange}
              required
            />
          </div>

          {/* ISBN */}
          <div className="col-md-6">
            <input
              type="text"
              name="isbn"
              className="form-control"
              placeholder="ISBN"
              value={form.isbn}
              onChange={handleChange}
              required
            />
          </div>

          {/* Genre */}
          <div className="col-md-4">
            <input
              type="text"
              name="genre"
              className="form-control"
              placeholder="Genre"
              value={form.genre}
              onChange={handleChange}
              required
            />
          </div>

          {/* Copies Available */}
          <div className="col-md-2">
            <input
              type="number"
              name="copies_available"
              className="form-control"
              placeholder="Copies"
              min="1"
              value={form.copies_available}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="col-12 text-end">
            <button type="submit" className="btn btn-success">
              {editingId ? "Update Book" : "Add Book"}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && <p className="text-danger mb-4 text-center">{error}</p>}

        {/* Book List */}
        <div className="row g-3">
          {books.map(book => (
            <div key={book.id} className="col-md-4">
              <div className="card p-3 shadow-sm h-100">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">
                  <strong>Author:</strong> {book.author}<br />
                  <strong>Genre:</strong> {book.genre}<br />
                  <strong>ISBN:</strong> {book.isbn}<br />
                  <strong>Copies:</strong> {book.copies_available}
                </p>
                <div className="d-flex justify-content-between">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(book)}
                    className="btn btn-primary btn-sm"
                  >
                    Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

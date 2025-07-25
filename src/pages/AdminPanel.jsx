import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const emptyBook = {
  title: "",
  author: "",
  isbn: "",
  genre: "",
  copies_available: 1,
};

const AdminPanel = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(emptyBook);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchBooks = () => {
    axios.get("/books")
      .then(res => setBooks(res.data))
      .catch(err => {
        setError("Access denied or failed to fetch books.");
        if (err.response?.status === 401) navigate("/login");
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/books/${editingId}`, { book: form });
      } else {
        await axios.post("/books", { book: form });
      }
      setForm(emptyBook);
      setEditingId(null);
      fetchBooks();
    } catch (err) {
      setError(err.response?.data?.errors?.join(", ") || "Save failed.");
    }
  };

  const handleEdit = (book) => {
    setForm(book);
    setEditingId(book.id);
  };

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
        <h2 className="mb-4 fw-bold text-center">Admin Panel – Book Management</h2>

        <form onSubmit={handleSubmit} className="mb-5 row g-3">
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
          <div className="col-12 text-end">
            <button type="submit" className="btn btn-success">
              {editingId ? "Update Book" : "Add Book"}
            </button>
          </div>
        </form>

        {error && <p className="text-danger mb-4 text-center">{error}</p>}

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
                  <button
                    onClick={() => handleEdit(book)}
                    className="btn btn-primary btn-sm"
                  >
                    Edit
                  </button>
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

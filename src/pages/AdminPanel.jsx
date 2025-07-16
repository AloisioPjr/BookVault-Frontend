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
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Panel – Book Management</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="text" name="author" placeholder="Author" value={form.author} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="text" name="isbn" placeholder="ISBN" value={form.isbn} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="text" name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="number" name="copies_available" min="1" placeholder="Copies" value={form.copies_available} onChange={handleChange} required className="w-full border p-2 rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          {editingId ? "Update Book" : "Add Book"}
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <ul className="space-y-4">
        {books.map(book => (
          <li key={book.id} className="border p-4 rounded shadow">
            <p><strong>{book.title}</strong> by {book.author}</p>
            <p>ISBN: {book.isbn} | Genre: {book.genre}</p>
            <p>Available: {book.copies_available}</p>
            <div className="mt-2 space-x-2">
              <button onClick={() => handleEdit(book)} className="bg-blue-500 text-white px-3 py-1 rounded">
                Edit
              </button>
              <button onClick={() => handleDelete(book.id)} className="bg-red-600 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;

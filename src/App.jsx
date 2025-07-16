import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from './components/Navbar';
import BookList from "./pages/BookList";
import BookDetail from "./pages/BookDetail";
import MyLoans from "./pages/MyLoans";
import MyReservations from "./pages/MyReservations";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/loans" element={<MyLoans />} />
        <Route path="/reservations" element={<MyReservations />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

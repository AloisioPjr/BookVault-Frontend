// Import global CSS styling
import './App.css';

// Import routing components from react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import page components
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from './components/Navbar';
import BookList from "./pages/BookList";
import BookDetail from "./pages/BookDetail";
import MyLoans from "./pages/MyLoans";
import MyReservations from "./pages/MyReservations";
import AdminPanel from "./pages/AdminPanel";

// Root component of the React app
function App() {
  return (
    // Wrap the app in BrowserRouter to enable client-side routing
    <BrowserRouter>
      {/* Always visible navigation bar */}
      <Navbar />
      
      {/* Define application routes */}
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Book browsing and detail */}
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetail />} />
        
        {/* User-specific book transactions */}
        <Route path="/loans" element={<MyLoans />} />
        <Route path="/reservations" element={<MyReservations />} />
        
        {/* Admin-only panel for book management */}
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

// Export App component as the default export
export default App;

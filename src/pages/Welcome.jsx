import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
         Welcome to BookVault
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 text-center max-w-md">
        Discover, borrow, and reserve your favorite books.
      </p>

      <div className="flex gap-6">
        <Link
          to="/login"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center text-center px-4">
      <FaLeaf className="text-green-600 text-6xl mb-4 animate-bounce" />
      <h1 className="text-6xl font-bold text-green-800">404</h1>
      <h2 className="text-2xl font-semibold text-green-700 mt-2">
        Page Not Found
      </h2>
      <p className="mt-4 text-green-600">
        Oops! The page you're looking for doesn't exist. It might have been
        moved or deleted.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;

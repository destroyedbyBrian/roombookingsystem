import { Link } from "react-router-dom";

export default function LogoutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-3xl font-semibold text-gray-700 mb-6">
        You have been logged out
      </h1>
      <Link
        to={"/"}
        className="text-white text-lg bg-blue-500 hover:bg-blue-700 px-6 py-3 rounded-xl transition-colors duration-200"
      >
        Login again
      </Link>
    </div>
  );
}

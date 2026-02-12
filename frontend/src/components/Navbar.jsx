import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  // Jangan render kalau belum login
  if (!role) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white -m-8 mb-8 px-6 py-4 flex justify-between items-center">
      {/* Left Side */}
      <div className="flex items-center gap-6">
        <span className="text-lg font-bold">Restaurant App</span>

        <Link to="/" className="hover:text-gray-300 transition">
          Dashboard
        </Link>

        {role === "pelayan" && (
          <Link to="/foods" className="hover:text-gray-300 transition">
            Food
          </Link>
        )}

        {role === "kasir" && (
          <Link to="/orders" className="hover:text-gray-300 transition">
            Orders
          </Link>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <span className="text-sm capitalize bg-gray-700 px-3 py-1 rounded">
          {role}
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

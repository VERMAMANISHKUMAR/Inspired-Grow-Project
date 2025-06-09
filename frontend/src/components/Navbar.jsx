import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBars } from "react-icons/fa";

const Navbar = ({ isSidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showDropdown && !user) {
      fetchUserProfile();
    }
  }, [showDropdown, user]); // Added 'user' to dependency array

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role") || "guest"; // Default role if missing

      if (!token) {
        console.warn("No token found in localStorage");
        setUser({ name: "Guest", role: "Guest" });
        return;
      }

      let url =
        role === "admin"
          ? "https://inspired-grow-project.onrender.com/auth/profile"
          : role === "user"
          ? "https://inspired-grow-project.onrender.com/admiaddinguser/profile"
          : null;

      if (!url) {
        console.error("Unknown user role");
        setUser({ name: "Unknown User", role: "Unknown" });
        return;
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setUser({ name: "Guest", role: "Guest" }); // Default fallback
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all tokens and user info
    navigate("/"); // Navigate to login page
    window.location.reload(); // Force a full reload so that App.js re-checks localStorage
  };

  return (
    <nav className="bg-red-500 text-white px-6 py-4 flex justify-between items-center w-full fixed top-0 left-0 z-50">
      {/* Left side: Sidebar Toggle & Title */}
      <div className="flex items-center">
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="mr-4">
          <FaBars size={24} className="cursor-pointer hover:text-gray-400" />
        </button>
        <h2 className="text-2-lg font-semibold">Inspired Grow</h2>
      </div>

      {/* Right side: Profile Dropdown */}
      <div className="relative flex items-center">
        <div
          className="flex items-center cursor-pointer space-x-2"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img
            src="/userlogoprof.png"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-gray-300 hover:opacity-80"
          />
          <span className="text-sm">Profile</span>
        </div>

        {showDropdown && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-white text-black shadow-lg rounded-md p-4">
            {loading ? (
              <p className="text-center text-gray-600">Loading...</p>
            ) : (
              <>
                <div className="flex flex-col items-center">
                  <img
                    src="/userlogoprof.png"
                    alt="Profile"
                    className="w-16 h-16 rounded-full border-2 border-gray-400"
                  />
                  <h3 className="font-bold text-lg mt-2">
                    {user?.name || "Unknown User"}
                  </h3>
                  <p className="text-sm font-semibold text-blue-600">
                    Role: {user?.role || "Unknown"}
                  </p>
                </div>
                <div className="mt-4 flex flex-col">
                  <button className="py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300">
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="py-2 px-4 bg-red-500 text-white rounded-md mt-2 hover:bg-red-600"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
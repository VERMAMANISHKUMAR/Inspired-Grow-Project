import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  // Use lowercase keys to match the backend's expected payload
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://192.168.1.13:5000/admiaddinguser/userlogin",
        user,
        { withCredentials: true }
      );

      // The backend response is structured as:
      // { message, token, user: { id, FirstName, LastName, Email, Role } }
      localStorage.setItem("token", res.data.token);
      // Store role from the user object
      localStorage.setItem("role", res.data.user.Role);
      // If permissions are returned, store them; otherwise, remove or adjust as needed
      if (res.data.permissions) {
        localStorage.setItem("permissions", JSON.stringify(res.data.permissions));
      }

      alert("User logged in successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          User Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;

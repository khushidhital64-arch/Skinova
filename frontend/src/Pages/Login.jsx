import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3001/api/users/loginuser", // make sure backend port is correct
        formData
      );

      // Save JWT token in localStorage
      localStorage.setItem("token", res.data.token);

      alert(res.data.message);

      // Redirect to dashboard or home
      navigate("/"); // change this to wherever you want
    } catch (error) {
      console.error(error.response?.data);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Login
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-gray-600 text-sm mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-600 text-sm mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-pink-400 hover:bg-pink-500 text-white py-2 rounded-lg mt-4 text-sm font-medium"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Don't have an account?{" "}
            <a href="/register" className="text-pink-500 font-medium ml-1">
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
    const navigate = useNavigate();
  const skinTypes = ["Oily", "Dry", "Combination", "Sensitive"];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    skinType: "",
    skinConcern: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3001/api/users/register",
        formData
      );
      console.log(res.data); // {message, user}
      alert(res.data.message);
       navigate("/login");
    } catch (error) {
      console.error(error.response.data);
      alert(error.response.data.message || "Registration failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Register
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-gray-600 text-sm mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 text-black py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 text-sm mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 text-black py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
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
                className="w-full px-4 text-black py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-gray-600 text-sm mb-1" htmlFor="age">
                Age
              </label>
              <input
                type="number"
                id="age"
                placeholder="Your Age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 text-black py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            {/* Skin Type */}
            <div>
              <label className="block text-gray-600 text-sm mb-1" htmlFor="skinType">
                Skin Type
              </label>
              <select
                id="skinType"
                value={formData.skinType}
                onChange={handleChange}
                className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              >
                <option value="">Select your skin type</option>
                {skinTypes.map((type, idx) => (
                  <option key={idx} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Skin Concern */}
            <div>
              <label className="block text-gray-600 text-sm mb-1" htmlFor="skinConcern">
                Skin Concern
              </label>
              <select
                id="skinConcern"
                value={formData.skinConcern}
                onChange={handleChange}
                className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              >
                <option value="">Select your skin concern</option>
                <option value="Acne">Acne</option>
                <option value="Dark Spots">Dark Spots</option>
                <option value="Aging / Wrinkles">Aging / Wrinkles</option>
                <option value="Dryness">Dryness</option>
                <option value="Oiliness">Oiliness</option>
                <option value="Redness / Sensitivity">Redness / Sensitivity</option>
                <option value="Uneven Texture">Uneven Texture</option>
                <option value="Large Pores">Large Pores</option>
              </select>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-pink-400 hover:bg-pink-500 text-white py-2 rounded-lg mt-4 text-sm font-medium"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Already have an account? 
            <a href="/login" className="text-pink-500 font-medium ml-1">Login</a>
          </p>
        </div>
      </div>
    </>
  );
}

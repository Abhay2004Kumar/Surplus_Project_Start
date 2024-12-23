import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import axios from "axios";
import toast from "react-hot-toast"

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/loginUser",
        { email, password },
        { withCredentials: true }
      );
  
      const { accessToken } = response.data.data; // Ensure you're accessing the correct structure
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken); // Save token in localStorage
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Login failed: No token received.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {/* Container */}
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          {/* Header */}
          <h2 className="text-center text-2xl font-bold mb-6">
            <span className="underline decoration-blue-500">
              HI WELCOME TO OUR
            </span>
            <br />
            <span className="underline decoration-blue-500">WEBSITE 👋</span>
          </h2>

          {/* Error Message */}
          {error && (
            <div className="text-center text-red-500 text-sm mb-4">{error}</div>
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="email"
              >
                EMAIL
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="password"
              >
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Forgot Password */}
            <div className="text-center text-sm text-gray-500">
              <a href="#" className="hover:text-blue-500">
                FORGOT PASSWORD?
              </a>{" "}
              |{" "}
              <span
                onClick={() => navigate("/signup")} // Navigate to Sign Up Page
                className="hover:text-blue-500 cursor-pointer"
              >
                SIGNUP
              </span>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-red-500 text-white font-bold py-2 rounded-md hover:bg-red-600 transition"
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;

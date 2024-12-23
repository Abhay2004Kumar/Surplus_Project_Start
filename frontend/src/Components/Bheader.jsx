import React from "react";
import { useNavigate } from "react-router-dom";

const Bheader = () => {
  const navigate = useNavigate();

  // Check if the user is logged in by verifying the presence of accessToken in localStorage
  const isLoggedIn = !!localStorage.getItem("accessToken");

  return (
    <header
      className="bg-cover bg-center text-white h-[600px] flex flex-col justify-center items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">
          Transform Lives with Technology in Rural Areas
        </h1>
        <div className="flex gap-4 justify-center">
          {/* Conditionally render the Donate Now button */}
          {isLoggedIn && (
            <button
              onClick={() => navigate("/donate")}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md"
            >
              Donate Now
            </button>
          )}

          {/* Login Button (conditionally rendered) */}
          {!isLoggedIn && (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Bheader;

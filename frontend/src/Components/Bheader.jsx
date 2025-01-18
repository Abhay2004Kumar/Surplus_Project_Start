import React from "react";
import { useNavigate } from "react-router-dom";

const Bheader = () => {
  const navigate = useNavigate();

  // Check if the user is logged in by verifying the presence of accessToken in localStorage
  const isLoggedIn = !!localStorage.getItem("accessToken");

  return (
    <header
      className="bg-cover bg-center text-white h-[50vh] md:h-[70vh] flex flex-col justify-center items-center relative top-[70px] md:top-[90px] px-4 md:px-8"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="text-center max-w-3xl">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 drop-shadow-lg text-opacity-100 leading-tight">
          Empowering kindness—connect to donate or find food in your neighborhood
        </h1>
        <div className="flex flex-wrap gap-4 justify-center">
          {/* Conditionally render the Donate Now button */}
          {isLoggedIn && (
            <div className="flex flex-wrap space-x-4">
              <button
                onClick={() => navigate("/user-donations")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-md text-sm md:text-base"
              >
                Donate Now
              </button>
              <button
                onClick={() => navigate("/need")}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-md text-sm md:text-base"
              >
                Need Food
              </button>
            </div>
          )}

          {/* Login Button (conditionally rendered) */}
          {!isLoggedIn && (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-md text-sm md:text-base"
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

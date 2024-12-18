import React from "react";
import { useNavigate } from "react-router-dom";

const Bheader = () => {
  const navigate = useNavigate()
  return (
    <header
      className="bg-cover bg-center text-white h-[600px] flex flex-col justify-center items-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
    >
    
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">
          Transform Lives with Technology in Rural Areas
        </h1>
        <button
          onClick={() => navigate("/login")} // Navigate to Login Page
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md"
        >
          Donate Now
        </button>
      </div>
    </header>
  );
};

export default Bheader;


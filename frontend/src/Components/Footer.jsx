import React from "react";
import { useNavigate } from "react-router-dom";


const Footer = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/dev")
  }
  return (
    <footer className="bg-gray-800 text-gray-400 py-6 text-center">
      <p>© 2025 Food Donation. All rights reserved.</p>
      <div className="mt-4">
        <a onClick={handleClick} className="hover:text-white mx-2 cursor-pointer">Developer Details</a>

        {/* <a href="#" className="hover:text-white mx-2">Terms of Service</a> */}
      </div>
    </footer>
  );
};

export default Footer;

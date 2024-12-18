import React from "react";
import { useNavigate } from "react-router-dom";
import Bheader from "./Bheader";

const Header = () => {
  const navigate = useNavigate()
  return (
  <>
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-6 bg-black bg-opacity-50">
        <div className="text-2xl font-bold">YourLogo</div>
        <ul className="flex space-x-6 text-white">
          <li className="hover:text-yellow-400 cursor-pointer">About</li>
          <li className="hover:text-yellow-400 cursor-pointer">Testimonials</li>
          <li className="hover:text-yellow-400 cursor-pointer">Contact</li>
        </ul>
      </nav>
      <div className="text-center">
       
        
      </div>
    </>
  );
};

export default Header;


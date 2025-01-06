import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  // const handleLoginClick = () => {
  //   navigate("/login");
  // };

  const handleLogout = () => {
    // Clear the access token from local storage
    localStorage.removeItem("accessToken"); // Remove accessToken from local storage
    setIsLoggedIn(false); // Update login state

    // Trigger a toast notification for logout process
    toast.promise(
      Promise.resolve(),
      {
        loading: "Logging Out...",
        success: <b>See you soon!</b>,
        error: <b>Logout failed. Please try again.</b>,
      }
    );

    // Redirect to the home page after logout
    navigate("/");
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  const handleProfile = () => {
    navigate("/profile")
  };

  const handleAboutClick = () => {
    navigate("/aboutus")
  }
  const handlehomeClick = () => {
    navigate("/")
  }
  // Check if the user is logged in by checking localStorage on initial render
  useEffect(() => {
    const acToken = localStorage.getItem("accessToken");
    if (acToken) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []); // Empty dependency array means this runs only once on component mount

  return (
    <header className="absolute top-0 left-0 w-full flex justify-between items-center p-6 bg-black bg-opacity-50">
      <div className="text-2xl font-bold text-white">Surplus Food.</div>
      <ul className="flex space-x-6 text-white">
      <li 
        onClick={handlehomeClick}
        className="hover:text-yellow-400 cursor-pointer">Home</li>
        <li 
        onClick={handleAboutClick}
        className="hover:text-yellow-400 cursor-pointer">About</li>
       
        <li 
        onClick={handleContactClick}
        className="hover:text-yellow-400 cursor-pointer">Contact</li>
        {isLoggedIn && (
          // Show Logout button only if the user is logged in
          <button
            onClick={handleProfile}
            className="hover:text-yellow-400 cursor-pointer"
          >
            Profile
          </button>
        )}

        {isLoggedIn && (
          // Show Logout button only if the user is logged in
          <button
            onClick={handleLogout}
            className="text-yellow-400 hover:text-white cursor-pointer"
          >
            Logout
          </button>
        )}
      </ul>
    </header>
  );
}

export default Header;

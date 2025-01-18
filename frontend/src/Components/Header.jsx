import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the menu

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);

    toast.promise(Promise.resolve(), {
      loading: "Logging Out...",
      success: <b>See you soon!</b>,
      error: <b>Logout failed. Please try again.</b>,
    });

    navigate("/");
  };

  const handleContactClick = () => navigate("/contact");
  const handleProfile = () => navigate("/profile");
  const handlehomeClick = () => navigate("/");

  const handleAboutClick = () => {
    if (location.pathname === "/") {
      const aboutSection = document.getElementById("about-us");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/#about-us");
    }
  };

  useEffect(() => {
    const acToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!acToken);
  }, []);

  return (
    <header className="absolute top-0 left-0 w-full bg-gray-800 shadow-md">
      <div className="flex justify-between items-center p-4 md:p-6">
        <div
          className="text-2xl font-bold text-white cursor-pointer"
          onClick={handlehomeClick}
        >
          Surplus Food.
        </div>

        {/* Hamburger Icon */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5"
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-white">
          <li
            onClick={handlehomeClick}
            className="hover:text-yellow-400 cursor-pointer"
          >
            Home
          </li>
          <li
            onClick={handleAboutClick}
            className="hover:text-yellow-400 cursor-pointer"
          >
            About
          </li>
          <li
            onClick={handleContactClick}
            className="hover:text-yellow-400 cursor-pointer"
          >
            Contact
          </li>
          {isLoggedIn && (
            <button
              onClick={handleProfile}
              className="hover:text-yellow-400 cursor-pointer"
            >
              Profile
            </button>
          )}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="text-yellow-400 hover:text-white cursor-pointer"
            >
              Logout
            </button>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="flex flex-col bg-gray-800 text-white md:hidden">
          <li
            onClick={handlehomeClick}
            className="p-3 hover:bg-gray-700 cursor-pointer"
          >
            Home
          </li>
          <li
            onClick={handleAboutClick}
            className="p-3 hover:bg-gray-700 cursor-pointer"
          >
            About
          </li>
          <li
            onClick={handleContactClick}
            className="p-3 hover:bg-gray-700 cursor-pointer"
          >
            Contact
          </li>
          {isLoggedIn && (
            <li
              onClick={handleProfile}
              className="p-3 hover:bg-gray-700 cursor-pointer"
            >
              Profile
            </li>
          )}
          {isLoggedIn && (
            <li
              onClick={handleLogout}
              className="p-3 hover:bg-gray-700 cursor-pointer"
            >
              Logout
            </li>
          )}
        </ul>
      )}
    </header>
  );
}

export default Header;

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./Components/Layout";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import Donation from "./pages/Donation";
import { Toaster } from "react-hot-toast";
import Food from "./pages/Food";
import Contact from "./pages/Contact";
import DeveloperPage from "./pages/DeveloperPage";
import UserDonations from "./pages/UserDonations";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import { useEffect } from "react";

function App() {
  const location = useLocation();

  // Smooth scroll to the element when URL hash changes
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace("#", "");
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      {/* Toaster for notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Routes for the application */}
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />

        {/* Login Page */}
        <Route
          path="/login"
          element={
            <Layout>
              <LoginPage />
            </Layout>
          }
        />

        {/* Sign Up Page */}
        <Route
          path="/signup"
          element={
            <Layout>
              <SignUpPage />
            </Layout>
          }
        />

        {/* Donation Page */}
        <Route
          path="/donation"
          element={
            <Layout>
              <Donation />
            </Layout>
          }
        />

        {/* Need Food Page */}
        <Route
          path="/need"
          element={
            <Layout>
              <Food />
            </Layout>
          }
        />

        {/* Contact Page */}
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />

        {/* Developer Page */}
        <Route
          path="/dev"
          element={
            <Layout>
              <DeveloperPage />
            </Layout>
          }
        />

        {/* Profile Page */}
        <Route
          path="/profile"
          element={
            <Layout>
              <ProfilePage />
            </Layout>
          }
        />

        {/* User Donations Page */}
        <Route
          path="/user-donations"
          element={
            <Layout>
              <UserDonations />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;

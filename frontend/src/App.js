import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import Donation from "./pages/Donation"
import { Toaster } from "react-hot-toast";
import Food from "./pages/Food"
import Contact from "./pages/Contact";
import DeveloperPage from "./pages/DeveloperPage";

function App() {
  return (
    <Router>
         <Toaster position="top-center" reverseOrder={false} />
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

          <Route
          path="/donate"
          element={
            <Layout>
              <Donation/>
            </Layout>
          }
        />
           <Route
          path="/need"
          element={
            <Layout>
              <Food/>
            </Layout>
          }
        />
         <Route
          path="/contact"
          element={
            <Layout>
              <Contact/>
            </Layout>
          }
        />

          <Route
          path="/about"
          element={
            <Layout>
              <DeveloperPage/>
            </Layout>
          }
        />
        
      </Routes>
    </Router>
  );
}



export default App;

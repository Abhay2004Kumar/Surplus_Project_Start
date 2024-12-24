import React, { useState, useEffect } from "react";
import axios from "axios";
import foodpic from "../assets/foody.jpg";

const Donation = () => {
  const [location, setLocation] = useState("Fetching location...");

  // Fetch location using IP-based geolocation service
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/location");
        console.log("Location Data:", response.data); // Log location data
        // Set the location data to state
        setLocation(response.data.city +` ${response.data.postal}`  || "Location not available");
      } catch (error) {
        console.error("Error fetching location:", error);
        setLocation("Unable to fetch location");
      }
    };

    fetchLocation();
  }, []); // Empty dependency array ensures this runs only once on component mount

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full">
        <div className="mb-6">
          <img 
            src={foodpic}
            alt="Donations"
            className="w-full rounded h-[250px]"
          />
        </div>
        <h1 className="text-2xl font-bold text-center mb-4">Donations</h1>
        <form className="space-y-4">
          {/* Food Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Food</label>
            <input
              type="text"
              placeholder="Enter food name"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Quantity Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              placeholder="Enter quantity"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Image of Food Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image of Food</label>
            <input
              type="file"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Expiry Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Location Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={location}
              readOnly
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Contact Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
            <input
              type="tel"
              placeholder="Enter contact number"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Donation;

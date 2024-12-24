import React, { useState, useEffect } from "react";
import axios from "axios";

const Food = () => {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch JWT token from localStorage or cookies (if it's saved there)
  const token = localStorage.getItem("accessToken") || document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1");

  // Function to format date to dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Fetch donations from the backend API
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/users/get-all-donations", {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token in the Authorization header
          },
        });
        setFood(response.data.data); // Assuming the donations are in 'data' field
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDonations();
    } else {
      console.error("No token found, user is not authenticated.");
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Available Food</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {food.map((donation) => (
          <div
            key={donation._id}
            className={`bg-white p-4 rounded shadow-lg ${
              donation.quantity === 0 ? "opacity-50" : ""
            }`}
          >
            <img
              src={donation.foodImage}
              alt={donation.food}
              className="w-full h-[200px] object-cover rounded mb-4"
            />
            <h2 className="text-xl font-bold">{donation.food}</h2>
            <p className="text-gray-700">Quantity: {donation.quantity}</p>
            <p className="text-gray-700">Expiry: {formatDate(donation.expiryDate)}</p> {/* Formatted expiry date */}
            <p className="text-gray-700">Location: {donation.location}</p>
            <p className="text-gray-700">Postal Code: {donation.postal}</p> {/* Added postal code */}
            <p className="text-gray-700">Contact: {donation.contact}</p>
            {donation.quantity > 0 ? (
              <div className="mt-4 space-x-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Request Full
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Request Partial
                </button>
              </div>
            ) : (
              <p className="text-red-500 mt-4">Not Available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Food;

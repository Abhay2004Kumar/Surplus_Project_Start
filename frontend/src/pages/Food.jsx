import React, { useState, useEffect } from "react";
import axios from "axios";

const Food = () => {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postal, setPostalCode] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const token = localStorage.getItem("accessToken") || document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/users/get-all-donations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFood(response.data.data);
        setSearchResult(response.data.data);
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

  const handleSearch = async () => {
    if (!postal) {
      setSearchResult(food);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/get-donation-by-postal",
        { postal },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchResult(response.data.data);
    } catch (error) {
      console.error("Error searching donations by postal code:", error);
      setSearchResult([]);
    }
  };

  const handleRequestFull = async (donationId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/users/request-full/${donationId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedDonation = response.data.data;
  
      setSearchResult((prevResults) =>
        prevResults.map((donation) =>
          donation._id === updatedDonation._id ? updatedDonation : donation
        )
      );
    } catch (error) {
      console.error("Error requesting full donation:", error);
    }
  };
  
  const handleRequestPartial = async (donation) => {
    const requestedQuantity = parseInt(prompt("Enter the quantity you need:"), 10);
    if (!requestedQuantity || requestedQuantity <= 0 || requestedQuantity > donation.quantity) {
      alert("Invalid quantity entered.");
      return;
    }
  
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/users/request-partial/${donation._id}`,
        { quantity: requestedQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedDonation = response.data.data;
  
      setSearchResult((prevResults) =>
        prevResults.map((item) =>
          item._id === updatedDonation._id ? updatedDonation : item
        )
      );
    } catch (error) {
      console.error("Error requesting partial donation:", error);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Available Food</h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Enter postal code"
          value={postal}
          onChange={(e) => setPostalCode(e.target.value)}
          className="px-4 py-2 border rounded-l-md"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResult.map((donation) => (
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
            <p className="text-gray-700">Expiry: {formatDate(donation.expiryDate)}</p>
            <p className="text-gray-700">Location: {donation.location}</p>
            <p className="text-gray-700">Postal Code: {donation.postal}</p>
            <p className="text-gray-700">Contact: {donation.contact}</p>
            {donation.quantity > 0 ? (
              <div className="mt-4 space-x-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handleRequestFull(donation._id)}
                >
                  Request Full
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => handleRequestPartial(donation)}
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


import React, { useState, useEffect } from "react";
import axios from "axios";

const Food = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchPostal, setSearchPostal] = useState(""); // State for postal code search
  const [loading, setLoading] = useState(true);

  const token =
    localStorage.getItem("accessToken") ||
    document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1");

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
        const response = await axios.get(
          "http://localhost:5000/api/v1/users/get-all-donations",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDonations(response.data.data);
        setFilteredDonations(response.data.data); // Initially, show all donations
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

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchPostal(query);

    // Filter donations based on postal code
    if (query) {
      const filtered = donations.filter((donation) =>
        donation.postal.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDonations(filtered);
    } else {
      setFilteredDonations(donations); // Show all donations if search is empty
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
        "http://localhost:5000/api/v1/users/requests",
        { donationId: donation._id, type: "partial", quantity: requestedQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Create notification for the donor
      await axios.post(
        "http://localhost:5000/api/v1/users/notification",
        {
          userId: donation.user,  // Use `donation.user` for donor ID
          message: `You have received a request for ${donation.food} with quantity: ${requestedQuantity}`,
          requestId: response.data.data._id, // Assuming request response contains ID
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Request sent successfully!");
    } catch (error) {
      console.error("Error creating partial request:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Available Donations</h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchPostal}
          onChange={handleSearch}
          placeholder="Search by Postal Code"
          className="w-60 p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500" // Smaller width (w-60) and clean styling
        />
      </div>

      {/* Donations List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDonations.length > 0 ? (
          filteredDonations.map((donation) => (
            <div key={donation._id} className="bg-white p-6 rounded shadow-lg">
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
                    onClick={() => handleRequestPartial(donation)}
                  >
                    Request Food Quantity
                  </button>
                </div>
              ) : (
                <p className="text-red-500 mt-4">Not Available</p>
              )}
            </div>
          ))
        ) : (
          <p>No donations found for the given postal code.</p>
        )}
      </div>
    </div>
  );
};

export default Food;

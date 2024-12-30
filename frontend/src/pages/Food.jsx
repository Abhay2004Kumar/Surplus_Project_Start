import React, { useState, useEffect } from "react";
import axios from "axios";

const Food = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const token =
    localStorage.getItem("accessToken") ||
    document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1");

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/users/get-all-donations", 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDonations(response.data.data);
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

  // const handleRequestFull = async (donationId, donorId, foodName) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/v1/users/requests", 
  //       { donationId, type: "full" },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     // Create notification for the donor
  //     await axios.post(
  //       "http://localhost:5000/api/v1/users/notification", 
  //       {
  //         userId: donorId,  // Donor ID
  //         message: `You have received a full request for ${foodName}`,
  //         requestId: response.data.data._id,  // Assuming request contains ID
  //       },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     alert("Full request sent successfully!");
  //   } catch (error) {
  //     console.error("Error creating full request:", error);
  //   }
  // };

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.map((donation) => (
          <div key={donation._id} className="bg-white p-4 rounded shadow-lg">
            <img
              src={donation.foodImage}
              alt={donation.food}
              className="w-full h-[200px] object-cover rounded mb-4"
            />
            <h2 className="text-xl font-bold">{donation.food}</h2>
            <p className="text-gray-700">Quantity: {donation.quantity}</p>

            <div className="mt-4 flex justify-between">
              {/* <button
                className="bg-green-500 text-white p-2 rounded"
                onClick={() => handleRequestFull(donation._id, donation.user, donation.food)}  // `donation.user` is the donor's ID
              >
                Request Full
              </button> */}
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={() => handleRequestPartial(donation)}
              >
                Request Food Quantity
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Food;

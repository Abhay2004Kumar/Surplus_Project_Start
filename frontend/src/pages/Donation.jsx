import React, { useState, useEffect } from "react";
import axios from "axios";
import foodpic from "../assets/foody.jpg";
import { toast } from "react-hot-toast";

const Donation = () => {
  const [location, setLocation] = useState("Fetching location...");
  const [postal, setPostal] = useState("Fetching Postal Code...");
  const [food, setFood] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [contact, setContact] = useState("");
  const [foodImage, setFoodImage] = useState(null);

  // Fetch location using IP-based geolocation service
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/location");
        setLocation(response.data.city || "Location not available");
        setPostal(response.data.postal || "Postal code not available");
      } catch (error) {
        console.error("Error fetching location:", error);
        setLocation("Unable to fetch location");
        setPostal("Unable to fetch postal code");
      }
    };
    fetchLocation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the expiry date is in the correct format (YYYY-MM-DD)
    const formattedExpiryDate = new Date(expiryDate).toISOString().split('T')[0];

    const formData = new FormData();
    formData.append("food", food);
    formData.append("quantity", quantity);
    formData.append("expiryDate", formattedExpiryDate);  // Use the formatted date
    formData.append("location", location);
    formData.append("postal", postal);
    formData.append("contact", contact);
    formData.append("foodImage", foodImage);

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post("http://localhost:5000/api/v1/users/donate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}` 
        },
      });

      if (response.status === 201) {
        toast.success("Donation created successfully!");
        // Reset the form
        setFood("");
        setQuantity("");
        setExpiryDate("");
        setContact("");
        setFoodImage(null);
      }
    } catch (error) {
      toast.error("Error creating donation.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full">
        <div className="mb-6">
          <img src={foodpic} alt="Donations" className="w-full rounded h-[250px]" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-4">Donations</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Food Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Food</label>
            <input
              type="text"
              value={food}
              onChange={(e) => setFood(e.target.value)}
              placeholder="Enter food name"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Quantity Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Image of Food Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image of Food</label>
            <input
              type="file"
              onChange={(e) => setFoodImage(e.target.files[0])}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Expiry Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
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

          {/* Postal Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
            <input
              type="text"
              value={postal}
              readOnly
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Contact Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
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

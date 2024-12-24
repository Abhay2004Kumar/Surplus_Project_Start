import React, { useState } from "react";

const Food = () => {
  const [food, setFood] = useState([
    {
      id: 1,
      food: "Pizza",
      quantity: 2,
      image: "https://via.placeholder.com/250?text=Pizza",
      expiry: "2024-12-25",
      location: "New York",
      contact: "1234567890",
    },
    {
      id: 2,
      food: "Sandwich",
      quantity: 5,
      image: "https://via.placeholder.com/250?text=Sandwich",
      expiry: "2024-12-26",
      location: "New York",
      contact: "9876543210",
    },
    {
      id: 3,
      food: "Burger",
      quantity: 3,
      image: "https://via.placeholder.com/250?text=Burger",
      expiry: "2024-12-27",
      location: "Los Angeles",
      contact: "5555555555",
    },
  ]);

  const handleFullRequest = (id) => {
    alert(`You have requested the full quantity of food ID: ${id}`);
    setFood((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: 0 } : item
      )
    );
  };

  const handlePartialRequest = (id) => {
    const requestedQuantity = prompt(
      "Enter the quantity you want (less than available):"
    );
    const quantity = parseInt(requestedQuantity, 10);

    setFood((prev) =>
      prev.map((item) =>
        item.id === id && quantity > 0 && quantity < item.quantity
          ? { ...item, quantity: item.quantity - quantity }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Available Food</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {food.map((donation) => (
          <div
            key={donation.id}
            className={`bg-white p-4 rounded shadow-lg ${
              donation.quantity === 0 ? "opacity-50" : ""
            }`}
          >
            <img
              src={donation.image}
              alt={donation.food}
              className="w-full h-[200px] object-cover rounded mb-4"
            />
            <h2 className="text-xl font-bold">{donation.food}</h2>
            <p className="text-gray-700">Quantity: {donation.quantity}</p>
            <p className="text-gray-700">Expiry: {donation.expiry}</p>
            <p className="text-gray-700">Location: {donation.location}</p>
            <p className="text-gray-700">Contact: {donation.contact}</p>
            {donation.quantity > 0 ? (
              <div className="mt-4 space-x-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handleFullRequest(donation.id)}
                >
                  Request Full
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => handlePartialRequest(donation.id)}
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

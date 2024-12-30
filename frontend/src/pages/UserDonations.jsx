import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import the useNavigate hook

const UserDonations = () => {
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();  // Initialize useNavigate

  const token =
    localStorage.getItem("accessToken") ||
    document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1");

  // Axios instance with default headers
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/v1/users",
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const donationsRes = await axiosInstance.get("/get-user-donations");
        setDonations(donationsRes.data.data || []);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    const fetchRequests = async () => {
      try {
        const requestsRes = await axiosInstance.get("/requests");
        console.log(requestsRes.data.data);
        setRequests(requestsRes.data.data || []);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    const fetchNotifications = async () => {
      try {
        const notificationsRes = await axiosInstance.get("/notifications");
        setNotifications(notificationsRes.data.data || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (token) {
      fetchDonations();
      fetchRequests();
      fetchNotifications();
    } else {
      console.error("No token found, user is not authenticated.");
    }
    setLoading(false);
  }, [token]);

  const handleApproveRequest = async (requestId, notificationId) => {
    if (!requestId) {
      alert("Request ID is missing, cannot approve.");
      return;
    }

    try {
      const donationId = requestId.donationId?._id;
      if (!donationId) {
        alert("Donation ID is missing, cannot approve.");
        return;
      }

      const donation = donations.find((d) => d._id === donationId);
      if (!donation) {
        alert("Donation not found for this request.");
        return;
      }

      const requestedQuantity = requestId.quantity;
      console.log(requestedQuantity);

      // Approve partial request
      const response = await axiosInstance.post(`/request-partial/${donationId}`, {
        quantity: requestedQuantity,
      });
      const { data } = response.data;

      // Update the donation's quantity in the state
      setDonations((prev) =>
        prev.map((d) =>
          d._id === donationId ? { ...d, quantity: data.remainingQuantity } : d
        )
      );

      // Update the request status to approved
      await axiosInstance.put(`/requests/${requestId._id}`, { status: "approved" });

      // Delete the notification after approval
      await axiosInstance.delete(`/notifications/${notificationId}`);

      alert("Request approved successfully!");

      // Update state for requests and notifications
      setRequests((prev) =>
        prev.map((request) =>
          request._id === requestId._id ? { ...request, status: "approved" } : request
        )
      );
      setNotifications((prev) => prev.filter((notification) => notification._id !== notificationId));
    } catch (error) {
      console.error("Error approving request or updating donation:", error);
      alert("An error occurred while processing the request.");
    }
  };

  const handleRejectNotification = async (notificationId, requestId) => {
    try {
      // Delete the notification first
      await axiosInstance.delete(`/notifications/${notificationId}`);

      // Delete the request from the database
      await axiosInstance.delete(`/requests/${requestId._id}`);

      alert("Notification and request rejected successfully!");

      // Remove the request from the state
      setRequests((prev) => prev.filter((request) => request._id !== requestId._id));

      // Remove the notification from the state
      setNotifications((prev) => prev.filter((notification) => notification._id !== notificationId));
    } catch (error) {
      console.error("Error rejecting notification and deleting request:", error);
    }
  };

  const handleCreateDonation = () => {
    // Navigate to the /donation page when the button is clicked
    navigate("/donation");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Donations</h1>

      {/* Add button to create new donation */}
      <div className="text-center mb-6">
        <button
          onClick={handleCreateDonation}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Create New Donation
        </button>
      </div>

      {donations.length > 0 ? (
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

              <div className="mt-4">
                {requests
                  .filter((request) => request.donationId?._id === donation._id)
                  .map((request) => (
                    <div key={request._id} className="text-sm mb-2">
                      <p>Status: {request.status || "Pending"}</p>
                      <p>Requested Quantity: {request.quantity || "Full"}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">You have no donations yet.</p>
      )}

      <h2 className="text-2xl font-bold mt-6 mb-4">Notifications</h2>
      <div className="bg-white p-4 rounded shadow-lg">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification._id} className="mb-4 p-4 border-b">
              <p className="text-sm">{notification.message}</p>
              <div className="mt-2 flex justify-between">
                {notification.requestId && (
                  <button
                    className="bg-green-500 text-white p-2 rounded"
                    onClick={() => handleApproveRequest(notification.requestId, notification._id)}
                  >
                    Approve
                  </button>
                )}
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => handleRejectNotification(notification._id, notification.requestId)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No notifications available.</p>
        )}
      </div>
    </div>
  );
};

export default UserDonations;

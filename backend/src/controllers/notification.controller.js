import { Notification } from "../models/notification.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createNotification = asyncHandler(async (req, res) => {
  const { userId, message, requestId } = req.body;  // Add requestId here

  if (!userId || !message) {
    throw new ApiError(400, "User ID and message are required.");
  }

  const notification = new Notification({
    userId,
    message,
    requestId, // Save the requestId to the notification
  });

  await notification.save();

  res.status(201).json(new ApiResponse(201, notification, "Notification sent successfully."));
});

// export const getNotifications = asyncHandler(async (req, res) => {
//   const userId = req.user.id;  // Assuming the user's ID is available in `req.user.id` from middleware

//   if (!userId) {
//     throw new ApiError(400, "User ID is required.");
//   }

//   // Fetch the notifications for the user and populate the requestId to get related request details
//   const notifications = await Notification.find({ userId })
//     .populate("requestId", "status quantity")  // Populate request details (status, quantity)


//     .sort({ createdAt: -1 });  // Sort by latest first

//   if (!notifications || notifications.length === 0) {
//     return res.status(404).json(new ApiResponse(404, [], "No notifications found."));
//   }

//   res.status(200).json(new ApiResponse(200, notifications, "Notifications retrieved successfully."));
// });

export const getNotifications = asyncHandler(async (req, res) => {
    const userId = req.user.id;  // Assuming user ID is available in req.user.id
  
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }
  
    // Fetch notifications for the user, and populate requestId and donationId
    const notifications = await Notification.find({ userId })
    .populate({
      path: "requestId", // Populating the requestId field
      select: "status quantity donationId requesterId", // Select the required fields
      populate: [
        {
          path: "donationId", // Populate donationId in requestId
          select: "food quantity location postal contact", // Select necessary fields from Donation
        },
        {
          path: "requesterId", // Populate requesterId in requestId
          select: "firstName lastName  contact", // Select name, postal code, and contact
        },
      ],
    })
    .sort({ createdAt: -1 });   // Sort notifications by creation date (descending)
  
    if (!notifications || notifications.length === 0) {
      return res.status(404).json(new ApiResponse(404, [], "No notifications found."));
    }
  
    res.status(200).json(new ApiResponse(200, notifications, "Notifications retrieved successfully."));
  });
  

export const updateNotificationStatus = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;  // Extract notification ID from the route parameters
  const { status } = req.body;  // Extract new status (e.g., approved, rejected) from the body

  if (!status) {
    throw new ApiError(400, "Status is required.");
  }

  // Find the notification by ID
  const notification = await Notification.findById(notificationId);

  if (!notification) {
    throw new ApiError(404, "Notification not found.");
  }

  // Update the status of the notification
  notification.status = status;
  await notification.save();

  // Respond with the updated notification
  res.status(200).json(new ApiResponse(200, notification, `Notification ${status} successfully.`));
});

// DELETE Notification by ID
export const deleteNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if the notification exists
  const notification = await Notification.findById(id);

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  // Delete the notification
  await Notification.findByIdAndDelete(id)
  console.log("notification id deleted: ", id);

  res.status(200).json(new ApiResponse(200, null, "Notification deleted successfully"));
});

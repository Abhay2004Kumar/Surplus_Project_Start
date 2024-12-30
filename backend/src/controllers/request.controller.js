import { Request } from "../models/request.models.js";
import { Donation } from "../models/donation.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

/**
 * Create a new request
 */
export const createRequest = asyncHandler(async (req, res) => {
  const { donationId, type, quantity } = req.body;

  // Validate input
  if (!donationId || !type) {
    throw new ApiError(400, "Donation ID and type are required.");
  }

  // Find the donation being requested
  const donation = await Donation.findById(donationId);
  if (!donation) {
    throw new ApiError(404, "Donation not found.");
  }

  if (type === "partial" && (!quantity || quantity <= 0)) {
    throw new ApiError(400, "Quantity must be provided for partial requests.");
  }

  if (type === "partial" && quantity > donation.quantity) {
    throw new ApiError(400, "Requested quantity exceeds available donation.");
  }

  // Create the request
  const request = await Request.create({
    donationId,
    requesterId: req.user._id,
    donorId: donation.user, // Assuming `donation.user` is the donor's ID
    type,
    quantity: quantity,
  });

  res.status(201).json(new ApiResponse(201, request, "Request created successfully."));
});

/**
 * Get all requests for a logged-in user (both sent and received)
 */
export const getUserRequests = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Fetch requests where the user is either the requester or the donor
  const requests = await Request.find({
    $or: [{ requesterId: userId }, { donorId: userId }],
  })
    .populate("donationId", "food quantity")
    .populate("requesterId", "firstName lastName email")
    .populate("donorId", "firstName lastName email")
    .sort({ createdAt: -1 });

  if (!requests || requests.length === 0) {
    return res
      .status(404)
      .json(new ApiResponse(404, [], "No requests found for this user."));
  }

  res.status(200).json(new ApiResponse(200, requests, "Requests retrieved successfully."));
});

/**
 * Update request status (approve/reject)
 */
export const updateRequestStatus = asyncHandler(async (req, res) => {
    console.log("Request Params:", req.params);
    console.log("Request Body:", req.body);
  
    const { id } = req.params; // Extract the request ID
    if (!id) {
      throw new ApiError(400, "Request ID is required.");
    }
  
    const { status } = req.body; // Extract the status
    if (!status) {
      throw new ApiError(400, "Status is required.");
    }
  
    // Update the request
    const request = await Request.findByIdAndUpdate(id, { status }, { new: true });
    if (!request) {
      throw new ApiError(404, "Request not found.");
    }
  
    res.status(200).json(new ApiResponse(200, request, "Request status updated successfully."));
  });
  
  
/**
 * Get requests for a specific donation
 */
export const getRequestsForDonation = asyncHandler(async (req, res) => {
  const { donationId } = req.params;

  // Fetch requests for the given donation
  const requests = await Request.find({ donationId })
    .populate("requesterId", "firstName lastName email")
    .populate("donorId", "firstName lastName email")
    .sort({ createdAt: -1 });

  if (!requests || requests.length === 0) {
    return res
      .status(404)
      .json(new ApiResponse(404, [], "No requests found for this donation."));
  }

  res.status(200).json(new ApiResponse(200, requests, "Requests retrieved successfully."));
});

/**
 * Delete a request
 */
export const deleteRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.params;
    console.log("Received requestId:", requestId); // Debugging line
  
    const request = await Request.findById(requestId);
    if (!request) {
      throw new ApiError(404, "Request not found.");
    }
  
    // Only the requester can delete the request
    if (request.requesterId.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You are not authorized to delete this request.");
    }
  
    await Request.findByIdAndDelete(requestId)
  
    res.status(200).json(new ApiResponse(200, null, "Request deleted successfully."));
  });

  export const approveRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.params;
    const request = await Request.findById(requestId);
    if (!request) {
      throw new ApiError(404, "Request not found.");
    }
  
    const donation = await Donation.findById(request.donationId);
    if (!donation) {
      throw new ApiError(404, "Donation not found.");
    }
  
    // Deduct the quantity
    let updatedQuantity = donation.quantity - request.quantity;
    if (updatedQuantity <= 0) {
      // Delete the donation if quantity becomes 0
      await Donation.findByIdAndDelete(donation._id);
      res.status(200).json(new ApiResponse(200, null, "Donation fully consumed and removed."));
    } else {
      // Update donation quantity
      await Donation.findByIdAndUpdate(donation._id, { quantity: updatedQuantity });
      res.status(200).json(new ApiResponse(200, null, "Donation quantity updated."));
    }
  
    // Approve the request
    await Request.findByIdAndUpdate(requestId, { status: "approved" });
  
    // Remove the notification after approval
    const notification = await Notification.findOne({ requestId });
    if (notification) {
      await Notification.findByIdAndDelete(notification._id);
    }
  
    res.status(200).json(new ApiResponse(200, null, "Request approved and notification removed."));
  });
  
  
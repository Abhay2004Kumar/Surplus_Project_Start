import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request", // Ensure this references the Request model
      required: false, // It can be optional, depending on your use case
    },
  },
  { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);

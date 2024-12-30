import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  donationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donation",
    required: true,
  },
  requesterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["full", "partial"],
    required: true,
  },
  quantity: {
    type: Number,
    default: 0, // Only for partial requests
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  }
}, {timestamps: true});

export const Request = mongoose.model("Request", requestSchema);

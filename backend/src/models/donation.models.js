import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  food: { type: String, required: true },
  quantity: { type: Number, required: true },
  postal: {type: String, required: true},
  foodImage: { type: String, required: true },  // URL from Cloudinary
  expiryDate: { type: Date, required: true },
  location: { type: String, required: true },
  contact: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// Create TTL index on expiryDate field
donationSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });

export const Donation = mongoose.model("Donation", donationSchema);

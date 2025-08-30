import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
  },
  expiration: {
    type: Date,
    required: true,
   
  },
});

// Create TTL index on expiration field (optional if using 'expires' in schema)
otpSchema.index({ expiration: 1 }, { expireAfterSeconds: 0 });

export const Otp = mongoose.model("Otp", otpSchema);

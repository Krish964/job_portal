import { sendMail } from "./mail.controllers.js";
import { Otp } from "../Models/Otp.models.js"; // adjust path accordingly

export const otpHandler = async (req, res) => {
  const { email } = req.body;

  try {
    const verificationCode = Math.floor(1000 + Math.random() * 9000);
    const expirationTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    // Save or update OTP in DB
    const otpRecord = await Otp.findOneAndUpdate(
      { email },
      {
        verificationCode,
        expiration: expirationTime,
        isVerified: false,
      },
      { upsert: true, new: true }
    );

    const verificationMessage = `Hello,

Thank you for signing up. Please use the following verification code to verify your email address:

Your Verification Code: ${verificationCode}

This code is valid for 5 minutes. If you did not request this code, please ignore this email.

Best regards,
[Your Company/Service Name]`;

    await sendMail(email, "Email Verification Code", verificationMessage);

    return res.status(200).json({ message: "Verification code sent to email" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otpCode } = req.body;

  if (!email || !otpCode) {
    return res.status(400).json({ message: "Email and OTP code are required" });
  }

  try {
    // Find OTP record for this email
    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
      return res.status(404).json({ message: "OTP not found. Please request a new one." });
    }

    // Check if already verified
    if (otpRecord.isVerified) {
      return res.status(400).json({ message: "Email already verified." });
    }

    // Check expiration
    if (otpRecord.expiration < new Date()) {
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    // Check if OTP matches
    if (otpRecord.verificationCode !== otpCode) {
      return res.status(400).json({ message: "Invalid OTP. Please try again." });
    }

    // Mark OTP as verified (or you can delete OTP document if preferred)
    otpRecord.isVerified = true;
    await otpRecord.save();

    // Respond with success
    return res.status(200).json({ message: "OTP verified successfully" });

  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
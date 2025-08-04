import jwt from "jsonwebtoken";
import { User } from "../Models/User.models.js";
import { sendMail } from "./mail.controllers.js";

export const handlePasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user with email (await lagao)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User is not registered" });
    }

    // Generate JWT reset token
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.RESET_SECRET_TOKEN,
      { expiresIn: "15m" }
    );

    const resetUrl = `http://localhost:5173/ResetPassword?token=${resetToken}`;

    // Compose message with reset link
    const message = `
      Hello ${user.username || ""},

      You requested to reset your password. Please click the link below to reset it:
      ${resetUrl}

      This link is valid for 15 minutes.

      If you didn't request a password reset, please ignore this email.

      Thanks,
      JobPortal Team
    `;

    // Send email
    await sendMail(email, "Password Reset Request", message);

    return res.status(200).json({ message: "Reset link sent successfully." });
  } catch (error) {
    console.error("Password reset error:", error);
    return res.status(500).json({ error: "Server error." });
  }
};

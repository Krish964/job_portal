import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../Models/User.models.js"; // apna correct path lagao

export const resetPasswordHandler = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const payload = jwt.verify(token, process.env.RESET_SECRET_TOKEN);
    const userId = payload.userId;

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    res.status(200).json({ message: "Password reset successful." });
  } catch (err) {
    console.error("JWT Verify Error:", err);
    res.status(400).json({ error: "Invalid or expired token." });
  }
};

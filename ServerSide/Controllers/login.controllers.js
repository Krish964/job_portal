import jwt from "jsonwebtoken";
import { User } from "../Models/User.models.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Hardcoded admin credentials
  const ADMIN_EMAIL = "krishkumarsingh192@gmail.com";
  const ADMIN_PASSWORD = "shyamaju";

  try {
    console.log("Attempting login for email:", email);

    // Check hardcoded admin first
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminPayload = {
        _id: "admin-id-unique", // unique admin id
        username: "Admin-Page",
        email: ADMIN_EMAIL,
        isAdmin: true,
      };

      // Manually generate tokens for admin
      const accessToken = jwt.sign(adminPayload, process.env.ACCESS_SECRET_TOKEN, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIERY,
      });
      const refreshToken = jwt.sign(adminPayload, process.env.REFRESH_SECRET_TOKEN, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIERY,
      });

      return res.status(200).json({
        message: "Admin login successful",
        user: adminPayload,
        accessToken,
        refreshToken,
      });
    }

    // Normal user login flow
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      console.log("Invalid password for user:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate tokens via User model methods
    const accessToken = user.generateTokens();
    const refreshToken = user.generateRefreshTokens();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: false,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "An internal server error occurred" });
  }
};

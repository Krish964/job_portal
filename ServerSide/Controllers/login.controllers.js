import jwt from "jsonwebtoken";
import { User } from "../Models/User.models.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const generateAccessTokenAndRefreshTokens = async (userId) => {
    try {
      const user = await User.findById(userId)
      const accessToken = user.generateTokens();
      const refreshToken = user.generateRefreshTokens();

      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });

      return {accessToken , refreshToken}
      
    } catch (error) {
      return res.status(400).json({ error:"Error in generating refresh tokens and access token" })
    }
  }

  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Hardcoded admin and HR credentials (example)
  const ADMIN_EMAIL = "krishkumarsingh192@gmail.com";
  const ADMIN_PASSWORD = "shyamaju";

  const HR_EMAIL = "Hr123@gmail.com";       // ideally alag email rakho
  const HR_PASSWORD = "hr1234";

  try {
    console.log("Attempting login for email:", email);

    // 1. Check admin:
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminPayload = {
        _id: "admin-id-unique",
        username: "Admin-Page",
        email: ADMIN_EMAIL,
        isAdmin: true,
        role: "admin",
      };

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

    // 2. Check HR:
    if (email === HR_EMAIL && password === HR_PASSWORD) {
      const hrPayload = {
        _id: "hr-id-unique",
        username: "HR-Page",
        email: HR_EMAIL,
        isAdmin: false,         // HR ko admin nahi banana chahiye agar admin alag role hai
        role: "hr",
      };

      const accessToken = jwt.sign(hrPayload, process.env.ACCESS_SECRET_TOKEN, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIERY,
      });
      const refreshToken = jwt.sign(hrPayload, process.env.REFRESH_SECRET_TOKEN, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIERY,
      });

      return res.status(200).json({
        message: "HR login successful",
        user: hrPayload,
        accessToken,
        refreshToken,
      });
    }

    // 3. Normal user login flow
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(401).json({ error: "User not found...Please SignUp" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      console.log("Invalid password for user:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate tokens via User model methods
    const { accessToken , refreshToken} = await generateAccessTokenAndRefreshTokens(user._id)

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: false,
        role: "user",
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "An internal server error occurred" });
  }
};

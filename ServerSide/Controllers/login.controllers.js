import { User } from "../Models/User.models.js";

export const loginUser = async (req, res) => {
  // Get user details
  const { email, password } = req.body;

  // Validation check to ensure every field is filled
  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    console.log("Attempting login for email:", email);

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      console.log("Invalid password for user:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT tokens
    const accessToken = user.generateTokens();
    const refreshToken = user.generateRefreshTokens();

    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);

    // Save refresh token in DB
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Send tokens & user info
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      accessToken,
      refreshToken,
    });

    console.log("Login successful for user:", email);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

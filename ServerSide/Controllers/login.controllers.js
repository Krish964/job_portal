import { User } from "../Models/User.models.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Hardcoded admin credentials
  const ADMIN_EMAIL = "krishkumarsingh192@gmail.com";
  const ADMIN_PASSWORD = "radhe";

  try {
    console.log("Attempting login for email:", email);

    // Check hardcoded admin first
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Return admin user object with special flag
      return res.status(200).json({
        message: "Admin login successful",
        user: {
          _id: "admin-id-unique",        // aap jo bhi unique id dena chaho
          username: "Admin-Page",
          email: ADMIN_EMAIL,
          isAdmin: true,                 // flag to identify admin in front/backend
        },
        accessToken: "admin-access-token",    // ya koi valid JWT admin token generate karo
        refreshToken: "admin-refresh-token",
      });
    }

    // Normal user flow
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

    const accessToken = user.generateTokens();
    const refreshToken = user.generateRefreshTokens();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
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

    console.log("Login successful for user:", email);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

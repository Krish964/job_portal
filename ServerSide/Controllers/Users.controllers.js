import { User } from "../Models/User.models.js";
import { uploadFileonCloudinary } from "../Utils/Cloudniary.js";

export const registerUser = async (req, res) => {
  try {
    // getting userdetail
    const { username, email, number, password } = req.body;

    // 1. Validate required fields
    if (
      [username, email, password].some((field) => !field?.trim()) ||
      !number || number.toString().trim() === ""
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 2. Check if username or email already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists. Please use another." });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists. Please use another." });
    }

    // 3. Check if resume uploaded
    const resumeLocalPath = req.files?.resume?.[0]?.path;
    if (!resumeLocalPath) {
      return res.status(400).json({ error: "Resume file is required" });
    }

    // 4. Upload to Cloudinary
    const resume = await uploadFileonCloudinary(resumeLocalPath);

    // 5. Create new user in database
    const user = await User.create({
      username,
      email,
      number,
      password, // 👉 NOTE: you should hash this in real-world apps
      resume: resume?.url || "no url found"
    });

    // 6. Return created user (excluding password, refreshToken)
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
      return res.status(500).json({ error: "User not created. Server issue." });
    }

    return res.status(201).json({
      message: "User registered successfully",
      user: createdUser
    });

  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

import jwt from "jsonwebtoken";
import { User } from "../Models/User.models.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // ✅ Yehi tumhara user set karega
    next();
  } catch (err) {
    console.error("JWT Auth Error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};



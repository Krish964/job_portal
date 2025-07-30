// admin.controller.js
import { Application } from "../Models/Application.model.js";

export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("user", "name email mobile")          // only fetch selected fields
      .populate("job", "title company location")
      .sort({ createdAt: -1 });                       // newest first

    res.status(200).json({ success: true, applications });

  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ success: false, message: "Failed to fetch applications" });
  }
};

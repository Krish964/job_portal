// admin.controller.js
import { Application } from "../Models/application.models.js";

export const getAllApplications = async (req, res) => {
  try {
    // Fetch all applications, sorted by their creation date descending
    const applications = await Application.find()
      .sort({ createdAt: -1 }); // Newest first

    // Return the full application data (including all fields as per schema)
    res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ success: false, message: "Failed to fetch applications" });
  }
};

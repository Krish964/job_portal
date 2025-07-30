import { Application } from "../Models/application.models.js";
import { User } from "../Models/User.models.js";
import { JobDetail } from "../Models/Jobs.models.js";

export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user._id; // JWT se user id milegi
    const resumePath = req.body.resume; // Ya file upload system ho toh file path

    // Optional: check if already applied
    const alreadyApplied = await Application.findOne({ user: userId, job: jobId });
    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied for this job" });
    }

    const application = new Application({
      user: userId,
      job: jobId,
      resume: resumePath,
    });

    await application.save();

    res.status(201).json({
      message: "Job application submitted successfully",
      application,
    });

  } catch (error) {
    console.error("Apply Job Error:", error);
    res.status(500).json({ error: "Failed to apply for job" });
  }
};

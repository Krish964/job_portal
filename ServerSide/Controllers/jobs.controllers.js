import { Application } from "../Models/application.models.js";

export const handleJobData = async (req, res) => {
  const { title, company, sallary, username, job_type, resume } = req.body;

  // Field validation (make SURE field names match what Mongoose wants)
  if (!username || !title || !company || !job_type || !sallary) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  try {
    // Directly create and save the document
    const newApplication = await Application.create({
      username,
      title,
      company,
      sallary,
      job_type,
      resume,
      status: "pending",
    });

    return res.status(201).json({ message: "Application saved successfully", application: newApplication });
  } catch (error) {
    console.log(`Error occurred in saving application: ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

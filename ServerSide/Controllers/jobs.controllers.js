import { Application } from "../Models/application.models.js";

export const handleJobData = async (req, res) => {
  const {
    title,
    owner,
    descriptionBreakdown,
    username,
    email ,
    type,
    resume,
  } = req.body;

  console.log("Received application data:", req.body);

  // Nested fields extraction:
  const companyName = owner?.companyName || "";
  const salaryMin = descriptionBreakdown?.salaryRangeMinYearly;
  

  if (!username || !title || !companyName || !type || !salaryMin) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  try {
    const newApplication = await Application.create({
      username,
      email , 
      title,
      companyName,
      salaryRangeMinYearly: salaryMin,
      type,
      resume,
      status: "pending", // default status
    });

    return res.status(201).json({ message: "Application saved successfully", application: newApplication });
  } catch (error) {
    console.log(`Error occurred in saving application: ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

import { Recruiter } from "../Models/recruiter.models.js";
import jwt from "jsonwebtoken";

const getAccessToken = async (code) => {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    client_id: process.env.LINKEDIN_CLIENT_ID,
    client_secret: process.env.LINKEDIN_SECRET_KEY,
    redirect_uri: "http://localhost:8000/api/users/linkedInUrl",
  });

  const response = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const AccessToken = await response.json();
  return AccessToken;
};

const getrecruiterData = async (linkedinAccessToken) => {
  const response = await fetch("https://api.linkedin.com/v2/userinfo", {
    method: "get",
    headers: {
      Authorization: `Bearer ${linkedinAccessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const recruiterData = await response.json();
  return recruiterData;
};

export const LinkedInUrl = async (req, res) => {
  try {
    const { code } = req.query;

    // get access token
    const linkedinAccessToken = await getAccessToken(code);

    // get recruiterData
    const recruiterData = await getrecruiterData(linkedinAccessToken.access_token);
    if (!recruiterData) {
      throw new Error("recruiterData is empty");
    }

    let recruiter
    
    recruiter = await Recruiter.findOne({ email: recruiterData.email })
    if (recruiter) {
      return res.status(400).json({error : "User already exist...Please login"})
    }

    // Creete recruiterData instance  and save to database
     recruiter = new Recruiter({
      name: recruiterData.name,
      email: recruiterData.email,
      phone: recruiterData?.phone || "Number is missing",
       photo: recruiterData?.picture,
      role : "recruiter"
    });

    await recruiter.save();

    // Creating recruiter accessToken
    const recruiterAccessToken = recruiter.generateRecruiterAccessToken();

    res.cookie("recruiter_token", recruiterAccessToken, {
      httpOnly: true,
    });

  
    res.redirect("http://localhost:5173/recruiter")
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
};


export const getRecruiterData = (req, res) => {
  const token = req.cookies.recruiter_token;

  if (!token) {
    return res.status(401).json({ error: "Recruiter token is missing..." });
  }

  try {
    const recruiter = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);

    // If decode is empty, check your jwt.sign() logic!
    return res.status(200).json({
      success: true,
      
      recruiter
    });
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired recruiter token." });
  }
}


import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  sallary: {
    type: String,  // Aapke sample me salary "5 LPA" jaisa string hai, isliye String rakh rahe hain
    required: false,
  },
  job_type: {
    type: String,
    required: true,
  },
  resume: {
    type: String,  // Resume ka URL ya file path yahan store kar sakte hain (agar use karna ho)
    required: false,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  }
}, { timestamps: true });

export const Application = mongoose.model("Application", applicationSchema);

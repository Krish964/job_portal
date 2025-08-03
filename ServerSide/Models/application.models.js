import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type : String
  },
  title: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  salaryRangeMinYearly: {
    type: String,  // Aapke sample me salary "5 LPA" jaisa string hai, isliye String rakh rahe hain
    required: false,
  },
  type: {
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

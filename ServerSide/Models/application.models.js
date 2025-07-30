import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  user: {                               // userId
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  job: {                                // jobId
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobDetail",
    required: true,
  },
  resume: {                             // file path or URL
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  }
}, { timestamps: true });

export const Application = mongoose.model("Application", applicationSchema);

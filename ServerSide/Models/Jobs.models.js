import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({

  title: {
    type: String,
    required : true
  },
  sallary: {
    type: Number,
    required : true
  }, 
  location: {
    type: String,
    required: true
  },
  company : {
    type: String,
    required: true
  }, 
  workTime: {   //Part tiem or full time 
    type: String,
    required: true
  }, 
  jobrole: {
    type: String,
    required : true
  }


} , {timestamps : true})

export const JobDetail = mongoose.model("JobDetail" , jobSchema)
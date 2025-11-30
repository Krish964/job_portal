import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const recruiterSchema = new mongoose.Schema({
  name: {
    type: String,
    required : true
  },
  email: {
    type: String,
    required : true
  },

  phone: {
    type: String, 
  },

  photo: {
    type: String,
  }, 
  role: {
    type :String
  }
}, { timestamps: true })


recruiterSchema.methods.generateRecruiterAccessToken = function (){
    return jwt.sign(
      {
        _id: this._id, 
        name: this.name,
        email : this.email,
       
      } , 
      process.env.ACCESS_SECRET_TOKEN,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIERY
      }
    )
}

export const Recruiter = mongoose.model('Recruiter', recruiterSchema)



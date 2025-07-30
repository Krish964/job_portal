import mongoose from "mongoose"
import { DB_name } from "../constants.js"

const connectDB = async () => {

  try {
   const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URL} / ${DB_name}`)
 console.log(`MongoDb connected !! DB host: ${connectionInstance.connection.host}`)
  } catch (error) {
    console.error("error :", error)
    process.exit(1)
  }
}


export default connectDB;
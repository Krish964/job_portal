import express from "express"
import jobs from "./jobData.js";
import cors from "cors"
const app = express()
const port = process.env.PORT || 8000;

import connectDB from "./DB/Database.js"
import dotenv from "dotenv"

app.use(cors());
app.get("/api/job", (req, res) => {
  res.send(jobs)
})

app.use(express.json());
// DATABASE CONNECTION
dotenv.config({
  path: "./.env"
})

connectDB()


// IMPORTING ROUTES
import userRoutes from "./Routes/User.routes.js"

// Routes declaration
app.use("/api/users", userRoutes)  //-----> https://localhost:8000/api/users/register or /login



// SERVER RUNNING
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`)
})
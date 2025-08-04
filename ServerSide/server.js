import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./DB/Database.js";
import userRoutes from "./Routes/User.routes.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

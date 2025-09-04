import dotenv from "dotenv";
dotenv.config();
import mqtt from "mqtt";
import express from "express";
import cors from "cors";

import connectDB from "./DB/Database.js";
import userRoutes from "./Routes/User.routes.js";
import cookieParser from "cookie-parser";
const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
  origin: "http://localhost:5173", // your frontend origin here
  credentials: true, // allow cookie credentials
}));
app.use(express.json());
app.use(cookieParser())

connectDB();

app.use("/api/users", userRoutes);

// mqtt connection setup
const mqttClient = mqtt.connect('mqtt://localhost:1883', 
  {username: "krish",   // broker ke liye username
  password: "radhaRani",}
);

mqttClient.on('connect', () => {
  console.log("connected to mqtt server")
})

// Make mqtt accessible to routes/controllers via app.locals
app.locals.mqttClient = mqttClient

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

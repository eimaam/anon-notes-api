/**
 * Application's entry point
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "../routes";
import { connectMongo } from "../utils/connectMongo";
import rateLimit from "express-rate-limit";

dotenv.config()

const PORT = process.env.PORT || 9000;

const app = express(); 

app.use(express.json());
app.use(cors());

// Apply rate limiting middleware to limit the number of requests from an IP address
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  message: "Too many requests from this IP, please try again in an hour",
}))

app.use("/api/v1", router);

const startServer = async () => {
  try {
    await connectMongo();
    
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });

  } catch (error) {
    console.log("Failed to Start Server", error);
    process.exit(1);
  }
}

startServer();

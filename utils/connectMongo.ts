import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

type NodeEnv = "development" | "production";

const PROD_DB_URI = process.env.PROD_DB_URI as string;
const DEV_DB_URI = process.env.DEV_DB_URI as string;
const ENVIRONMENT = process.env.NODE_ENV as NodeEnv;

const MONGODB_URI = ENVIRONMENT === "production" ? PROD_DB_URI : DEV_DB_URI;

export const connectMongo = async () => {
  if (!MONGODB_URI) throw new Error("MongoDB URI is missing");

  try {
    await mongoose.connect(MONGODB_URI, {
      connectTimeoutMS: 15000,
    });
    console.log("Connected to MongoDB > ", ENVIRONMENT);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  // Handle disconnect events
  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from MongoDB. Reconnecting...");
    connectMongo();
  });

  // Handle connection error events
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
};

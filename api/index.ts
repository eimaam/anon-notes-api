import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "../routes";
import { connectMongo } from "../utils/connectMongo";

dotenv.config()

const PORT = process.env.PORT || 9000;

const app = express(); 

app.use(express.json());
app.use(cors());

app.use("/api", router);

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

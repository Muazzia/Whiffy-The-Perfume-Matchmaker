// src/config/db.ts
import mongoose from "mongoose";
import { config } from "../config";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(config.dbUrl, {
      // These options are recommended in most setups
      autoIndex: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;

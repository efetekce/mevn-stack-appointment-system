import mongoose from "mongoose";
const uri = process.env.MONGO_URI as string;

export default async function connectDB() {
  if (mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

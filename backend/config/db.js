import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/placemate";
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    
    console.log("✅ MongoDB connected successfully");
    return true; // Return true for successful connection
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    console.log("🔄 Starting server without MongoDB...");
    console.log("📝 To fix this:");
    console.log("   1. Start MongoDB locally, OR");
    console.log("   2. Update MONGO_URI in .env to use MongoDB Atlas");
    
    // Don't exit the process, continue without DB
    return false;
  }
};

export default connectDB;

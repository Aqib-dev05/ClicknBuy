import mongoose from "mongoose";

let isConnected = false;
let cachedConnection = null;

export const connectDB = async (mongo_uri) => {
  if (!mongo_uri) {
    throw new Error("❌ MONGO_URI is not defined in environment variables");
  }

  if (isConnected) {
    return cachedConnection;
  }

  mongoose.set("strictQuery", true);

  try {
    const conn = await mongoose.connect(mongo_uri, {
      dbName: "ecommerce",
      maxPoolSize: 10,
    });
    isConnected = conn.connections[0].readyState === 1;
    cachedConnection = conn;
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    isConnected = false; // Reset connection status on error
    console.error(`❌ Error connecting to MongoDB: ${error.message}`); 
    throw error;
  }
}; // Export the connectDB function

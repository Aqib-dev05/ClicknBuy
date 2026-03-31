import mongoose from "mongoose";

export const connectDB = async (mongo_uri) => {
  if (!mongo_uri) {
    throw new Error("MONGO_URI is not defined");
  }
  mongoose.set("strictQuery", true);

  try {
    const conn = await mongoose.connect(mongo_uri, {
      dbName: "ecommerce",
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error.message}`);
    throw error;
  }
};

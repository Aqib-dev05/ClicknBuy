import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./src/config/db.js";
import {
  seedAdmin,
  seedProducts,
  seedCategory,
  seedSubCategory,
} from "./src/seed/seed.js";
import app from "./src/app.js";
import {redisClient} from "./src/config/redisClient.js"

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const startServer = async () => {
  await connectDB(MONGO_URI);
  await seedAdmin();
  await seedCategory();
  await seedSubCategory();
  await seedProducts();

 try {
    await redisClient.connect();
    console.log("✅ Redis connected successfully");
} catch (error) {
    console.error("❌ Could not connect to Redis:", error);
}

console.log('✅ Redis Client Connected');

  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
};

startServer();

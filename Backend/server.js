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

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const startServer = async () => {
  await connectDB(MONGO_URI);
  await seedAdmin();
  await seedCategory();
  await seedSubCategory();
  await seedProducts();

  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
};

startServer();

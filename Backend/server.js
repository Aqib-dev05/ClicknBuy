import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./src/config/db.js";
import { seedAdmin, seedCategory, seedSubCategory } from "./src/seed/seed.js";
import app from "./src/app.js";

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce";
app.listen(PORT, () => {
  connectDB(MONGO_URI);
  seedAdmin();
  seedCategory();
  seedSubCategory();
  console.log(`Server is listening at http://localhost:${PORT}`);
});

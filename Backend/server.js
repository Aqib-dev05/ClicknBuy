import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./src/config/db.js";
import { seedAdmin,seedProducts, seedCategory, seedSubCategory } from "./src/seed/seed.js";
import app from "./src/app.js";

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI ;
app.listen(PORT,async () => {
  await connectDB(MONGO_URI);
  seedAdmin();
  seedCategory();
  seedSubCategory();
  seedProducts();
  console.log(`Server is listening at http://localhost:${PORT}`);
});

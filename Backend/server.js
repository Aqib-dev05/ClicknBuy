import { connectDB } from "./src/config/db.js";
import dotenv from 'dotenv';
import app from "./src/app.js";

dotenv.config();
  
  const PORT = process.env.PORT || 5000;
  const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce";
  app.listen(PORT,async()=>{
   await connectDB(MONGO_URI);
    console.log(`Server is listening at http://localhost:${PORT}`);
  })
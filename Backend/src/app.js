import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js"
import subCategoryRoutes from "./routes/subCategory.js"
import orderRoutes from "./routes/orderRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import checkAuth from "./middlewares/authMiddleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE'],
}));

//router routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories",categoryRoutes);
app.use("/api/subcategories",subCategoryRoutes);
app.use("/api/orders",checkAuth,orderRoutes);
app.use("/api/users",checkAuth,userRoutes);
app.use("/api/cart",checkAuth,cartRoutes);


dotenv.config();
import { connectDB } from "./config/db.js";
const conn = connectDB(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the E-commerce API",
    connection: conn
  })
});

export default app;

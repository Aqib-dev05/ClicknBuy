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



app.get("/", (req, res) => {
  res.send("Hello");
});


app.get("/check",(req,res)=>{
  res.json({
    "MONGOI_URI": process.env.MONGO_URI,
    "PORT":process.env.PORT,
    "JWT_SECRET":process.env.JWT_SECRET,
    "CLIENT_ORIGIN":process.env.CLIENT_ORIGIN,
    "CLOUDINARY_CLOUD_NAME":process.env.CLOUDINARY_CLOUD_NAME,
    "CLOUDINARY_API_KEY":process.env.CLOUDINARY_API_KEY,
    "CLOUDINARY_API_SECRET":process.env.CLOUDINARY_API_SECRET
  })
})

export default app;

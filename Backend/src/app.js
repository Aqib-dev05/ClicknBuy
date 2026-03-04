import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js"
import subCategoryRoutes from "./routes/subCategory.js"
import orderRoutes from "./routes/orderRoutes.js"
import userRoutes from "./routes/userRoutes.js"


import checkAuth from "./middlewares/authMiddleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//router routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories",categoryRoutes);
app.use("/api/subcategories",subCategoryRoutes);
app.use("/api/orders",checkAuth,orderRoutes);
app.use("/api/users",checkAuth,userRoutes);



app.get("/", (req, res) => {
  res.send("Hello");
});

export default app;

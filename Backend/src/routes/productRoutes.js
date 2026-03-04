import express from "express";
import {upload} from "../middlewares/multer.js";
import checkAuth from "../middlewares/authMiddleware.js";
import {
  handleGetProductsGeneral,
  handleGetProductById,
  handleGetProductBySlug,
  handlePostProduct,
  handlePutProduct,
  handleDeleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router
  .get("/", handleGetProductsGeneral)
  .get("/:id", handleGetProductById)
  .get("/slug/:slug", handleGetProductBySlug)
  .post("/",checkAuth,upload.array("images",5), handlePostProduct)
  .put("/:id",checkAuth, handlePutProduct)
  .delete("/:id",checkAuth, handleDeleteProduct);

export default router;

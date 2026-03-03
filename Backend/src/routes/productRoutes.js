import express from "express";
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
  .get("/:slug", handleGetProductBySlug)
  .post("/", handlePostProduct)
  .put("/:id", handlePutProduct)
  .delete("/:id", handleDeleteProduct);

export default router;

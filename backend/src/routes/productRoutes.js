import express from "express";
import {upload} from "../middlewares/multer.js";
import checkAdmin from "../middlewares/checkAdmin.js";
import checkAuth from "../middlewares/authMiddleware.js";

import {
  handleGetProductsGeneral,
  handleGetProductById,
  handleGetProductBySlug,
  handlePostProduct,
  handlePutProduct,
  handleDeleteProduct,
  handleDeleteProductImage,
} from "../controllers/productController.js";

const router = express.Router();

router
  .get("/", handleGetProductsGeneral)
  .get("/:id", handleGetProductById)
  .get("/slug/:slug", handleGetProductBySlug)
  .post("/",checkAuth,checkAdmin,upload.array("images",5), handlePostProduct)
  .put("/:id",checkAuth,checkAdmin,upload.array("images",5), handlePutProduct)
  .delete("/delete-image",checkAuth,checkAdmin, handleDeleteProductImage)
  .delete("/:id",checkAuth,checkAdmin, handleDeleteProduct);

export default router;

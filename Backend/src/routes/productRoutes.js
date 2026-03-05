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
} from "../controllers/productController.js";

const router = express.Router();

router
  .get("/", handleGetProductsGeneral)
  .get("/:id", handleGetProductById)
  .get("/slug/:slug", handleGetProductBySlug)
  .post("/",upload.array("images",5), handlePostProduct)
  .put("/:id",checkAuth,checkAdmin, handlePutProduct)
  .delete("/:id",checkAuth,checkAdmin, handleDeleteProduct);

export default router;

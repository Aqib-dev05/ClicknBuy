import express from "express";
import checkAuth from "../middlewares/authMiddleware.js";
import checkAdmin from "../middlewares/checkAdmin.js";

import {
  handleGetCategory,
  handlePostCategory,
  handlePutCategory,
  handleDeleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router
  .get("/", handleGetCategory)
  .post("/",checkAuth,checkAdmin, handlePostCategory)
  .put("/:id",checkAuth,checkAdmin, handlePutCategory)
  .delete("/:id",checkAuth,checkAdmin, handleDeleteCategory);

export default router;

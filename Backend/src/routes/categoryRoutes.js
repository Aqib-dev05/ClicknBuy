import express from "express";
import checkAuth from "../middlewares/authMiddleware.js";
import {
  handleGetCategory,
  handlePostCategory,
  handlePutCategory,
  handleDeleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router
  .get("/", handleGetCategory)
  .post("/",checkAuth, handlePostCategory)
  .put("/:id",checkAuth, handlePutCategory)
  .delete("/:id",checkAuth, handleDeleteCategory);

export default router;

import express from "express";
import {
  handleGetCategory,
  handlePostCategory,
  handlePutCategory,
  handleDeleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router
  .get("/", handleGetCategory)
  .post("/", handlePostCategory)
  .put("/:id", handlePutCategory)
  .delete("/:id", handleDeleteCategory);

export default router;

import express from "express";
import {
  handleGetSubCategory,
  handlePostSubCategory,
  handlePutSubCategory,
  handleDeleteSubCategory,
} from "../controllers/subCategoryController.js";

const router = express.Router();

router
  .get("/", handleGetSubCategory)
  .post("/", handlePostSubCategory)
  .put("/:id", handlePutSubCategory)
  .delete("/:id", handleDeleteSubCategory);

export default router;

import express from "express";
import checkAuth from "../middlewares/authMiddleware.js";
import {
  handleGetSubCategory,
  handlePostSubCategory,
  handlePutSubCategory,
  handleDeleteSubCategory,
} from "../controllers/subCategoryController.js";

const router = express.Router();

router
  .get("/", handleGetSubCategory)
  .post("/",checkAuth, handlePostSubCategory)
  .put("/:id",checkAuth, handlePutSubCategory)
  .delete("/:id",checkAuth, handleDeleteSubCategory);

export default router;

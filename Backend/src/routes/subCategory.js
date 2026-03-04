import express from "express";
import checkAuth from "../middlewares/authMiddleware.js";
import checkAdmin from "../middlewares/checkAdmin.js";

import {
  handleGetSubCategory,
  handlePostSubCategory,
  handlePutSubCategory,
  handleDeleteSubCategory,
} from "../controllers/subCategoryController.js";

const router = express.Router();

router
  .get("/", handleGetSubCategory)
  .post("/",checkAuth,checkAdmin, handlePostSubCategory)
  .put("/:id",checkAuth,checkAdmin, handlePutSubCategory)
  .delete("/:id",checkAuth,checkAdmin, handleDeleteSubCategory);

export default router;

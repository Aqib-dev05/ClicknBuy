import express from "express";
import checkAuth from "../middlewares/authMiddleware.js";
import {
  handleGetCart,
  handleAddToCart,
  handleUpdateCartItem,
  handleRemoveFromCart,
  handleClearCart,
  handleBulkUpdate,
  handleBulkInsertion,
} from "../controllers/cartController.js";

const router = express.Router();

router.use(checkAuth);

router
  .get("/", handleGetCart)
  .post("/", handleAddToCart)
  .post("/bulk-insertion", handleBulkInsertion)
  .put("/:productId", handleUpdateCartItem)
  .patch("/bulk",handleBulkUpdate)
  .delete("/:productId", handleRemoveFromCart)
  .delete("/", handleClearCart);

export default router;

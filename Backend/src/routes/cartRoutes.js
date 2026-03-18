import express from "express";
import checkAuth from "../middlewares/authMiddleware.js";
import {
  handleGetCart,
  handleAddToCart,
  handleUpdateCartItem,
  handleRemoveFromCart,
  handleClearCart,
  handleBulkUpdate,
} from "../controllers/cartController.js";

const router = express.Router();

router.use(checkAuth);

router
  .get("/", handleGetCart)
  .post("/", handleAddToCart)
  .put("/:productId", handleUpdateCartItem)
  .patch("/bulk",handleBulkUpdate)
  .delete("/:productId", handleRemoveFromCart)
  .delete("/", handleClearCart);

export default router;

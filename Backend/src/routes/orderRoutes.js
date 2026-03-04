import express from "express";
import {
    getAllOrders,
    getUserOrders,
    postOrder,
    putOrderByUser,
    putOrderByAdmin,
    deleteOrder
} from "../controllers/orderController.js"

const router = express.Router();

router
  .get("/",getAllOrders) //admin only
  .get("/user/:id",getUserOrders) //loggedIn user Only
  .post("/",postOrder) //create order(loggedIn user)
  .put("/user/:id",putOrderByUser) //user update order details
  .put("/:id",putOrderByAdmin) //admin update order status
  .delete("/:id",deleteOrder);

export default router;

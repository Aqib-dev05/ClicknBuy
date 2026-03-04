import express from "express";
import checkAdmin from "../middlewares/checkAdmin.js";
import checkAuth from "../middlewares/authMiddleware.js"

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
  .get("/",checkAuth,checkAdmin,getAllOrders) //admin only
  .get("/user/:id",checkAuth,getUserOrders) //loggedIn user Only
  .post("/",checkAuth,postOrder) //create order(loggedIn user)
  .put("/user/:id",checkAuth,putOrderByUser) //user update order details
  .put("/:id",checkAuth,checkAdmin,putOrderByAdmin) //admin update order status
  .delete("/:id",checkAuth,deleteOrder);

export default router;

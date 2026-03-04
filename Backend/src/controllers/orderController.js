import express from "express";
import Order from "../models/Order.js";

// GET /orders  (admin only) - all orders
async function getAllOrders(req, res) {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price");

    return res.status(200).json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
}

// GET /orders/user/:id  - orders of a specific user
async function getUserOrders(req, res) {
  const { id } = req.params;

  try {
    const orders = await Order.find({ user: id }).populate(
      "products.product",
      "name price"
    );

    return res.status(200).json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch user orders",
      error: error.message,
    });
  }
}

// POST /orders  - create order for logged in user
async function postOrder(req, res) {
  const userId = req.user?._id || req.user?.id;
  const {
    products,
    totalAmount,
    paymentMethod,
    paymentStatus,
    paymentId,
    paymentSignature,
  } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User not found on request" });
  }

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "Products are required" });
  }

  if (typeof totalAmount !== "number") {
    return res
      .status(400)
      .json({ message: "totalAmount must be a number" });
  }

  try {
    const newOrder = await Order.create({
      user: userId,
      products,
      totalAmount,
      paymentMethod,
      paymentStatus,
      paymentId,
      paymentSignature,
    });

    return res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
}

// PUT /orders/user/:id  - user updates own order (e.g. address, cancel request)
async function putOrderByUser(req, res) {
  const { id } = req.params; // order id
  const userId = req.user?._id || req.user?.id;

  try {
    const order = await Order.findOne({ _id: id, user: userId });

    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found for this user" });
    }

    // Allow limited fields to be updated by user
    const allowed = ["paymentMethod"];
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) {
        order[field] = req.body[field];
      }
    });

    await order.save();

    return res.status(200).json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update order",
      error: error.message,
    });
  }
}

// PUT /orders/:id  - admin updates order status/paymentStatus
async function putOrderByAdmin(req, res) {
  const { id } = req.params;
  const { status, paymentStatus } = req.body;

  try {
    const updateFields = {};
    if (status !== undefined) updateFields.status = status;
    if (paymentStatus !== undefined) updateFields.paymentStatus = paymentStatus;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update order",
      error: error.message,
    });
  }
}

// DELETE /orders/:id  - delete order (auth middleware already applied)
async function deleteOrder(req, res) {
  const { id } = req.params;

  try {
    const deleted = await Order.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      message: "Order deleted successfully",
      order: deleted,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete order",
      error: error.message,
    });
  }
}

export {
  getAllOrders,
  getUserOrders,
  postOrder,
  putOrderByUser,
  putOrderByAdmin,
  deleteOrder,
};
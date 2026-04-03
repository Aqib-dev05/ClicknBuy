import express from "express";
import userModel from "../models/User.js";
import cartModel from "../models/Cart.js";
import orderModel from "../models/Order.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinay.js";
import mongoTransection from "../config/mongoTransection.js";

async function getAllUsersInfo(req, res) {
  try {
    const users = await userModel.find()
      .select("name email phone role address")
      .lean();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getSingleUser(req, res) {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function putSingleUser(req, res) {
  const { id } = req.params;

  if (req.body.role) {
    return res.status(403).json({ message: "Role updates are not allowed" });
  }

  let { name, email, phone, password, address } = req.body;

  if (name) name = name.trim();
  if (email) email = email.trim();
  if (password) password = password.trim();
  if (phone) phone = phone.trim();
  if (address) address = JSON.parse(address);

  try {
    // Only update non-undefined fields
    const updateFields = {};
    if (name !== undefined && name !== null && name !== "")
      updateFields.name = name;
    if (email !== undefined && email !== null && email !== "")
      updateFields.email = email;
    if (phone !== undefined && phone !== null && phone !== "")
      updateFields.phone = phone;
    if (password !== undefined && password !== null && password !== "")
      updateFields.password = password;
    if (address !== undefined && address !== null && address !== "")
      updateFields.address = address;

    // Handle avatar file upload if provided
    if (req.file && req.file.path) {
      // Delete old avatar if it exists and is not the default
      const existingUser = await userModel.findById(id);
      if (existingUser.avatar && existingUser.avatar.public_id && existingUser.avatar.public_id !== "default") {
        try {
          await deleteFromCloudinary(existingUser.avatar.public_id);
        } catch (deleteError) {
          console.error("Error deleting old avatar:", deleteError.message);
          // Continue with upload even if delete fails
        }
      }

      const uploadResult = await uploadOnCloudinary(req.file.path, "avatars");

      if (!uploadResult) {
        return res.status(500).json({
          message: "Failed to upload avatar image",
        });
      }

      updateFields.avatar = {
        url: uploadResult.secure_url || uploadResult.url,
        public_id: uploadResult.public_id,
      };
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true },
    );
    console.log(updatedUser);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not updated or not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
     
    res.status(500).json({
      err: "Operation Failed",
      message: error.message,
    });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    // Find the user to get avatar info before deletion
    const userToDelete = await userModel.findById(id);
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete avatar from Cloudinary if it exists and is not the default
    if (userToDelete.avatar && userToDelete.avatar.public_id && userToDelete.avatar.public_id !== "default") {
      try {
        await deleteFromCloudinary(userToDelete.avatar.public_id);
      } catch (deleteError) {
        console.error("Error deleting avatar:", deleteError.message);
        // Continue with user deletion even if avatar delete fails
      }
    }

    //porduction k liye, as localDb standalone hy
    //    await mongoTransection(async (session) => {

    //     await cartModel.deleteMany({ user: id }).session(session);
    //     await orderModel.deleteMany({ user: id }).session(session);

    //     const user = await userModel.findByIdAndDelete(id).session(session);

    //     if (!user) {
    //       throw new Error("User not found");
    //     }
    // });
    //   res.status(200).json({ message: "User and associated data deleted successfully" });

    await cartModel.deleteOne({ user: id });
    await orderModel.deleteOne({ user: id });
    const deletedUser = await userModel.findByIdAndDelete(id);


    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User and associated data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { getAllUsersInfo, getSingleUser, putSingleUser, deleteUser };

import express from "express"
import userModel from "../models/User.js"
import { uploadOnCloudinary } from "../utils/cloudinay.js"

 async function getAllUsersInfo(req,res) {
   try {
      const users = await userModel.find().lean();
      res.status(200).json(users);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
 }

 async function getSingleUser(req,res) {
    const {id} = req.params;
    try {
      const user = await userModel.findById(id);
      res.status(200).json(user);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
 }

 async function putSingleUser(req,res) {
   const { id } = req.params;

  if (req.body.role !== (undefined || null || "" )) {
    return res.status(403).json({ message: "Role updates are not allowed" });
  }

  const { name, email, phone, password, address } = req.body;

   try {
      // Only update non-undefined fields
      const updateFields = {};
      if (name !== undefined) updateFields.name = name;
      if (email !== undefined) updateFields.email = email;
     if (phone !== undefined) updateFields.phone = phone;
      if (password !== undefined) updateFields.password = password;
      if (address !== undefined) updateFields.address = address;

     // Handle avatar file upload if provided
     if (req.file && req.file.path) {
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
         { new: true }
      );

      if (!updatedUser) {
         return res.status(404).json({ message: "User not updated or not found" });
      }

      res.status(200).json({
         message: "User updated successfully",
         updatedUser
      });
   } catch (error) {
      res.status(500).json({
         err: "Operation Failed",
         message: error.message
      });
   }
    }
    
 
 async function deleteUser(req,res) {
   const {id} = req.params;
   try {
     const deleted = await userModel.findByIdAndDelete(id);
       if(!deleted){
         return res.status(402).send("USer not found")
       }
       res.status(200).json({
         message:"User deleted successfully",
          deletedPerson:deleted
       })
  } catch (error) {
     res.status(500).json({ message: error.message });
  }
 }

 export {
    getAllUsersInfo,
    getSingleUser,
    putSingleUser,
    deleteUser
 }
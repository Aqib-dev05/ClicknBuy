import express from "express";
import checkAuth from "../middlewares/authMiddleware.js"
import checkAdmin from "../middlewares/checkAdmin.js";

import {
    getAllUsersInfo,
    getSingleUser,
    putSingleUser,
    deleteUser
} from "../controllers/userController.js"

 const router = express.Router();

 router
 .get("/",checkAuth,checkAdmin,getAllUsersInfo)   //admin only
 .get("/:id",checkAuth,getSingleUser)
 .put("/:id",checkAuth,putSingleUser)
 .delete("/:id",checkAuth,deleteUser)

 export default router;
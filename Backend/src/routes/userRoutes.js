import express from "express";
import {
    getAllUsersInfo,
    getSingleUser,
    putSingleUser,
    deleteUser
} from "../controllers/userController.js"

 const router = express.Router();

 router
 .get("/",getAllUsersInfo)   //admin only
 .get("/:id",getSingleUser)
 .put("/:id",putSingleUser)
 .delete("/:id",deleteUser)

 export default router;
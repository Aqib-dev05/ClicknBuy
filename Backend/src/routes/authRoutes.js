import express from "express";
import {handleLogin,handleRegister,getCurrentUser,handleLogout} from "../controllers/authController.js"
import checkAuth from "../middlewares/authMiddleware.js"
 const router = express.Router();

 router
 .post('/register',handleRegister)
 .post('/login',handleLogin)
 .get('/logout',handleLogout)
 .get('/me',checkAuth,getCurrentUser)

  export default router;
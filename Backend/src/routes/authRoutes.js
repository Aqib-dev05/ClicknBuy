import express from "express";
import {
    handleLogin,
    handleRegister,
    getCurrentUser,
    handleLogout,
    handleForgetPassword,
    handleVerifyOtp,
    handleResetPassword,
} from "../controllers/authController.js";
import checkAuth from "../middlewares/authMiddleware.js";
import {
    checkForgetPassToken,
    checkForgetPassTokenNew,
} from "../middlewares/forgetPassMiddleware.js";
import { loginLimiter, otpLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router
    .post("/register", handleRegister)
    .post("/login", loginLimiter, handleLogin)
    .get("/logout", handleLogout)
    .get("/me", checkAuth, getCurrentUser)
    .post("/forget-password", otpLimiter, handleForgetPassword)
    .post("/verify-otp", checkForgetPassToken, handleVerifyOtp)
    .put("/reset-password", checkForgetPassTokenNew, handleResetPassword);

export default router;

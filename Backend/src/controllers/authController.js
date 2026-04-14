import express from "express";
import UserModel from "../models/User.js";
import OtpModel from "../models/Otp.js";
import { otpGenerator } from "../utils/otpGenerator.js";
import { sendOTPEmail } from "../config/nodeMialer.js";
import { generateToken } from "../utils/jwtGenerator.js";
import { cookieOptions } from "../utils/cookieOptions.js"
import jwt from "jsonwebtoken";

async function handleRegister(req, res) {
  const { name, email, phone, password, address } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const user = await UserModel.create({
      name,
      email,
      phone,
      password,
      address,
    });



    const token = generateToken(user);
    res.cookie("access-token", token, cookieOptions);
    //cleanUp
    res.clearCookie("forget-password-token", cookieOptions);


    return res.status(200).json({
      message: "Registeration successfull",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Error occurred during registration:", err.message);
    return res
      .status(500)
      .json({ error: "Registration failed", details: err.message });
  }
}

async function handleLogin(req, res) {
  const { email, password } = req.body;

  try {
    // Find user by email first
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Email not found" });
    }
    // Check password
    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = generateToken(user);
    res.cookie("access-token", token, cookieOptions);
    //cleanUp
    res.clearCookie("forget-password-token", cookieOptions);


    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Error occurred during login:", err.message);
    return res
      .status(500)
      .json({ error: "Login failed", details: err.message });
  }
}

const handleLogout = async (req, res) => {
  try {


    res.clearCookie("access-token", cookieOptions);
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during logout" });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const handleForgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //previous otps delete to avoid congestion
    await OtpModel.deleteMany({ email });

    const otp = otpGenerator();
    const otpEntry = await OtpModel.create({
      email,
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    const token = jwt.sign({ email }, "forget-password-token-secret-key", { expiresIn: "10m" });
    res.cookie("forget-password-token", token, cookieOptions);

    await sendOTPEmail(email, otp);

    return res.status(200).json({
      message: "OTP sent successfully",
      expiry: otpEntry.expiresAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during forget password" });
  }
};

const handleVerifyOtp = async (req, res) => {
  const { otp } = req.body;
  const email = req.forgetPassUser.email;
  try {
    const otpEntry = await OtpModel.findOne({ $and: [{ email }, { otp }] });
    if (!otpEntry) {
      return res.status(404).json({ message: "OTP not found" });
    }
    if (otpEntry.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    await OtpModel.deleteMany({ email });
    res.clearCookie("forget-password-token", cookieOptions);

    const token = jwt.sign({ email }, "forget-password-token-secret-key", { expiresIn: "10m" });
    res.cookie("forget-password-token-new", token, cookieOptions);

    return res.status(200).json({
      message: "OTP verified successfully",
      otpEntry,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during OTP verification" });
  }
};

const handleResetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const email = req.forgetPassUserNew.email;



  if (!newPassword || (newPassword == undefined && newPassword == null && newPassword == "")) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    res.clearCookie("forget-password-token-new", cookieOptions);


    return res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during password reset" });
  }
};

export {
  handleLogin,
  handleRegister,
  getCurrentUser,
  handleLogout,
  handleForgetPassword,
  handleVerifyOtp,
  handleResetPassword
};

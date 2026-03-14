import express from "express";
import UserModel from "../models/User.js";
import { generateToken } from "../utils/jwtGenerator.js";

async function handleRegister(req, res) {
  const { name, email, phone, password, address } = req.body;
  try {
    const user = await UserModel.create({
      name,
      email,
      phone,
      password,
      address,
    });
    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (err) {
    console.error("Error occurred during registration:", err.message);
    return res
      .status(500)
      .json({ error: "Registration failed", details: err.message });
  }
}

async function handleLogin(req, res) {
  const { email, password } = req.body;
  console.log(req.body)

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
    res.cookie("access-token", token);

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

export { handleLogin, handleRegister };

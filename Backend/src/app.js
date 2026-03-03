import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//router routes
app.use("/api/auth",authRoutes)

app.get("/", (req, res) => {
  res.send("Hello");
});

export default app;
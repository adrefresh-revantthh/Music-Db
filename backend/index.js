import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import songRoutes from "./routes/songRoutes.js";

dotenv.config();

const app = express();
app.get("/test", (req, res) => {
  res.send("Backend working");
});

// ✅ CORS must be first
app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve uploaded files
app.use("/uploads", express.static("uploads"));

// ✅ Routes
app.use("/api", songRoutes);

// ✅ MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));

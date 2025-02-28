import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import { eventRoutes } from "./routes/eventRoutes";
import locationRoutes from "./routes/locationRoutes";
import internshipRequestRoutes from "./routes/internshipRequestRoutes";
import jobRequestRoutes from "./routes/jobRequestRoutes";

// Load environment variables
// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/internship-requests", internshipRequestRoutes);
app.use("/api/job-requests", jobRequestRoutes);
// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Swapnapurti Camping API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

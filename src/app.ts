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
import organizationRoutes from "./routes/organizationRoutes";
import { Request, Response, NextFunction } from "express";
import AppError from "./core/errors/app-error";
import { AuthMiddleware } from "./middleware/auth.middleware";

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

app.use(AuthMiddleware);
app.use("/api/user", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/internship-requests", internshipRequestRoutes);
app.use("/api/job-requests", jobRequestRoutes);
app.use("/api/organizations", organizationRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Swapnapurti Camping API" });
});

// Error handling middleware
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.log("Error", err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err?.message ?? "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

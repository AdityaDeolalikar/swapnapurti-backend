import express from "express";
import { getProfile } from "../controllers/userController";
import { protect } from "../middleware/auth";

const router = express.Router();

// Get user profile
//@ts-ignore
router.get("/profile", protect, getProfile);

export default router;

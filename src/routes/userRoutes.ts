import express from "express";
import { getProfile } from "../controllers/userController";

const router = express.Router();

// Get user profile
router.get("/profile", getProfile);

export default router;

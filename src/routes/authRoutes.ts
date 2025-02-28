import express from "express";
import {
  registerStep1,
  registerStep2,
  login,
  logout,
} from "../controllers/authController";
import { protect } from "../middleware/auth";

const router = express.Router();

// Registration Step 1 route
//@ts-ignore
router.post("/register/step1", registerStep1);

// Registration Step 2 route
//@ts-ignore
router.post("/register/step2/:userId", registerStep2);

// Login route
//@ts-ignore
router.post("/login", login);

// Logout route
//@ts-ignore
router.post("/logout", protect, logout);

export default router;

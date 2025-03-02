import express from "express";
import {
  registerStep1,
  registerStep2,
  login,
  logout,
} from "../controllers/authController";
import { AuthMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

// Registration Step 1 route

router.post("/register/step1", registerStep1);

// Registration Step 2 route
router.post("/register/step2/:userId", registerStep2);

// Login route
router.post("/login", login);

// Logout route
router.post("/logout", AuthMiddleware, logout);

export default router;

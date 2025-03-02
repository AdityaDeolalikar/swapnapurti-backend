import jwt from "jsonwebtoken";
import User from "../models/User";
import { AppRequestHandler } from "../common/types/request";
import AppError from "../core/errors/app-error";

export const AuthMiddleware: AppRequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AppError("Unauthorized", 401);
    }

    const token = authHeader.replace("Bearer ", "");

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    const user = await User.findOne({ _id: decoded["userId"] });
    if (!user) {
      throw new AppError("User not found", 404);
    }
    res.locals.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

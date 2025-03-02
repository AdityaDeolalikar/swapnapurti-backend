import jwt from "jsonwebtoken";
import User from "../models/User";
import { AppRequestHandler } from "../common/types/request";
import AppError from "../core/errors/app-error";

export const AuthMiddleware: AppRequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Unauthorized", 401);
    }

    const token = authHeader.split(" ")[1];

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "");

      //@ts-ignore
      res.locals.user = decoded as InstanceType<typeof User>;
      next();
    } catch (err) {
      throw new AppError("Token is invalid or expired", 401);
    }
  } catch (error) {
    next(error);
  }
};

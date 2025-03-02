import User from "../models/User";
import { AppRequestHandler } from "../common/types/request";
import AppError from "../core/errors/app-error";

export const getProfile: AppRequestHandler<
  unknown,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.user._id).select("-password");

    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

import AppError from "../core/errors/app-error";
import { TRoles } from "../constants/roles";
import { AppRequestHandler } from "../common/types/request";

const RequiredRoles: (
  allowedRoles: TRoles[]
) => AppRequestHandler<unknown, unknown, unknown, unknown> = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = res.locals.user.role;

    if (!allowedRoles.includes(userRole)) {
      throw new AppError("You are not authorized to access this resource", 403);
    }
    next();
  };
};

export default RequiredRoles;

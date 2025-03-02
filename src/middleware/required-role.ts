import AppError from "../core/errors/app-error";
import { roles } from "../constants/roles";
import { AppRequestHandler } from "../common/types/request";

const RequiredRoles: (
  allowedRoles: roles[]
) => AppRequestHandler<unknown, unknown, unknown, unknown> = (allowedRoles) => {
  return (req, res, next) => {
    //@ts-ignore
    const userRole = res.locals.user.role;

    if (!allowedRoles.includes(userRole)) {
      throw new AppError("Forbidden", 403);
    }
    next();
  };
};

export default RequiredRoles;

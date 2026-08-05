import type { Request, Response, NextFunction } from "express";
import AppError from "../utils/app-error.js";


export const authorizeRole = (
  ...allowedRoles: string[]
) => {

  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      if (!req.user) {
        throw new AppError(
          401,
          "Authentication required"
        );
      }


      if (!allowedRoles.includes(req.user.role)) {
        throw new AppError(
          403,
          "You do not have permission to access this resource"
        );
      }


      next();

    } catch (error) {
      next(error);
    }

  };
};
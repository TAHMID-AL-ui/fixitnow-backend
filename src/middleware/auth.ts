import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../utils/app-error.js";


interface JwtPayload {
  id: string;
  email: string;
  role: string;
}


export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;


    if (!authHeader) {
      throw new AppError(
        401,
        "Authentication token is required"
      );
    }


    const token = authHeader.split(" ")[1];


    if (!token) {
      throw new AppError(
        401,
        "Invalid authentication token"
      );
    }


    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;


    req.user = decoded;


    next();

  } catch (error) {
    next(error);
  }
};
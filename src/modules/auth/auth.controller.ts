import type { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "./auth.service.js";
import {
  registerValidation,
  loginValidation,
} from "./auth.validation.js";
import { sendResponse } from "../../utils/send-response.js";


export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = registerValidation.parse(req.body);

    const result = await registerUser(validatedData);

    sendResponse(res, 201, {
      success: true,
      message: "User registered successfully",
      data: result,
    });

  } catch (error) {
    next(error);
  }
};



export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = loginValidation.parse(req.body);

    const result = await loginUser(validatedData);

    sendResponse(res, 200, {
      success: true,
      message: "Login successful",
      data: result,
    });

  } catch (error) {
    next(error);
  }
};
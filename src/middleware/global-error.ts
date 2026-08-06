import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";


const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {


  let statusCode = err.statusCode || 500;

  let message =
    err.message || "Something went wrong";

  let errorDetails = {};



  // Zod validation errors
  if (err instanceof ZodError) {

    statusCode = 400;

    message = "Validation failed";

    errorDetails = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

  }



  // Development error details
  if (statusCode === 500) {

    errorDetails =
      process.env.NODE_ENV === "development"
        ? err
        : {};

  }



  res.status(statusCode).json({

    success: false,

    message,

    errorDetails,

  });

};


export default globalErrorHandler;
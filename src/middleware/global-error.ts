import type { Request, Response, NextFunction } from "express";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong",
    errorDetails: err.errorDetails || {},
  });

};

export default globalErrorHandler;
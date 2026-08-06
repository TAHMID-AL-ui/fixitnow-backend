import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";


const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {


  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";
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



  // Prisma known database errors
  if (
    err instanceof Prisma.PrismaClientKnownRequestError
  ) {


    switch (err.code) {


      // Unique constraint violation
      case "P2002":

        statusCode = 409;

        message =
          "Duplicate record already exists";

        break;



      // Record not found
      case "P2025":

        statusCode = 404;

        message =
          "Requested record not found";

        break;



      default:

        statusCode = 500;

        message =
          "Database operation failed";

    }

  }



  // Hide internal errors in production
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
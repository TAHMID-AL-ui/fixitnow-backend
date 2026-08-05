import type { Response } from "express";

interface ResponseData {
  success: boolean;
  message: string;
  data?: unknown;
}

export const sendResponse = (
  res: Response,
  statusCode: number,
  responseData: ResponseData
) => {
  res.status(statusCode).json(responseData);
};
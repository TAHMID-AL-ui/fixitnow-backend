import type { Request, Response, NextFunction } from "express";

import {
  createPayment,
  getPaymentByBooking,
  getPaymentHistory,
  getPaymentDetails,
  updatePaymentStatus,
} from "./payment.service.js";

import {
  createPaymentValidation,
  updatePaymentStatusValidation,
} from "./payment.validation.js";

import { sendResponse } from "../../utils/send-response.js";



export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const validatedData =
      createPaymentValidation.parse(req.body);



    const result =
      await createPayment(
        req.user!.id,
        validatedData
      );



    sendResponse(res, 201, {

      success: true,

      message: "Payment initialized successfully",

      data: result,

    });



  } catch (error) {

    next(error);

  }

};







export const getByBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await getPaymentByBooking(
        req.params.bookingId as string
      );



    sendResponse(res, 200, {

      success: true,

      message: "Payment retrieved successfully",

      data: result,

    });



  } catch (error) {

    next(error);

  }

};







export const history = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await getPaymentHistory(
        req.user!.id
      );



    sendResponse(res, 200, {

      success: true,

      message: "Payment history retrieved successfully",

      data: result,

    });



  } catch (error) {

    next(error);

  }

};







export const details = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await getPaymentDetails(
        req.params.id as string
      );



    sendResponse(res, 200, {

      success: true,

      message: "Payment details retrieved successfully",

      data: result,

    });



  } catch (error) {

    next(error);

  }

};







export const updateStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const validatedData =
      updatePaymentStatusValidation.parse(
        req.body
      );



    const result =
      await updatePaymentStatus(

        req.params.bookingId as string,

        validatedData.status

      );



    sendResponse(res, 200, {

      success: true,

      message: "Payment status updated successfully",

      data: result,

    });



  } catch (error) {

    next(error);

  }

};
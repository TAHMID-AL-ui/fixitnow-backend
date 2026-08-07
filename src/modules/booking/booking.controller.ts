import type { Request, Response, NextFunction } from "express";

import {
  createBooking,
  getCustomerBookings,
  getTechnicianBookings,
  getBookingDetails,
  updateBookingStatus,
  cancelBooking,
} from "./booking.service.js";

import {
  createBookingValidation,
  updateBookingStatusValidation,
} from "./booking.validation.js";

import { sendResponse } from "../../utils/send-response.js";
import prisma from "../../lib/prisma.js";
import AppError from "../../utils/app-error.js";



export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const validatedData =
      createBookingValidation.parse(req.body);



    const result =
      await createBooking(
        req.user!.id,
        validatedData
      );



    sendResponse(res, 201, {

      success: true,

      message: "Booking created successfully",

      data: result,

    });



  } catch (error) {

    next(error);

  }

};







export const myBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await getCustomerBookings(
        req.user!.id
      );



    sendResponse(res, 200, {

      success: true,

      message: "Bookings retrieved successfully",

      data: result,

    });



  } catch (error) {

    next(error);

  }

};







export const bookingDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await getBookingDetails(
        req.params.id as string
      );



    sendResponse(res, 200, {

      success: true,

      message: "Booking details retrieved successfully",

      data: result,

    });



  } catch (error) {

    next(error);

  }

};







export const technicianBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const technician =
      await prisma.technicianProfile.findUnique({

        where: {

          userId: req.user!.id,

        },

      });



    if (!technician) {

      throw new AppError(

        404,

        "Technician profile not found"

      );

    }



    const result =
      await getTechnicianBookings(
        technician.id
      );



    sendResponse(res, 200, {

      success: true,

      message: "Technician bookings retrieved successfully",

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
      updateBookingStatusValidation.parse(req.body);



    const technician =
      await prisma.technicianProfile.findUnique({

        where: {

          userId: req.user!.id,

        },

      });



    if (!technician) {

      throw new AppError(

        404,

        "Technician profile not found"

      );

    }



    const result =
      await updateBookingStatus(

        req.params.id as string,

        technician.id,

        validatedData.status

      );



    sendResponse(res, 200, {

      success: true,

      message: "Booking status updated successfully",

      data: result,

    });



  } catch (error) {

    next(error);

  }

};







export const cancel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await cancelBooking(

        req.params.id as string,

        req.user!.id

      );



    sendResponse(res, 200, {

      success: true,

      message: "Booking cancelled successfully",

      data: result,

    });



  } catch (error) {

    next(error);

  }

};
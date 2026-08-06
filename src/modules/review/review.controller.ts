import type { Request, Response, NextFunction } from "express";

import {
  createReview,
  getTechnicianReviews,
} from "./review.service.js";

import {
  createReviewValidation,
} from "./review.validation.js";

import { sendResponse } from "../../utils/send-response.js";






export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const validatedData =
      createReviewValidation.parse(req.body);



    const result =
      await createReview(

        req.user!.id,

        validatedData

      );



    sendResponse(res, 201, {

      success: true,

      message: "Review created successfully",

      data: result,

    });



  } catch (error) {

    next(error);

  }

};









export const getByTechnician = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {


    const result =
      await getTechnicianReviews(

        req.params.technicianId as string

      );



    sendResponse(res, 200, {

      success: true,

      message: "Technician reviews retrieved successfully",

      data: result,

    });



  } catch (error) {

    next(error);

  }

};
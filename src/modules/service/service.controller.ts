import type { Request, Response, NextFunction } from "express";

import {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
} from "./service.service.js";

import {
  createServiceValidation,
  updateServiceValidation,
} from "./service.validation.js";

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
      createServiceValidation.parse(req.body);



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
      await createService(
        technician.id,
        validatedData
      );



    sendResponse(res, 201, {

      success: true,

      message: "Service created successfully",

      data: result,

    });



  } catch (error) {

    next(error);

  }

};








export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await getAllServices();



    sendResponse(res, 200, {

      success: true,

      message: "Services retrieved successfully",

      data: result,

    });



  } catch (error) {

    next(error);

  }

};








export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await getSingleService(

        req.params.id as string

      );



    sendResponse(res, 200, {

      success: true,

      message: "Service retrieved successfully",

      data: result,

    });



  } catch (error) {

    next(error);

  }

};








export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const validatedData =
      updateServiceValidation.parse(req.body);



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



    const updateData = {

      ...(validatedData.title && {
        title: validatedData.title,
      }),

      ...(validatedData.description && {
        description: validatedData.description,
      }),

      ...(validatedData.price !== undefined && {
        price: validatedData.price,
      }),

      ...(validatedData.categoryId && {
        categoryId: validatedData.categoryId,
      }),

    };



    const result =
      await updateService(

        req.params.id as string,

        technician.id,

        updateData

      );



    sendResponse(res, 200, {

      success: true,

      message: "Service updated successfully",

      data: result,

    });



  } catch (error) {

    next(error);

  }

};








export const remove = async (
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



    await deleteService(

      req.params.id as string,

      technician.id

    );



    sendResponse(res, 200, {

      success: true,

      message: "Service deleted successfully",

      data: null,

    });



  } catch (error) {

    next(error);

  }

};
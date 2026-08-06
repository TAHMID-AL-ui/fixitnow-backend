import type { Request, Response, NextFunction } from "express";

import {
  createTechnicianProfile,
  getMyTechnicianProfile,
  updateTechnicianProfile,
  getAllTechnicians,
} from "./technician.service.js";

import {
  createTechnicianValidation,
  updateTechnicianValidation,
} from "./technician.validation.js";

import { sendResponse } from "../../utils/send-response.js";



export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const validatedData =
      createTechnicianValidation.parse(req.body);



    const result =
      await createTechnicianProfile(

        req.user!.id,

        validatedData

      );



    sendResponse(res, 201, {

      success: true,

      message: "Technician profile created successfully",

      data: result,

    });



  } catch (error) {

    next(error);

  }

};








export const myProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await getMyTechnicianProfile(

        req.user!.id

      );



    sendResponse(res, 200, {

      success: true,

      message: "Technician profile retrieved successfully",

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
      updateTechnicianValidation.parse(req.body);



    const updateData = {

      ...(validatedData.skills && {

        skills: validatedData.skills,

      }),


      ...(validatedData.experience && {

        experience: validatedData.experience,

      }),


      ...(validatedData.location && {

        location: validatedData.location,

      }),


      ...(validatedData.hourlyRate !== undefined && {

        hourlyRate: validatedData.hourlyRate,

      }),

    };



    const result =
      await updateTechnicianProfile(

        req.user!.id,

        updateData

      );



    sendResponse(res, 200, {

      success: true,

      message: "Technician profile updated successfully",

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
      await getAllTechnicians();



    sendResponse(res, 200, {

      success: true,

      message: "Technicians retrieved successfully",

      data: result,

    });



  } catch (error) {

    next(error);

  }

};
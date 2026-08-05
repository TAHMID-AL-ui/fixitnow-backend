import type { Request, Response, NextFunction } from "express";
import {
  getMyProfile,
  updateMyProfile,
  getAllUsers,
  updateUserStatus,
} from "./user.service.js";
import {
  updateProfileValidation,
  updateUserStatusValidation,
} from "./user.validation.js";
import { sendResponse } from "../../utils/send-response.js";



export const myProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const result = await getMyProfile(
      req.user!.id
    );

    sendResponse(res, 200, {
      success: true,
      message: "Profile retrieved successfully",
      data: result,
    });

  } catch (error) {
    next(error);
  }
};



export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const validatedData =
      updateProfileValidation.parse(req.body);


    const result = await updateMyProfile(
      req.user!.id,
      validatedData
    );


    sendResponse(res, 200, {
      success: true,
      message: "Profile updated successfully",
      data: result,
    });

  } catch (error) {
    next(error);
  }
};



export const allUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const result = await getAllUsers();


    sendResponse(res, 200, {
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });

  } catch (error) {
    next(error);
  }
};



export const changeUserStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const validatedData =
      updateUserStatusValidation.parse(req.body);


    const result = await updateUserStatus(
      req.params.id,
      validatedData.status
    );


    sendResponse(res, 200, {
      success: true,
      message: "User status updated successfully",
      data: result,
    });

  } catch (error) {
    next(error);
  }
};
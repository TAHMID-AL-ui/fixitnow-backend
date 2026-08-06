import type { Request, Response, NextFunction } from "express";

import {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} from "./category.service.js";

import {
  createCategoryValidation,
  updateCategoryValidation,
} from "./category.validation.js";

import { sendResponse } from "../../utils/send-response.js";



export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const validatedData =
      createCategoryValidation.parse(req.body);



    const result =
      await createCategory({

        name: validatedData.name,

        ...(validatedData.description && {
          description: validatedData.description,
        }),

      });



    sendResponse(res, 201, {

      success: true,

      message: "Category created successfully",

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
      await getAllCategories();



    sendResponse(res, 200, {

      success: true,

      message: "Categories retrieved successfully",

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
      await getSingleCategory(

        req.params.id as string

      );



    sendResponse(res, 200, {

      success: true,

      message: "Category retrieved successfully",

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
      updateCategoryValidation.parse(req.body);



    const result =
      await updateCategory(

        req.params.id as string,

        {

          ...(validatedData.name && {
            name: validatedData.name,
          }),

          ...(validatedData.description && {
            description: validatedData.description,
          }),

        }

      );



    sendResponse(res, 200, {

      success: true,

      message: "Category updated successfully",

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


    await deleteCategory(

      req.params.id as string

    );



    sendResponse(res, 200, {

      success: true,

      message: "Category deleted successfully",

      data: null,

    });



  } catch (error) {

    next(error);

  }

};
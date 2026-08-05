import prisma from "../../lib/prisma.js";
import AppError from "../../utils/app-error.js";


export const createCategory = async (
  data: {
    name: string;
    description?: string;
  }
) => {

  const existingCategory = await prisma.category.findUnique({
    where: {
      name: data.name,
    },
  });


  if (existingCategory) {
    throw new AppError(
      409,
      "Category already exists"
    );
  }


  const category = await prisma.category.create({
    data,
  });


  return category;
};



export const getAllCategories = async () => {

  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });


  return categories;
};



export const getSingleCategory = async (
  id: string
) => {

  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });


  if (!category) {
    throw new AppError(
      404,
      "Category not found"
    );
  }


  return category;
};



export const updateCategory = async (
  id: string,
  data: {
    name?: string;
    description?: string;
  }
) => {

  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });


  if (!category) {
    throw new AppError(
      404,
      "Category not found"
    );
  }


  const updatedCategory = await prisma.category.update({
    where: {
      id,
    },
    data,
  });


  return updatedCategory;
};



export const deleteCategory = async (
  id: string
) => {

  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });


  if (!category) {
    throw new AppError(
      404,
      "Category not found"
    );
  }


  await prisma.category.delete({
    where: {
      id,
    },
  });


  return null;
};
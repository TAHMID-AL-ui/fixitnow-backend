import prisma from "../../lib/prisma.js";
import AppError from "../../utils/app-error.js";



export const createService = async (
  technicianId: string,
  data: {
    title: string;
    description: string;
    price: number;
    categoryId: string;
  }
) => {

  const category = await prisma.category.findUnique({
    where: {
      id: data.categoryId,
    },
  });


  if (!category) {
    throw new AppError(
      404,
      "Category not found"
    );
  }


  const service = await prisma.service.create({
    data: {
      ...data,
      technicianId,
    },
    include: {
      category: true,
    },
  });


  return service;
};





export const getAllServices = async () => {

  const services = await prisma.service.findMany({
    include: {
      category: true,

      technician: {
        select: {
          id: true,
          skills: true,
          experience: true,
          location: true,
          hourlyRate: true,

          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });


  return services;
};





export const getSingleService = async (
  id: string
) => {

  const service = await prisma.service.findUnique({
    where: {
      id,
    },

    include: {
      category: true,

      technician: {
        select: {
          id: true,
          skills: true,
          experience: true,
          location: true,
          hourlyRate: true,

          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });


  if (!service) {
    throw new AppError(
      404,
      "Service not found"
    );
  }


  return service;
};





export const updateService = async (
  id: string,
  technicianId: string,
  data: {
    title?: string;
    description?: string;
    price?: number;
    categoryId?: string;
  }
) => {


  const service = await prisma.service.findUnique({
    where: {
      id,
    },
  });


  if (!service) {
    throw new AppError(
      404,
      "Service not found"
    );
  }


  if (service.technicianId !== technicianId) {
    throw new AppError(
      403,
      "You can only update your own services"
    );
  }


  const updatedService = await prisma.service.update({
    where: {
      id,
    },

    data,

    include: {
      category: true,
    },
  });


  return updatedService;
};





export const deleteService = async (
  id: string,
  technicianId: string
) => {

  const service = await prisma.service.findUnique({
    where: {
      id,
    },
  });


  if (!service) {
    throw new AppError(
      404,
      "Service not found"
    );
  }


  if (service.technicianId !== technicianId) {
    throw new AppError(
      403,
      "You can only delete your own services"
    );
  }


  await prisma.service.delete({
    where: {
      id,
    },
  });


  return null;
};
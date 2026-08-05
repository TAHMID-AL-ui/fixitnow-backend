import prisma from "../../lib/prisma.js";
import AppError from "../../utils/app-error.js";


export const getMyProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });


  if (!user) {
    throw new AppError(
      404,
      "User not found"
    );
  }


  return user;
};



export const updateMyProfile = async (
  userId: string,
  data: {
    name?: string;
    email?: string;
  }
) => {

  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });


  if (!existingUser) {
    throw new AppError(
      404,
      "User not found"
    );
  }


  if (data.email) {
    const emailExists = await prisma.user.findFirst({
      where: {
        email: data.email,
        NOT: {
          id: userId,
        },
      },
    });


    if (emailExists) {
      throw new AppError(
        409,
        "Email already in use"
      );
    }
  }


  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });


  return updatedUser;
};



export const getAllUsers = async () => {

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });


  return users;
};



export const updateUserStatus = async (
  userId: string,
  status: "ACTIVE" | "BANNED"
) => {

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });


  if (!user) {
    throw new AppError(
      404,
      "User not found"
    );
  }


  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });


  return updatedUser;
};
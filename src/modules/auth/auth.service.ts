import bcrypt from "bcryptjs";
import prisma from "../../lib/prisma.js";
import AppError from "../../utils/app-error.js";
import { createToken } from "../../utils/jwt.js";
import type {
  RegisterInput,
  LoginInput,
} from "./auth.validation.js";



export const registerUser = async (
  data: RegisterInput
) => {


  const existingUser =
    await prisma.user.findUnique({

      where: {
        email: data.email,
      },

    });



  if (existingUser) {

    throw new AppError(
      409,
      "User already exists with this email"
    );

  }



  const hashedPassword =
    await bcrypt.hash(
      data.password,
      12
    );



  const user =
    await prisma.user.create({

      data: {

        name: data.name,

        email: data.email,

        password: hashedPassword,

        role: data.role || "CUSTOMER",

      },


      select: {

        id: true,

        name: true,

        email: true,

        role: true,

        status: true,

      },

    });



  const token =
    createToken({

      id: user.id,

      email: user.email,

      role: user.role,

    });



  return {

    user,

    token,

  };

};








export const loginUser = async (
  data: LoginInput
) => {


  const user =
    await prisma.user.findUnique({

      where: {

        email: data.email,

      },

    });



  if (!user) {

    throw new AppError(
      401,
      "Invalid email or password"
    );

  }





  const passwordMatched =
    await bcrypt.compare(

      data.password,

      user.password

    );



  if (!passwordMatched) {

    throw new AppError(
      401,
      "Invalid email or password"
    );

  }





  const token =
    createToken({

      id: user.id,

      email: user.email,

      role: user.role,

    });



  return {

    user: {

      id: user.id,

      name: user.name,

      email: user.email,

      role: user.role,

      status: user.status,

    },


    token,

  };

};
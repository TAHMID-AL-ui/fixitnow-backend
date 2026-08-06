import prisma from "../../lib/prisma.js";
import AppError from "../../utils/app-error.js";



export const createTechnicianProfile = async (
  userId: string,
  data: {
    skills: string;
    experience: string;
    location: string;
    hourlyRate: number;
  }
) => {

  const existingProfile =
    await prisma.technicianProfile.findUnique({
      where: {
        userId,
      },
    });



  if (existingProfile) {
    throw new AppError(
      409,
      "Technician profile already exists"
    );
  }



  const profile =
    await prisma.technicianProfile.create({

      data: {

        userId,

        ...data,

      },


      include: {

        user: {

          select: {

            id: true,
            name: true,
            email: true,
            role: true,

          },

        },

      },

    });



  return profile;
};







export const getMyTechnicianProfile = async (
  userId: string
) => {


  const profile =
    await prisma.technicianProfile.findUnique({

      where: {

        userId,

      },


      include: {

        user: {

          select: {

            id: true,
            name: true,
            email: true,
            role: true,

          },

        },

      },

    });



  if (!profile) {

    throw new AppError(
      404,
      "Technician profile not found"
    );

  }



  return profile;
};








export const updateTechnicianProfile = async (
  userId: string,
  data: {
    skills?: string;
    experience?: string;
    location?: string;
    hourlyRate?: number;
  }
) => {


  const profile =
    await prisma.technicianProfile.findUnique({

      where: {

        userId,

      },

    });



  if (!profile) {

    throw new AppError(
      404,
      "Technician profile not found"
    );

  }



  const updatedProfile =
    await prisma.technicianProfile.update({

      where: {

        userId,

      },


      data,


      include: {

        user: {

          select: {

            id: true,
            name: true,
            email: true,
            role: true,

          },

        },

      },

    });



  return updatedProfile;
};








export const getAllTechnicians = async () => {


  const technicians =
    await prisma.technicianProfile.findMany({

      include: {

        user: {

          select: {

            id: true,
            name: true,
            email: true,

          },

        },

      },


      orderBy: {

        createdAt: "desc",

      },

    });



  return technicians;
};
import prisma from "../../lib/prisma.js";
import AppError from "../../utils/app-error.js";



export const createReview = async (
  customerId: string,
  data: {
    bookingId: string;
    rating: number;
    comment: string;
  }
) => {


  const booking =
    await prisma.booking.findUnique({
      where: {
        id: data.bookingId,
      },

      include: {
        review: true,
      },
    });



  if (!booking) {
    throw new AppError(
      404,
      "Booking not found"
    );
  }



  if (booking.customerId !== customerId) {
    throw new AppError(
      403,
      "You can only review your own bookings"
    );
  }



  if (booking.status !== "COMPLETED") {
    throw new AppError(
      400,
      "You can only review completed bookings"
    );
  }



  if (booking.review) {
    throw new AppError(
      409,
      "Review already exists for this booking"
    );
  }



  const review =
    await prisma.review.create({

      data: {

        customerId,

        bookingId:
          data.bookingId,

        rating:
          data.rating,

        comment:
          data.comment,

      },


      include: {

        booking: {

          include: {

            service: true,

            technician: {

              include: {

                user: {

                  select: {

                    name: true,
                    email: true,

                  },

                },

              },

            },

          },

        },

      },

    });


  return review;
};







export const getTechnicianReviews = async (
  technicianId: string
) => {


  const reviews =
    await prisma.review.findMany({

      where: {

        booking: {

          technicianId,

        },

      },


      include: {

        customer: {

          select: {

            name: true,
            email: true,

          },

        },


        booking: {

          include: {

            service: true,

          },

        },

      },


      orderBy: {

        createdAt: "desc",

      },

    });



  return reviews;
};
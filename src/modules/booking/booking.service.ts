import prisma from "../../lib/prisma.js";
import AppError from "../../utils/app-error.js";


// Create Booking

export const createBooking = async (
  customerId: string,
  data: {
    serviceId: string;
    bookingDate: string;
    address: string;
  }
) => {

  const service =
    await prisma.service.findUnique({

      where: {
        id: data.serviceId,
      },

    });


  if (!service) {

    throw new AppError(
      404,
      "Service not found"
    );

  }



  const booking =
    await prisma.booking.create({

      data: {

        customerId,

        technicianId:
          service.technicianId,

        serviceId:
          data.serviceId,

        bookingDate:
          new Date(data.bookingDate),

        address:
          data.address,

      },


      include: {

        service: true,

        technician: {

          include: {

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



  return booking;

};




// Customer bookings

export const getCustomerBookings = async (
  customerId: string
) => {


  const bookings =
    await prisma.booking.findMany({

      where: {

        customerId,

      },


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


      orderBy: {

        createdAt: "desc",

      },

    });



  return bookings;

};




// NEW: Booking Details

export const getBookingDetails = async (
  bookingId: string
) => {


  const booking =
    await prisma.booking.findUnique({

      where: {

        id: bookingId,

      },


      include: {

        service: true,


        customer: {

          select: {

            id: true,
            name: true,
            email: true,

          },

        },


        technician: {

          include: {

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



  if (!booking) {

    throw new AppError(
      404,
      "Booking not found"
    );

  }



  return booking;

};




// Technician bookings

export const getTechnicianBookings = async (
  technicianId: string
) => {


  const bookings =
    await prisma.booking.findMany({

      where: {

        technicianId,

      },


      include: {

        service: true,


        customer: {

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



  return bookings;

};




// Update Booking Status

export const updateBookingStatus = async (
  bookingId: string,
  technicianId: string,
  status:
    | "ACCEPTED"
    | "DECLINED"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "CANCELLED"
) => {


  const booking =
    await prisma.booking.findUnique({

      where: {

        id: bookingId,

      },

    });



  if (!booking) {

    throw new AppError(
      404,
      "Booking not found"
    );

  }



  if (booking.technicianId !== technicianId) {

    throw new AppError(
      403,
      "You cannot update this booking"
    );

  }



  if (
    booking.status === "COMPLETED" ||
    booking.status === "CANCELLED"
  ) {

    throw new AppError(
      400,
      "Cannot update a completed or cancelled booking"
    );

  }



  const updatedBooking =
    await prisma.booking.update({

      where: {

        id: bookingId,

      },


      data: {

        status,

      },


      include: {

        service: true,


        customer: {

          select: {

            name: true,
            email: true,

          },

        },

      },

    });



  return updatedBooking;

};




// Cancel Booking

export const cancelBooking = async (
  bookingId: string,
  customerId: string
) => {


  const booking =
    await prisma.booking.findUnique({

      where: {

        id: bookingId,

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
      "You cannot cancel this booking"
    );

  }



  if (
    booking.status === "IN_PROGRESS" ||
    booking.status === "COMPLETED"
  ) {

    throw new AppError(
      400,
      "Cannot cancel booking after work has started"
    );

  }



  const updatedBooking =
    await prisma.booking.update({

      where: {

        id: bookingId,

      },


      data: {

        status: "CANCELLED",

      },

    });



  return updatedBooking;

};
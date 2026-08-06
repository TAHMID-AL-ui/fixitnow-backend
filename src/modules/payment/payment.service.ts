import prisma from "../../lib/prisma.js";
import AppError from "../../utils/app-error.js";



export const createPayment = async (
  customerId: string,
  data: {
    bookingId: string;
    amount: number;
  }
) => {


  const booking =
    await prisma.booking.findUnique({
      where: {
        id: data.bookingId,
      },

      include: {
        customer: true,
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
      "You cannot create payment for this booking"
    );
  }



  if (booking.status !== "COMPLETED") {
    throw new AppError(
      400,
      "Payment can only be created after booking completion"
    );
  }



  const existingPayment =
    await prisma.payment.findUnique({
      where: {
        bookingId: data.bookingId,
      },
    });



  if (existingPayment) {
    throw new AppError(
      409,
      "Payment already exists for this booking"
    );
  }



  const payment =
    await prisma.payment.create({

      data: {

        bookingId:
          data.bookingId,

        amount:
          data.amount,

        transactionId:
          `TXN-${Date.now()}`,

        provider:
          "STRIPE",

      },

    });


  return payment;
};







export const getPaymentByBooking = async (
  bookingId: string
) => {


  const payment =
    await prisma.payment.findUnique({
      where: {
        bookingId,
      },

      include: {
        booking: {
          include: {
            service: true,
          },
        },
      },

    });



  if (!payment) {
    throw new AppError(
      404,
      "Payment not found"
    );
  }


  return payment;
};







export const updatePaymentStatus = async (
  bookingId: string,
  status:
    | "COMPLETED"
    | "FAILED"
) => {


  const payment =
    await prisma.payment.findUnique({
      where: {
        bookingId,
      },
    });



  if (!payment) {
    throw new AppError(
      404,
      "Payment not found"
    );
  }



  const updatedPayment =
    await prisma.payment.update({

      where: {
        bookingId,
      },


      data: {

        status,

        paidAt:
          status === "COMPLETED"
            ? new Date()
            : null,

      },

    });



  return updatedPayment;
};
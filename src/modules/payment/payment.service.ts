import prisma from "../../lib/prisma.js";
import AppError from "../../utils/app-error.js";
import stripe from "../../lib/stripe.js";



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



  const paymentIntent =
    await stripe.paymentIntents.create({

      amount:
        Math.round(data.amount * 100),

      currency:
        "usd",

      metadata: {

        bookingId:
          data.bookingId,

        customerId,

      },

    });



  const payment =
    await prisma.payment.create({

      data: {

        bookingId:
          data.bookingId,

        amount:
          data.amount,

        transactionId:
          paymentIntent.id,

        provider:
          "STRIPE",

      },

    });



  return {

    payment,

    paymentIntentId:
      paymentIntent.id,

    clientSecret:
      paymentIntent.client_secret,

  };

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





// NEW: Payment History

export const getPaymentHistory = async (
  customerId: string
) => {


  const payments =
    await prisma.payment.findMany({

      where: {

        booking: {

          customerId,

        },

      },


      include: {

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



  return payments;

};





// NEW: Payment Details by Payment ID

export const getPaymentDetails = async (
  paymentId: string
) => {


  const payment =
    await prisma.payment.findUnique({

      where: {

        id: paymentId,

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
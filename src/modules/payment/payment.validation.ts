import { z } from "zod";



export const createPaymentValidation = z.object({

  bookingId: z
    .string()
    .uuid("Invalid booking id"),


  amount: z
    .number()
    .positive("Amount must be greater than 0"),

});




export const updatePaymentStatusValidation = z.object({

  status: z.enum([
    "COMPLETED",
    "FAILED",
  ]),

});
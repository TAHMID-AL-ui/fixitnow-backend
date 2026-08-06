import { z } from "zod";


export const createBookingValidation = z.object({

  serviceId: z
    .string()
    .uuid("Invalid service id"),


  bookingDate: z
    .string()
    .datetime("Invalid booking date"),


  address: z
    .string()
    .min(5, "Address must be at least 5 characters"),

});



export const updateBookingStatusValidation = z.object({

  status: z.enum([
    "ACCEPTED",
    "DECLINED",
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELLED",
  ]),

});
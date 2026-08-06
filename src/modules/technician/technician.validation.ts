import { z } from "zod";


export const createTechnicianValidation = z.object({

  skills: z
    .string()
    .min(2, "Skills are required"),


  experience: z
    .string()
    .min(1, "Experience is required"),


  location: z
    .string()
    .min(2, "Location is required"),


  hourlyRate: z
    .number()
    .positive("Hourly rate must be greater than 0"),

});



export const updateTechnicianValidation = z.object({

  skills: z
    .string()
    .min(2, "Skills must be at least 2 characters")
    .optional(),


  experience: z
    .string()
    .min(1, "Experience is required")
    .optional(),


  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .optional(),


  hourlyRate: z
    .number()
    .positive("Hourly rate must be greater than 0")
    .optional(),

});
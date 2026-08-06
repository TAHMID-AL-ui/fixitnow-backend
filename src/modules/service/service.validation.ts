import { z } from "zod";


export const createServiceValidation = z.object({
  title: z
    .string()
    .min(2, "Service title must be at least 2 characters"),


  description: z
    .string()
    .min(5, "Description must be at least 5 characters"),


  price: z
    .number()
    .positive("Price must be greater than 0"),


  categoryId: z
    .string()
    .uuid("Invalid category id"),
});



export const updateServiceValidation = z.object({

  title: z
    .string()
    .min(2)
    .optional(),


  description: z
    .string()
    .min(5)
    .optional(),


  price: z
    .number()
    .positive()
    .optional(),


  categoryId: z
    .string()
    .uuid()
    .optional(),

});
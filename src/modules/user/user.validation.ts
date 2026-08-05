import { z } from "zod";


export const updateProfileValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .optional(),

  email: z
    .string()
    .email("Invalid email address")
    .optional(),
});


export const updateUserStatusValidation = z.object({
  status: z.enum([
    "ACTIVE",
    "BANNED",
  ]),
});
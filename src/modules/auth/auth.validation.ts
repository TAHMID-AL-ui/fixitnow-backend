import { z } from "zod";

export const registerValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  role: z
    .enum([
      "CUSTOMER",
      "TECHNICIAN",
      "ADMIN",
    ])
    .optional(),
});


export const loginValidation = z.object({
  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});
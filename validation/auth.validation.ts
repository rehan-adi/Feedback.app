import { z } from "zod";

export const signupValidation = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be less than 20 characters" })
    .trim()
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Username cannot contain special characters",
    }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/.+/, { message: "Password cannot be empty" }),
});

export const verifyEmailValidation = z.object({
  verifyCode: z
    .string()
    .min(6, { message: "Verification code must be at least 6 characters" }),
});

export const signinValidation = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/.+/, { message: "Password cannot be empty" }),
});

export const changePasswordValidation = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/.+/, { message: "Password cannot be empty" }),
});

import { z } from "zod";

export const messageValidation = z.object({
  content: z
    .string()
    .trim()
    .max(300, { message: "Content cannot exceed 300 characters" }),
});

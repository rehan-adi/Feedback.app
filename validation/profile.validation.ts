import { z } from "zod";

export const profileValidation = z.object({
  username: z.string().min(2).max(10),
  email: z.string().email(),
  isVerified: z.boolean(),
});

export const updateProfileValidation = z.object({
  username: z.string().min(2).max(10),
});

export type profileData = z.infer<typeof profileValidation>;

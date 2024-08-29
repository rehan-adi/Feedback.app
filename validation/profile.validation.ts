import { z } from "zod";

export const profileValidation = z.object({
  username: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
});

export type profileData = z.infer<typeof profileValidation>;

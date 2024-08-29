import { z } from "zod";

export const profileSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
});

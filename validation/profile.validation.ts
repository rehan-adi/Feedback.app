import { z } from "zod";

export const profileValidation = z.object({
  username: z
  .string()
  .min(2, { message: "Username must be at least 2 characters." })
  .max(30, { message: "Username cannot exceed 30 characters." }),
  email: z.string().email(),
  isVerified: z.boolean(),
  githubLink: z
  .string()
  .url({ message: "Must be a valid GitHub URL." })
  .startsWith("https://github.com/", {
    message: "GitHub link must start with 'https://github.com/'.",
  })
  .optional(),
twitterLink: z
  .string()
  .url({ message: "Must be a valid Twitter URL." })
  .startsWith("https://twitter.com/", {
    message: "Twitter link must start with 'https://twitter.com/'.",
  })
  .optional(),
});

export type profileData = z.infer<typeof profileValidation>;

export const updateProfileValidation = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(30, { message: "Username cannot exceed 30 characters." }),
  githubLink: z
    .string()
    .url({ message: "Must be a valid GitHub URL." })
    .startsWith("https://github.com/", {
      message: "GitHub link must start with 'https://github.com/'.",
    })
    .optional(),
  twitterLink: z
    .string()
    .url({ message: "Must be a valid Twitter URL." })
    .startsWith("https://twitter.com/", {
      message: "Twitter link must start with 'https://twitter.com/'.",
    })
    .optional(),
});


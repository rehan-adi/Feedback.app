import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined in the environment variables.");
}

export const resend = new Resend(RESEND_API_KEY);

console.log("Resend instance created with API key.");

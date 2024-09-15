import { Resend } from "resend";

let resend: Resend | null = null;

const getResendClient = () => {
  if (!resend) {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not defined in the environment variables.");
    }

    resend = new Resend(RESEND_API_KEY);
    console.log("Resend instance created with API key.");
  }
  return resend;
};

export default getResendClient;

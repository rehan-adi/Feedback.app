import resend  from "@/lib/resend"
import WelcomeEmailTemplate from "@/emails/WelcomeEmailTemplate"
import { NextResponse } from "next/server";

export const sendWelcomeEmail = async (
    email: string,
    username: string,
  ) => {
    
    try {
  
      const { data, error } = await resend.emails.send({
          from: 'Acme <onboarding@resend.dev>',
          to: email,
          subject: "Welcome",
          react: WelcomeEmailTemplate({ username }),
        });
    
    } catch (error) {
      console.error("Failed to send Welcome email:", error);
      return NextResponse.json({
        success: false,
        error: "Failed to send Welcome email",
      });
    }
  };
  
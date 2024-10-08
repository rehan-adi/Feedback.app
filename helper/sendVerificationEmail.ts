import resend from "@/lib/resend";
import VerificationEmail from "@/emails/VerificationEmail";
import { NextResponse } from "next/server";

export const sendVerificationEmail = async (
  email: string,
  username: string,
  verifyCode: string
) => {
  
  try {

    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: "Your Verification Code",
        react: VerificationEmail({username: username, verifyCode}),
      });

      if (error) {
        console.error("Failed to send verification email:", error);
        return NextResponse.json({
          success: false,
          error: "Failed to send verification email",
        });
      }

      return NextResponse.json({
        success: true,
        message: "Verification email sent successfully",
      });
  
  } catch (error) {
    console.error("Failed to send verification email:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to send verification email",
    });
  }
};

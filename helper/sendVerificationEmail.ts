import { resend } from "@/lib/resend";
import VerificationEmail from "@/emails/Verification";
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
        subject: "verificationCode",
        react: VerificationEmail({username: username, otp: verifyCode}),
      });
  
  } catch (error) {
    console.error("Failed to send verification email:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to send verification email",
    });
  }
};

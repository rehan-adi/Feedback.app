import prisma from "@/lib/prisma";
import { redis } from "@/utils/redis";
import { NextRequest, NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/helper/sendWelcomeEmail";
import { verifyEmailValidation } from "@/validation/auth.validation";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsedData = verifyEmailValidation.parse(body);

    const { verifyCode } = parsedData;

    if (!verifyCode) {
      return NextResponse.json(
        { message: "Verification code is missing" },
        { status: 400 }
      );
    }

    const storedData = await redis.get(verifyCode);

    if (!storedData) {
      return NextResponse.json(
        { message: "Verification code not found or expired" },
        { status: 400 }
      );
    }

    // Remove the verification code from Redis
    await redis.del(verifyCode);

    const user = await prisma.user.findFirst({
      where: {
        verifyCode,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired verification code" },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verifyCode: null,
      },
    });

    await sendWelcomeEmail(user.email, user.username);

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error during email verification:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { message: "Server error during email verification" },
      { status: 500 }
    );
  }
};

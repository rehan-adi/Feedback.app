import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { redis } from "@/utils/redis";
import { NextRequest, NextResponse } from "next/server";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";
import { signupValidation } from "@/validation/auth.validation";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsedData = signupValidation.parse(body);

    const { username, email, password } = parsedData;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verifyCode = Math.floor(100000 + Math.random() * 900000)
      .toString()
      .padStart(6, "0");
    const verifyCodeExpiry = 3600;

    await redis.set(
      verifyCode,
      verifyCode,
      "EX",
      verifyCodeExpiry
    );

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        verifyCode,
      },
    });

    await sendVerificationEmail(email, username, verifyCode);

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error: any) {
    console.error("Signup error:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while signing up. Please try again later.",
      },
      { status: 500 }
    );
  }
};

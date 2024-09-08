import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { changePasswordValidation } from "@/validation/auth.validation";

export const POST = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token is missing" },
        { status: 401 }
      );
    }

    let userId: string;

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
      };
      userId = decodedToken.id;
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User Id is missing from the token" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const parsedData = changePasswordValidation.parse(body);

    const { password } = parsedData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatePassword = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    if (!updatePassword) {
      return NextResponse.json(
        { success: false, message: "Failed to update password" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error: any) {
    console.error("Error while changing password:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      {
        success: false,
        message:
          "An error occurred while changing the password. Please try again later.",
      },
      { status: 500 }
    );
  }
};

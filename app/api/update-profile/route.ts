import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token is missing" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const userId = decoded.id;

    const existingUser = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const { username } = await req.json();

    await prisma.user.update({
      where: { id: userId },
      data: { username },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully",
      },
      { status: 200 }
    );
    
  } catch (error: any) {
    console.error("Error while updating profile:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      {
        success: false,
        message:
          "An error occurred while updating your profile. Please try again later.",
      },
      { status: 500 }
    );
  }
};

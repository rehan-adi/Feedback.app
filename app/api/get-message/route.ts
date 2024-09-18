import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token is missing" },
        { status: 401 }
      );
    }

    let email: string;

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
        email: string;
      };
      email = decodedToken.email;
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is missing from the token" },
        { status: 400 }
      );
    }

    const userWithMessages = await prisma.user.findUnique({
      where: { email },
      select: {
        messages: {
          select: {
            content: true,
            user: true,
            createdAt: true,
          },
        },
      },
    });

    if (!userWithMessages) {
      return NextResponse.json(
        { success: false, message: "No messages found for the user" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: userWithMessages, messages: "Messages retrieved successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("get messages error:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      {
        success: false,
        message:
          "An error occurred while retrieving messages. Please try again later.",
      },
      { status: 500 }
    );
  }
};

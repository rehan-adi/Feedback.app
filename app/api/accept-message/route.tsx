import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
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

    let userId: string;
    try {
      const decoded = (await jwt.verify(token, process.env.JWT_SECRET!)) as {
        id: string;
      };
      userId = decoded.id;
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isAcceptingMessages: true },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    };

    return NextResponse.json({ success: true, acceptMessages: user.isAcceptingMessages });

  } catch (error: any) {
    console.error("Error while fetching message preferences:", {
        message: error.message,
        stack: error.stack,
      });
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching message preferences. Please try again later.",
      },
      { status: 500 }
    );
  }
};

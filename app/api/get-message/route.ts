import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export const dynamic = 'force-dynamic';

export const GET = async (req: NextRequest) => {
  try {
    const { username } = new URL(req.url);

    const user = await prisma.user.findFirst({
      where: { username },
      include: { messages: true },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (!user.isAcceptingMessages) {
      return NextResponse.json(
        { success: false, message: "User is not accepting messages" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { success: true, messages: user.messages },
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
        message: "An error occurred while retrieving messages. Please try again later.",
      },
      { status: 500 }
    );
  }
};

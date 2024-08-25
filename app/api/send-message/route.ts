import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { messageValidation } from "@/validation/message.validation";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { username, content } = body;

    const parsedData = messageValidation.parse(content);

    const user = await prisma.user.findFirst({
      where: { username },
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

      await prisma.message.create({
        data: {
          content,
          user: {
            connect: { id: user.id },
          },
        },
      });

      return NextResponse.json(
        { success: true, message: "Message sent successfully" },
        { status: 201 }
      );

  } catch (error: any) {
    console.error("send message error:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while sending. Please try again later.",
      },
      { status: 500 }
    );
  }
};

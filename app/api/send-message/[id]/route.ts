import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { messageValidation } from "@/validation/message.validation";

export const POST = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const body = await req.json();
    const { content } = body;
    messageValidation.parse({ content });

    const user = await prisma.user.findFirst({
      where: { id: params.id},
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
    console.error("Send message error:", {
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

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { messageValidation } from "@/validation/message.validation";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const body = await req.json();
    const { content } = body;

    messageValidation.parse({ content });

    const token = req.cookies.get("token")?.value || "";

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token is missing" },
        { status: 401 }
      );
    }

    let senderEmail: string;
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
        email: string;
      };
      senderEmail = decodedToken.email;
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    const sender = await prisma.user.findUnique({
      where: { email: senderEmail },
    });

    if (!sender) {
      return NextResponse.json(
        { success: false, message: "Sender not found" },
        { status: 404 }
      );
    }

    const recipient = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!recipient) {
      return NextResponse.json(
        { success: false, message: "Receiver not found" },
        { status: 404 }
      );
    }

    if (!recipient.isAcceptingMessages) {
      return NextResponse.json(
        { success: false, message: "Receiver is not accepting messages" },
        { status: 403 }
      );
    }

    await prisma.message.create({
      data: {
        content,
        sender: {
          connect: { id: sender.id },
        },
        recipient: {
          connect: { id: recipient.id },
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
        message: "An error occurred while sending the message. Please try again later.",
      },
      { status: 500 }
    );
  }
};

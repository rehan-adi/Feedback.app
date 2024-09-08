import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        userId = decoded.id;
      } catch (error) {
        return NextResponse.json(
          { success: false, message: "Invalid token" },
          { status: 401 }
        );
      }
  
      const { acceptMessages } = await req.json();
  
      if (typeof acceptMessages !== 'boolean') {
        return NextResponse.json(
          { success: false, message: "Invalid data" },
          { status: 400 }
        );
      }
  
      const user = await prisma.user.update({
        where: { id: userId },
        data: { isAcceptingMessages: acceptMessages },
      });
  
      return NextResponse.json({ success: true, acceptMessages: user.isAcceptingMessages });
  
    } catch (error: any) {
      console.error("Error while updating message preferences:", {
        message: error.message,
        stack: error.stack,
      });
      return NextResponse.json(
        {
          success: false,
          message: "An error occurred while updating message preferences. Please try again later.",
        },
        { status: 500 }
      );
    }
  };
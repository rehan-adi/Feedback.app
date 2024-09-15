import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        isVerified: true,
        isAcceptingMessages: true,
        githubLink: true,
        twitterLink: true
      },
    });

    return NextResponse.json(
      { success: true, data: users, message: "Showing All User's" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failde All User" },
      { status: 500 }
    );
  }
};

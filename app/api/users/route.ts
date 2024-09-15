import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
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
        twitterLink: true,
      },
    });

    // Revalidate cache for the 'users' tag
    revalidateTag("users");

    return NextResponse.json(
      { success: true, data: users, message: "Showing all users" },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, max-age=60", // Cache for 60 seconds
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to retrieve users" },
      { status: 500 }
    );
  }
};

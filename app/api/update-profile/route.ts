import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { updateProfileValidation } from "@/validation/profile.validation";

export const PUT = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token is missing" },
        { status: 401 }
      );
    }

    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
      };
      userId = decoded.id;
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const parseData = updateProfileValidation.parse(body);

    const { username, githubLink, twitterLink } = parseData;
    console.log("Parsed data:", { username, githubLink, twitterLink });

    const updatesdata = await prisma.user.update({
      where: { id: userId },
      data: {
        username: username ?? undefined,
        githubLink: githubLink ?? undefined,
        twitterLink: twitterLink ?? undefined,
      },
    });

    console.log(updatesdata);
    

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

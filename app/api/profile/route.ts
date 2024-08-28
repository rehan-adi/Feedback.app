import jwt from 'jsonwebtoken'
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest) => {
  try {

    const token = req.cookies.get('token')?.value || '';

    if (!token) {
        return NextResponse.json(
            { success: false, message: 'Token is missing' },
            { status: 401 }
        );
    }

    let email: string;

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
      email = decodedToken.email;
    } catch (err) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    };

    if (!email) {
        return NextResponse.json(
          { success: false, message: 'Email is missing from the token' },
          { status: 400 }
        );
      }
  
      const userProfile = await prisma.user.findFirst({
        where: { email },
      });


    if (!userProfile) {
        return NextResponse.json(
          { success: false, message: 'User not found' },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { success: true, userProfile, message: 'User profile retrieved successfully' },
        { status: 200 }
      );

  } catch (error: any) {
    console.error("Error retrieving user profile:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while getting your profile. Please try again later.",
      },
      { status: 500 }
    );
  }
};

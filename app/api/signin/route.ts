import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from 'uuid'
import { NextRequest, NextResponse } from "next/server";
import { signinValidation } from "@/validation/auth.validation";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsedData = signinValidation.parse(body);

    const { email, password } = parsedData;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

   
    if (!existingUser) {
        return NextResponse.json(
          { success: false, message: "Invalid email or password. Please try again." },
          { status: 401 }
        );
      }
  
      if (!existingUser.isVerified) {
        return NextResponse.json(
          { success: false, message: "Account not verified. Please check your email for verification instructions." },
          { status: 401 }
        );
      }
  

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    const deviceId = uuidv4();

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { deviceId },
    });

    const token = jwt.sign(
      { id: existingUser.id, email: existingUser.email, deviceId: deviceId },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      success: true,
      token: token,
      message: "User signed in successfully",
    }, { status: 200 });

    response.cookies.set('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60,
        sameSite: 'strict',
        path: '/'
    });

    return response;
  } catch (error: any) {
    console.error('Signin error:', { message: error.message, stack: error.stack });
    return NextResponse.json(
      { success: false, message: "An error occurred while signing in. Please try again later." },
      { status: 500 }
    );
  }
};

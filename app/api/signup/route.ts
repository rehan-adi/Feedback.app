import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from "next/server";
import { signupValidation } from "@/validation/auth.validation";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsedData = signupValidation.parse(body);

    const { username, email, password } = parsedData;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if(existingUser) {
        return NextResponse.json(
          { success: false, message: "Email already registered" },
          { status: 400 }
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true, message: "User registered successfully" });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error registering user" },
      { status: 500 }
    );
  }
};

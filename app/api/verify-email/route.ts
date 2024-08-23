import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendWelcomeEmail } from '@/helper/sendWelcomeEmail';

export const POST = async (req: NextRequest) => {
    try {
        const { verifyCode } = await req.json();

        if (!verifyCode) {
          return NextResponse.json(
            { message: 'Verification code is missing' },
            { status: 400 }
          );
        }

        const user = await prisma.user.findFirst({
            where: {
                verifyCode: verifyCode,
                verifyCodeExpiry: { gt: new Date() }
            }
        });

        if (!user) {
            return NextResponse.json(
                { message: 'Invalid or expired verification code' },
                { status: 400 }
            );
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verifyCode: undefined,
                verifyCodeExpiry: undefined,
            },
        });

        await sendWelcomeEmail(user.email, user.username);

        return NextResponse.json(
            { message: 'Email verified successfully' },
            { status: 200 }
        );

    } catch (error: any) {
        console.error('Error during email verification:', { message: error.message, stack: error.stack });
        return NextResponse.json(
            { message: 'Server error during email verification' },
            { status: 500 }
        );
    }
};

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.json(
                { message: 'Verification token is missing' },
                { status: 400 }
            );
        }

        const user = await prisma.user.findFirst({
            where: {
                verifyCode: token,
                verifyCodeExpiry: { gt: new Date() }
            }
        });

        if (!user) {
            return NextResponse.json(
                { message: 'Invalid or expired token' },
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

        return NextResponse.json(
            { message: 'Email verified successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error during email verification:", error);
        return NextResponse.json(
            { message: 'Server error during email verification' },
            { status: 500 }
        );
    }
};

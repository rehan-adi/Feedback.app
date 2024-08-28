import { NextResponse } from 'next/server';

export const POST = async () => {
    try {
        const response = NextResponse.json(
            {
                success: true,
                message: 'Logout successful'
            },
            { status: 200 }
        );
        response.cookies.set('token', '', {
            httpOnly: true,
            expires: new Date(0),
            sameSite: 'strict',
            path: '/'
        });
        return response;
    } catch (error: any) {
        console.error('Error during logout:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
};
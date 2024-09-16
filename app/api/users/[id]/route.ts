import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const  GET = async(req: Request, { params }: { params: { id: string } }) => {
    
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json(user);
}
import { withSwagger } from 'next-swagger-doc';
import swaggerDefinition from '@/utils/swagger';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const swaggerHandler = withSwagger({
    definition: swaggerDefinition,
    apiFolder: 'app/api',
  });

  const swaggerResponse = await swaggerHandler(); 

  try {
    return NextResponse.json(swaggerResponse);
  } catch (error) {
    return NextResponse.json({ message: 'Swagger response is not serializable', data: JSON.stringify(swaggerResponse) });
  }
};

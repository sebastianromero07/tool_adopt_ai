import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createRoadmapRequest } from '@/src/backend/services/roadmapService';

const createSchema = z.object({
  clientName: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  problemStatement: z.string().min(10),
  expectedImpact: z.string().min(10),
  successMetric: z.string().min(10),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createSchema.parse(body);

    const roadmapRequest = await createRoadmapRequest(
      validated.clientName,
      validated.email,
      validated.company,
      validated.problemStatement,
      validated.expectedImpact,
      validated.successMetric
    );

    return NextResponse.json(roadmapRequest, { status: 201 });  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

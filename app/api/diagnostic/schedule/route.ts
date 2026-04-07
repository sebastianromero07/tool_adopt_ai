import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { scheduleDiagnosticSession } from '@/src/backend/services/diagnosticService';
import { generateRoadmapWithAI } from '@/src/backend/services/roadmapGenerationService';

const scheduleSchema = z.object({
  clientName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  company: z.string().min(2, 'El nombre de la empresa debe tener al menos 2 caracteres'),
  position: z.string().optional().default('No especificado'),
  mainChallenge: z.string().optional().default('No especificado'),
  customChallenge: z.string().optional().nullable(),
  context: z.string().optional().default('No especificado'),
  employeeCount: z.string().optional().default('No especificado'),
  scheduledAt: z.string().datetime(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = scheduleSchema.parse(body);    // 1. Guardar en Supabase + Enviar emails + Guardar en leads_analytics
    const session = await scheduleDiagnosticSession(
      validated.clientName,
      validated.email,
      validated.company,
      validated.position,
      validated.mainChallenge,
      validated.customChallenge || null,
      validated.context,
      validated.employeeCount
    );

    // 2. Generar roadmap con IA EN BACKGROUND (no esperar)
    try {
      generateRoadmapWithAI(
        session.id,
        validated.mainChallenge,
        validated.context,
        validated.company,
        validated.employeeCount
      ).catch((err) => {
        console.error('❌ Error generando roadmap en background:', err);
      });
      
      console.log('🚀 Generación de roadmap iniciada en background');
    } catch (aiError) {
      console.warn('⚠️ Error iniciando generación de roadmap:', aiError);
      // No fallar si falla la IA
    }

    return NextResponse.json(
      {
        success: true,
        message: '✅ Diagnóstico guardado. Generando roadmap personalizado...',
        sessionId: session.id,
        data: session,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error en POST /api/diagnostic/schedule:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validación fallida',
          issues: error.issues,
        },
        { status: 400 }
      );
    }

    const message = error instanceof Error ? error.message : 'Error interno del servidor';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

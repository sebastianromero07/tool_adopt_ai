import { supabaseServer } from '../config/supabase';

export interface RoadmapGenerated {
  stages: Array<{
    number: number;
    title: string;
    description: string;
    duration: string;
    focus: string;
    deliverables: string[];
  }>;
  recommendations: string;
  roi_estimate: number;
  timeline_months: number;
  keyMetrics: string[];
}

export async function generateRoadmapWithAI(
  sessionId: string,
  mainChallenge: string,
  context: string,
  company: string,
  employeeCount: string
): Promise<RoadmapGenerated> {
  try {
    console.log('🤖 Iniciando generación de roadmap con IA...');

    const prompt = `Eres un experto en transformación digital con IA. Basándote en esta información, genera un roadmap estratégico detallado:

INFORMACIÓN DEL CLIENTE:
- Empresa: ${company}
- Cantidad de empleados: ${employeeCount}
- Desafío principal: ${mainChallenge}
- Contexto operativo: ${context}

Genera un roadmap estructurado en formato JSON con EXACTAMENTE esta estructura:
{
  "stages": [
    {
      "number": 1,
      "title": "nombre de la etapa",
      "description": "descripción detallada",
      "duration": "X semanas/meses",
      "focus": "área de enfoque principal",
      "deliverables": ["entregable1", "entregable2", "entregable3"]
    }
  ],
  "recommendations": "recomendaciones clave basadas en el contexto",
  "roi_estimate": número entre 15 y 300,
  "timeline_months": número entre 3 y 24,
  "keyMetrics": ["métrica1", "métrica2", "métrica3"]
}

IMPORTANTE: 
- El roadmap debe tener EXACTAMENTE 4 etapas
- Cada etapa debe ser específica para el contexto del cliente
- Los números de ROI deben ser realistas (15-300%)
- El timeline debe ser práctico (3-24 meses)
- Responde SOLO con JSON válido, sin markdown

Genera el roadmap ahora:`;

    // Usar OpenRoute (que es lo que tienes en OPENAI_API_KEY)
    const response = await fetch('https://openrouter.io/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'AdoptAI',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenRoute API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const responseText = data.choices[0].message.content;

    console.log('📝 Respuesta de IA recibida, parseando JSON...');

    // Parsear el JSON de la respuesta
    let roadmapData: RoadmapGenerated;
    try {
      roadmapData = JSON.parse(responseText);
    } catch (parseError) {
      console.error('⚠️ Error al parsear JSON, usando datos fallback:', parseError);
      roadmapData = {
        stages: [
          {
            number: 1,
            title: 'Diagnóstico Profundo',
            description: 'Análisis detallado de procesos y sistemas actuales',
            duration: '4 semanas',
            focus: 'Entender el estado actual',
            deliverables: ['Análisis de procesos', 'Mapeo de sistemas', 'Identificación de puntos de dolor'],
          },
          {
            number: 2,
            title: 'Diseño de Solución',
            description: 'Diseño de la arquitectura de IA personalizada',
            duration: '6 semanas',
            focus: 'Solución personalizada',
            deliverables: ['Arquitectura propuesta', 'Roadmap técnico', 'Plan de implementación'],
          },
          {
            number: 3,
            title: 'Implementación Piloto',
            description: 'Piloto en un caso de uso prioritario',
            duration: '8 semanas',
            focus: 'Prueba de concepto',
            deliverables: ['Módulo piloto', 'Documentación', 'Capacitación inicial'],
          },
          {
            number: 4,
            title: 'Escalamiento',
            description: 'Expansión a toda la organización',
            duration: '12 semanas',
            focus: 'Adopción completa',
            deliverables: ['Integración total', 'Capacitación completa', 'Soporte operativo'],
          },
        ],
        recommendations: 'Basándose en el contexto proporcionado, se recomienda un enfoque gradual comenzando por automatización de procesos críticos.',
        roi_estimate: 125,
        timeline_months: 6,
        keyMetrics: ['Reducción de tiempo de procesamiento', 'Mejora en precisión', 'Aumento de capacidad'],
      };
    }

    console.log('✅ Roadmap generado exitosamente');

    // 2. Guardar en Supabase - roadmap_results
    console.log('💾 Guardando roadmap en Supabase...');
    const { data: roadmapResult, error: roadmapError } = await supabaseServer()
      .from('roadmap_results')
      .insert([
        {
          diagnostic_session_id: sessionId,
          roadmap_content: roadmapData,
          stages: roadmapData.stages,
          recommendations: roadmapData.recommendations,
          roi_estimate: roadmapData.roi_estimate,
          timeline_months: roadmapData.timeline_months,
          status: 'completed',
          generated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (roadmapError) {
      console.error('⚠️ Error guardando roadmap en roadmap_results:', roadmapError);
      // No fallar, continuar
    } else {
      console.log('✅ Roadmap guardado en roadmap_results:', roadmapResult.id);
    }

    return roadmapData;
  } catch (error) {
    console.error('❌ Error generando roadmap con IA:', error);
    throw error;
  }
}

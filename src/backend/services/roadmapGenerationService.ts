import { supabaseServer } from '../config/supabase';
import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');

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

// Función fallback para generar roadmap cuando la IA no está disponible
function generateFallbackRoadmap(mainChallenge: string, context: string): RoadmapGenerated {
  return {
    stages: [
      {
        number: 1,
        title: 'Diagnóstico Profundo',
        description: 'Análisis detallado de procesos, sistemas y áreas de fricción operativa',
        duration: '4 semanas',
        focus: 'Entender la situación actual',
        deliverables: ['Análisis de procesos', 'Mapeo de sistemas', 'Identificación de puntos de dolor'],
      },
      {
        number: 2,
        title: 'Diseño de Solución con IA',
        description: 'Diseño de la arquitectura personalizada aprovechando inteligencia artificial',
        duration: '6 semanas',
        focus: 'Solución adaptada al contexto',
        deliverables: ['Arquitectura propuesta', 'Roadmap técnico', 'Plan de implementación'],
      },
      {
        number: 3,
        title: 'Implementación Piloto',
        description: 'Piloto controlado en un caso de uso prioritario para validar resultados',
        duration: '8 semanas',
        focus: 'Validación en vivo',
        deliverables: ['Módulo piloto funcional', 'Documentación técnica', 'Capacitación inicial'],
      },
      {
        number: 4,
        title: 'Escalamiento y Adopción',
        description: 'Expansión a toda la organización con soporte continuo',
        duration: '12 semanas',
        focus: 'Adopción completa y sostenibilidad',
        deliverables: ['Integración total', 'Capacitación integral', 'Soporte operativo'],
      },
    ],
    recommendations: 'Basándose en tu contexto operativo, se recomienda un enfoque gradual priorizando los procesos que generan mayor fricción. Implementa automatización en paralelo con cambios organizacionales.',
    roi_estimate: 125,
    timeline_months: 6,
    keyMetrics: ['Reducción de tiempo de procesamiento', 'Mejora en precisión operativa', 'Aumento de capacidad de respuesta'],
  };
}

export async function generateRoadmapWithAI(
  sessionId: string,
  mainChallenge: string,
  context: string,
  company: string,
  employeeCount: string
): Promise<RoadmapGenerated> {
  try {
    console.log('🤖 Iniciando generación de roadmap con Google Gemini...');

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
- Responde SOLO con JSON válido, sin markdown ni etiquetas de código.

Genera el roadmap ahora:`;

    let roadmapData: RoadmapGenerated;
    let usesFallback = false;

    try {
      // 1. Configuramos la URL de Google con la API Key en la URL
      const apiKey = process.env.GOOGLE_API_KEY; // ¡Asegúrate de tener esto en tu .env.local!
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 2. Estructura de body específica para Gemini
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8192,
            // 👇 AGREGA ESTA LÍNEA MÁGICA 👇
            responseMimeType: "application/json", 
          }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text(); 
        throw new Error(`Google Gemini API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      // 3. Ruta de acceso a la respuesta en Gemini
      let responseText = data.candidates[0].content.parts[0].text;

      console.log('📝 Respuesta de IA recibida, parseando JSON...');

      // Limpiamos la respuesta en caso de que Gemini añada etiquetas markdown (```json ... ```)
      responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

      // Parsear el JSON de la respuesta
      try {
        roadmapData = JSON.parse(responseText);
      } catch (parseError) {
        console.error('⚠️ Error al parsear JSON, usando datos fallback:', parseError);
        usesFallback = true;
        roadmapData = generateFallbackRoadmap(mainChallenge, context);
      }
    } catch (apiError) {
      console.warn('⚠️ Error conectando con Google Gemini, usando fallback:', apiError);
      usesFallback = true;
      roadmapData = generateFallbackRoadmap(mainChallenge, context);
    }

    console.log(`✅ Roadmap generado ${usesFallback ? '(fallback)' : 'exitosamente'}`);

    // Guardar en Supabase - roadmap_results
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
    } else {
      console.log('✅ Roadmap guardado en roadmap_results:', roadmapResult?.id);
    }

    return roadmapData;
  } catch (error) {
    console.error('❌ Error generando roadmap con IA:', error);
    throw error;
  }
}
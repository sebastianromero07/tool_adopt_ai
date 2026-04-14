import { supabaseServer } from '../config/supabase';
import { resend, sendRoadmapGenerated } from '../config/resend';
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
  // Contexto dinámico del negocio
  businessContext: {
    mainChallenge: string;
    affectedArea: string;
    currentConsequence: string;
    objective: string;
  };
  // Resumen personalizado
  summary: {
    startingPoint: string;
    expectedImpact: string;
    successMetric: string;
  };
}

// Función fallback para generar roadmap cuando la IA no está disponible
function generateFallbackRoadmap(mainChallenge: string, context: string, company: string, employeeCount: string): RoadmapGenerated {
  // Mapear desafíos a roadmaps específicos
  const challengeMap: Record<string, () => RoadmapGenerated> = {    'cost-overruns': () => ({
      stages: [        {
          number: 1,
          title: 'Auditoría de Costos Profunda',
          description: 'Análisis exhaustivo de flujos de gastos, identificación de desperdicio y fuentes de sobrecostos',
          duration: '~10 días',
          focus: 'Visibilidad total de costos',
          deliverables: ['Mapeo de gastos por área', 'Identificación de fugas presupuestarias', 'Análisis comparativo vs benchmarks'],
        },
        {
          number: 2,
          title: 'Automatización de Procesos Costosos',
          description: 'Implementación de IA y automatización en los procesos que generan mayor gasto operacional',
          duration: '~10 días',
          focus: 'Reducción automática de costos',
          deliverables: ['Sistema de automatización', 'Optimización de workflows', 'Métricas de ahorro'],
        },
        {
          number: 3,
          title: 'Validación y Ajustes',
          description: 'Pruebas en vivo de las soluciones de ahorro de costos con equipos piloto',
          duration: 'Variable',
          focus: 'Validación de ROI',
          deliverables: ['Piloto funcional', 'Reporte de ahorros', 'Documentación de procesos'],
        },
        {
          number: 4,
          title: 'Escalamiento y Monitoreo',
          description: 'Expansión de las soluciones a toda la organización con sistemas de monitoreo continuo',
          duration: 'Ongoing',
          focus: 'Sostenibilidad de ahorros',
          deliverables: ['Rollout completo', 'Dashboard de monitoreo', 'Plan de mejora continua'],
        },
      ],
      recommendations: `Para ${company}, se recomienda comenzar con un análisis de costos en paralelo a la implementación de automatización. Esto permitirá identificar rápidamente dónde se pueden lograr mayores ahorros. Con ${employeeCount} empleados, es crítico implementar controles de costo a nivel departamental.`,
      roi_estimate: 140,
      timeline_months: 5,
      keyMetrics: ['Reducción de costos operacionales', 'Mejora en eficiencia de gastos', 'ROI de inversión en IA'],
      businessContext: {
        mainChallenge: 'Sobrecostos operativos',
        affectedArea: 'Procesos manuales y sistemas obsoletos',
        currentConsequence: 'Gastos excesivos sin visibilidad clara',
        objective: 'Reducir costos operacionales mediante automatización inteligente',
      },
      summary: {
        startingPoint: 'Análisis de gastos actuales para identificar drenajes financieros',
        expectedImpact: 'Reducción del 30-40% en costos operacionales mediante automatización',
        successMetric: 'Ahorro mensual verificado y aumento de margen operativo',
      },
    }),    'bottlenecks': () => ({
      stages: [        {
          number: 1,
          title: 'Mapeo de Cuellos de Botella',
          description: 'Identificación de procesos lentos y dependencias críticas que limitan la velocidad',
          duration: '~10 días',
          focus: 'Diagnóstico de bloqueos operacionales',
          deliverables: ['Mapa de procesos críticos', 'Identificación de bottlenecks', 'Matriz de impacto'],
        },
        {
          number: 2,
          title: 'Rediseño y Paralelización',
          description: 'Rediseño de procesos para eliminar dependencias secuenciales usando IA y automatización',
          duration: '~10 días',
          focus: 'Optimización de flujos',
          deliverables: ['Procesos rediseñados', 'Sistema de paralelización', 'Documentación de nuevos flujos'],
        },
        {
          number: 3,
          title: 'Implementación Acelerada',
          description: 'Despliegue de nuevos procesos en equipos clave con monitoreo intensivo',
          duration: 'Variable',
          focus: 'Validación de velocidad',
          deliverables: ['Implementación piloto', 'Métricas de velocidad', 'Feedback del equipo'],
        },
        {
          number: 4,
          title: 'Optimización Continua',
          description: 'Mejora permanente de tiempos y eliminación de nuevos cuellos de botella emergentes',
          duration: 'Ongoing',
          focus: 'Velocidad sostenible',
          deliverables: ['Rollout completo', 'Sistema de alertas', 'Ciclo de mejora continua'],
        },
      ],
      recommendations: `Para ${company}, eliminar cuellos de botella requiere un enfoque de paralelización. Con ${employeeCount} empleados, pueden implementar esto de forma gradual en departamentos prioritarios. Se espera 30-50% de mejora en velocidad de procesos.`,
      roi_estimate: 110,
      timeline_months: 5,
      keyMetrics: ['Reducción de ciclo de proceso', 'Capacidad de procesamiento', 'Velocidad de entrega'],
      businessContext: {
        mainChallenge: 'Cuellos de botella críticos',
        affectedArea: 'Procesos interdepartamentales y workflows',
        currentConsequence: 'Retrasos operacionales y capacidad limitada',
        objective: 'Eliminar bloqueos y aumentar velocidad de procesamiento',
      },
      summary: {
        startingPoint: 'Identificación de procesos secuenciales que ralentizan la operación',
        expectedImpact: 'Aumento de 30-50% en velocidad de procesamiento',
        successMetric: 'Reducción de ciclo de proceso y aumento de capacidad operativa',
      },
    }),    'chaos': () => ({
      stages: [        {
          number: 1,
          title: 'Estandarización de Procesos',
          description: 'Documentación y estandarización de procesos caóticos para crear orden operacional',
          duration: '~10 días',
          focus: 'Crear estructura y gobernanza',
          deliverables: ['Documentación de procesos', 'Procedimientos estándar', 'Guías operacionales'],
        },
        {
          number: 2,
          title: 'Implementación de Sistemas',
          description: 'Despliegue de sistemas y herramientas para mantener los procesos estandarizados',
          duration: '~10 días',
          focus: 'Automatización de control',
          deliverables: ['Sistemas integrados', 'Automatización de validación', 'Dashboards de control'],
        },
        {
          number: 3,
          title: 'Capacitación y Adopción',
          description: 'Entrenamiento intensivo de equipos para asegurar adopción de nuevos procesos',
          duration: 'Variable',
          focus: 'Cambio organizacional',
          deliverables: ['Programas de capacitación', 'Certificación de equipos', 'Guías de buenas prácticas'],
        },
        {
          number: 4,
          title: 'Gobernanza y Mejora',
          description: 'Establecimiento de ciclos de mejora continua y gobernanza operacional',
          duration: 'Ongoing',
          focus: 'Sostenibilidad del orden',
          deliverables: ['Estructura de gobernanza', 'Métricas de cumplimiento', 'Plan de evolución'],
        },
      ],
      recommendations: `Para ${company}, el caos operacional se resuelve con estructura. Con ${employeeCount} empleados, recomendamos implementar por fases: primero documentación, luego sistemas, finalmente gobernanza. Esto mejorará predictibilidad y eficiencia.`,
      roi_estimate: 85,
      timeline_months: 5,
      keyMetrics: ['Consistencia operacional', 'Reducción de errores', 'Satisfacción de equipos'],
      businessContext: {
        mainChallenge: 'Procesos caóticos y falta de estandarización',
        affectedArea: 'Toda la organización - departamentos silos',
        currentConsequence: 'Inconsistencia, errores frecuentes, baja eficiencia',
        objective: 'Crear estructura operacional con procesos estandarizados',
      },
      summary: {
        startingPoint: 'Documentación y mapeo de procesos actuales para crear base de gobernanza',
        expectedImpact: 'Reducción de errores y aumento de previsibilidad operativa',
        successMetric: 'Adopción de procesos estándar y mejora en métrica de consistencia',
      },
    }),    'other': () => ({
      stages: [        {
          number: 1,
          title: 'Diagnóstico Profundo',
          description: 'Análisis detallado de procesos, sistemas y áreas de fricción operativa',
          duration: '~10 días',
          focus: 'Entender la situación actual',
          deliverables: ['Análisis de procesos', 'Mapeo de sistemas', 'Identificación de puntos de dolor'],
        },
        {
          number: 2,
          title: 'Diseño de Solución con IA',
          description: 'Diseño de la arquitectura personalizada aprovechando inteligencia artificial',
          duration: '~10 días',
          focus: 'Solución adaptada al contexto',
          deliverables: ['Arquitectura propuesta', 'Roadmap técnico', 'Plan de implementación'],
        },
        {
          number: 3,
          title: 'Implementación Piloto',
          description: 'Piloto controlado en un caso de uso prioritario para validar resultados',
          duration: 'Variable',
          focus: 'Validación en vivo',
          deliverables: ['Módulo piloto funcional', 'Documentación técnica', 'Capacitación inicial'],
        },
        {
          number: 4,
          title: 'Escalamiento y Adopción',
          description: 'Expansión a toda la organización con soporte continuo',
          duration: 'Ongoing',
          focus: 'Adopción completa y sostenibilidad',
          deliverables: ['Integración total', 'Capacitación integral', 'Soporte operativo'],
        },
      ],
      recommendations: `Basándose en tu contexto operativo: "${context}", se recomienda un enfoque gradual priorizando los procesos que generan mayor fricción. Implementa automatización en paralelo con cambios organizacionales.`,
      roi_estimate: 125,
      timeline_months: 6,
      keyMetrics: ['Reducción de tiempo de procesamiento', 'Mejora en precisión operativa', 'Aumento de capacidad de respuesta'],
      businessContext: {
        mainChallenge: 'Desafío operacional personalizado',
        affectedArea: 'Áreas críticas identificadas en diagnóstico',
        currentConsequence: 'Impacto operacional específico del contexto',
        objective: 'Mejorar eficiencia mediante solución personalizada con IA',
      },
      summary: {
        startingPoint: 'Análisis detallado del contexto operativo actual',
        expectedImpact: 'Mejora significativa en eficiencia y capacidad operativa',
        successMetric: 'Adopción de solución y métricas de mejora medibles',
      },
    }),
  };
  // Obtener el roadmap específico para el desafío, o usar default
  const roadmapGenerator = challengeMap[mainChallenge] || challengeMap['other'];
  const baseRoadmap = roadmapGenerator();
  
  // Añadir contexto dinámico del negocio
  return {
    ...baseRoadmap,
    businessContext: {
      mainChallenge: mainChallenge === 'cost-overruns' ? 'Sobrecostos y desperdicio operacional' :
                     mainChallenge === 'bottlenecks' ? 'Cuellos de botella que limitan escala' :
                     mainChallenge === 'chaos' ? 'Desorden y falta de estandarización' :
                     'Desafío de transformación digital',
      affectedArea: context.substring(0, 150) || 'Operaciones y procesos críticos',
      currentConsequence: mainChallenge === 'cost-overruns' ? 'Márgenes reducidos, presupuestos sin control, ineficiencia operacional' :
                         mainChallenge === 'bottlenecks' ? 'Demoras en entrega, capacidad limitada, cliente insatisfecho' :
                         mainChallenge === 'chaos' ? 'Errores frecuentes, inconsistencia, falta de visibilidad' :
                         'Impacto negativo en operaciones',
      objective: `Transformar ${company} (${employeeCount} empleados) mediante IA para resolver el desafío de ${mainChallenge}`,
    },
    summary: {
      startingPoint: mainChallenge === 'cost-overruns' ? `Auditoría completa de costos operacionales en ${company}` :
                     mainChallenge === 'bottlenecks' ? `Mapeo de procesos críticos que limitan la capacidad de ${company}` :
                     mainChallenge === 'chaos' ? `Documentación y estandarización de procesos en ${company}` :
                     `Diagnóstico de transformación digital en ${company}`,
      expectedImpact: mainChallenge === 'cost-overruns' ? 'Reducción de 30-50% en costos operacionales a través de automatización inteligente' :
                      mainChallenge === 'bottlenecks' ? 'Incremento de 40-60% en capacidad de procesamiento y velocidad de entrega' :
                      mainChallenge === 'chaos' ? 'Mejora de 50-70% en precisión operacional y reducción de errores' :
                      'Mejora significativa en eficiencia operacional mediante IA',
      successMetric: mainChallenge === 'cost-overruns' ? 'Ahorro mensual documentado vs presupuesto inicial' :
                     mainChallenge === 'bottlenecks' ? 'Reducción de ciclo de procesamiento medido en horas/días' :
                     mainChallenge === 'chaos' ? 'Tasa de cumplimiento de procedimientos y reducción de incidentes' :
                     'ROI positivo en primeros 90 días de implementación',
    },
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

    // Mapear el desafío a un enfoque específico
    const challengeMap: Record<string, string> = {
      'cost-overruns': 'Control de costos y optimización de gastos operacionales',
      'bottlenecks': 'Eliminación de cuellos de botella y optimización de procesos',
      'chaos': 'Orden operacional y estandarización de procesos',
      'other': 'Transformación digital personalizada',
    };
    
    const challengeDescription = challengeMap[mainChallenge] || mainChallenge;
    
    // Interpretar el tamaño de la empresa para personalizar el timeline y scope
    const companySize = employeeCount || '15-50';
    let timelineAdjustment = 6; // meses base
    let scopeLevel = 'Medium';
    
    if (companySize.includes('5-15') || companySize === '5-15') {
      timelineAdjustment = 4;
      scopeLevel = 'Small (ágil)';
    } else if (companySize.includes('50+')) {
      timelineAdjustment = 8;
      scopeLevel = 'Enterprise (complejo)';
    }    const prompt = `Eres un consultor senior de transformación digital que debe ANALIZAR y GENERAR un roadmap personalizado.

INFORMACIÓN DEL CLIENTE A ANALIZAR:
═══════════════════════════════════════════════════════════════
📊 EMPRESA: ${company}
👥 TAMAÑO: ${companySize} empleados (Scope: ${scopeLevel})
🎯 DESAFÍO PRINCIPAL: ${mainChallenge}
   → Traducción: ${challengeDescription}
📝 CONTEXTO OPERATIVO DETALLADO: "${context}"

INSTRUCCIONES - ANALIZA PROFUNDAMENTE:
═════════════════════════════════════════════════════════════════

1. NO COPIES EL CONTEXTO: Analiza lo que el cliente dijo en "${context}"
2. DEDUCE "affectedArea": De ${context}, identifica qué área operativa específica es afectada
3. ANALIZA "currentConsequence": De ${context}, deduce el impacto real (no genérico)
4. DEFINE "objective": Objetivo claro y realista para ${company}

1. CONTEXTO DE NEGOCIO (basado en la información anterior):
   - mainChallenge: El desafío específico en lenguaje ejecutivo
   - affectedArea: Área de la empresa más impactada (basada en contexto)
   - currentConsequence: Impacto negativo actual específico a ${mainChallenge}
   - objective: Objetivo claro de transformación para ${company}

2. RESUMEN PERSONALIZADO (3 tarjetas diferentes):
   - startingPoint: Primer paso específico para ${company} con ${companySize} empleados
   - expectedImpact: Impacto mensurable realista para este desafío
   - successMetric: Métrica KPI específica para medir éxito

3. ROADMAP DE 4 ETAPAS SECUENCIALES:
   - Cada etapa DEBE ser específica para ${mainChallenge}
   - Títulos descriptivos y únicos (no genéricos)
   - Descripciones que expliquen QUÉ y POR QUÉ para el contexto: "${context}"
   - Duraciones realistas para ${companySize} empleados
   - Focus areas relevantes al desafío
   - 3 entregables concretos por etapa

4. RECOMENDACIONES ESTRATÉGICAS:
   - Específicas para ${company}
   - Considerando ${employeeCount} empleados
   - Basadas directamente en el contexto: "${context}"
   - Prácticas y accionables

5. MÉTRICAS CLAVE (3-4 KPIs):
   - Relevantes para ${mainChallenge}
   - Medibles y trackeable

ESTRUCTURA JSON REQUERIDA (sin markdown, sin backticks):
{
  "stages": [
    {
      "number": 1,
      "title": "Etapa claramente titulada ESPECÍFICA para ${mainChallenge}",
      "description": "Descripción que explique QUÉ se hace y POR QUÉ en este contexto específico",
      "duration": "X semanas/meses (realista para ${companySize})",
      "focus": "Área de enfoque específica del desafío",
      "deliverables": ["Entregable 1 concreto", "Entregable 2 concreto", "Entregable 3 concreto"]
    }
  ],
  "recommendations": "Recomendaciones estratégicas PERSONALIZADAS para ${company} con ${employeeCount} empleados frente al desafío de ${mainChallenge}. Basado en contexto: ${context}",
  "roi_estimate": número realista según desafío,
  "timeline_months": ${timelineAdjustment},
  "keyMetrics": ["KPI 1 específico", "KPI 2 específico", "KPI 3 específico"],
  "businessContext": {
    "mainChallenge": "El desafío principal en lenguaje ejecutivo",
    "affectedArea": "Área operativa más impactada",
    "currentConsequence": "Consecuencia actual del problema",
    "objective": "Objetivo de transformación para ${company}"
  },
  "summary": {
    "startingPoint": "Primer paso específico para ${company}",
    "expectedImpact": "Impacto esperado medible",
    "successMetric": "Métrica principal de éxito"
  }
}

GUÍAS POR DESAFÍO:
═══════════════════════════════════════════════════════════════

Si ${mainChallenge} = "cost-overruns":
  ✓ ROI esperado: 120-200%
  ✓ Timeline: 4-7 meses
  ✓ Focus: Auditoría de costos → Automatización → Validación → Monitoreo
  ✓ Entregables: Reportes de ahorro, dashboards de costo, optimización de procesos

Si ${mainChallenge} = "bottlenecks":
  ✓ ROI esperado: 100-180%
  ✓ Timeline: 4-6 meses
  ✓ Focus: Mapeo de procesos → Rediseño → Implementación → Optimización
  ✓ Entregables: Procesos optimizados, sistema de alertas, documentación

Si ${mainChallenge} = "chaos":
  ✓ ROI esperado: 80-150%
  ✓ Timeline: 5-7 meses
  ✓ Focus: Documentación → Sistemas → Capacitación → Gobernanza
  ✓ Entregables: Procedimientos, sistemas integrados, políticas

IMPORTANTE:
═══════════════════════════════════════════════════════════════
- Responde SOLO con JSON válido (sin markdown, sin backticks)
- EXACTAMENTE 4 etapas, no más, no menos
- Todo debe ser específico para ${company}, ${employeeCount}, ${mainChallenge}
- El roadmap debe ser realista y implementable
- El contexto "${context}" debe reflejarse en las descripciones

Genera el roadmap COMPLETO y PERSONALIZADO ahora:
`;
    let roadmapData: RoadmapGenerated;
    let usesFallback = false;    try {
      console.log('🤖 Llamando a Google Gemini API con modelo gemini-3-flash-preview...');

      const apiKey = process.env.GOOGLE_API_KEY;
      if (!apiKey) {
        throw new Error('Missing GOOGLE_API_KEY environment variable');
      }

      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=' + apiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8192,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Google Gemini API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!responseText) {
        throw new Error('No response from Groq API');
      }

      console.log('📝 Respuesta de IA recibida, parseando JSON...');

      // Limpiamos la respuesta en caso de que Groq añada etiquetas markdown
      let cleanedResponse = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

      // Parsear el JSON de la respuesta
      try {
        roadmapData = JSON.parse(cleanedResponse);
      } catch (parseError) {
        console.error('⚠️ Error al parsear JSON de Groq, usando fallback:', parseError);
        usesFallback = true;
        roadmapData = generateFallbackRoadmap(mainChallenge, context, company, employeeCount);
      }
    } catch (apiError) {
      console.warn('⚠️ Error conectando con Groq API, usando fallback:', apiError);
      usesFallback = true;
      roadmapData = generateFallbackRoadmap(mainChallenge, context, company, employeeCount);
    }

    console.log(`✅ Roadmap generado ${usesFallback ? '(fallback)' : 'exitosamente'}`);

    // Guardar en Supabase - roadmap_results
    console.log('💾 Guardando roadmap en Supabase...');
    
    // Primero, verificar si ya existe un roadmap para esta sesión
    const { data: existingRoadmap } = await supabaseServer()
      .from('roadmap_results')
      .select('id')
      .eq('diagnostic_session_id', sessionId)
      .maybeSingle();

    let roadmapResult;
    let roadmapError;

    if (existingRoadmap) {
      // Si existe, actualizar el más reciente
      const { data, error } = await supabaseServer()
        .from('roadmap_results')
        .update({
          roadmap_content: roadmapData,
          stages: roadmapData.stages,
          recommendations: roadmapData.recommendations,
          roi_estimate: roadmapData.roi_estimate,
          timeline_months: roadmapData.timeline_months,
          status: 'completed',
          generated_at: new Date().toISOString(),
        })
        .eq('id', existingRoadmap.id)
        .select()
        .single();
      
      roadmapResult = data;
      roadmapError = error;
    } else {
      // Si no existe, insertar uno nuevo
      const { data, error } = await supabaseServer()
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
      
      roadmapResult = data;
      roadmapError = error;
    }    if (roadmapError) {
      console.error('⚠️ Error guardando roadmap en roadmap_results:', roadmapError);
    } else {
      console.log('✅ Roadmap guardado/actualizado en roadmap_results:', roadmapResult?.id);
    }

    // 📧 ENVIAR EMAILS DESPUÉS DE GENERAR EL ROADMAP
    console.log('📧 Obtener datos del cliente para enviar emails...');
    
    try {
      // Obtener datos del cliente desde la sesión de diagnóstico
      const { data: sessionData, error: sessionError } = await supabaseServer()
        .from('diagnostic_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (sessionError || !sessionData) {
        console.error('⚠️ No se encontraron datos de la sesión:', sessionError);
        return roadmapData;
      }      const clientEmail = sessionData.email;
      const clientName = sessionData.client_name;
      const companyName = sessionData.company;
      const mainChallengeName = sessionData.main_challenge;
      const contextDescription = sessionData.context;

      // 📨 ÚNICO EMAIL: AL EQUIPO (NOTIFICATION_EMAIL) - Roadmap completo con datos del cliente
      const notificationEmail = process.env.NOTIFICATION_EMAIL || 'ariesbook844@gmail.com';
      console.log(`📨 Enviando roadmap a equipo: ${notificationEmail}`);
      
      try {
        await sendRoadmapGenerated(
          notificationEmail, // ← Enviar SOLO al equipo
          clientName,
          roadmapData,
          companyName,
          mainChallengeName,
          contextDescription,
          clientEmail // ← Incluir email del cliente en el contenido
        );
        console.log('✅ Email con roadmap enviado al equipo exitosamente');
      } catch (emailError) {
        console.error('⚠️ Error enviando email:', emailError);
      }

    } catch (error) {
      console.error('❌ Error en proceso de envío de emails:', error);
      // No fallar la generación de roadmap si falla el envío de emails
    }

    return roadmapData;
  } catch (error) {
    console.error('❌ Error generando roadmap con IA:', error);
    throw error;
  }
}
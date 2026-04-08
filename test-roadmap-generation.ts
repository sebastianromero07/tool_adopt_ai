/**
 * Script de prueba para verificar que la generación de roadmaps funciona correctamente
 * Prueba:
 * 1. Que el prompt se construya correctamente
 * 2. Que se llame a Gemini correctamente
 * 3. Que se genere un roadmap válido
 */

import { generateRoadmapWithAI } from './src/backend/services/roadmapGenerationService';

const testCases = [
  {
    sessionId: 'test-1',
    mainChallenge: 'cost-overruns',
    context: 'Nuestra empresa gasta demasiado en procesos manuales de facturación que requieren múltiples revisiones',
    company: 'Tech Solutions Inc.',
    employeeCount: '15-50',
  },
  {
    sessionId: 'test-2',
    mainChallenge: 'bottlenecks',
    context: 'El equipo de soporte está saturado y los tickets tardan 48 horas en resolverse',
    company: 'CustomerCare Corp',
    employeeCount: '50+',
  },
  {
    sessionId: 'test-3',
    mainChallenge: 'chaos',
    context: 'Cada departamento usa diferentes herramientas y procesos, no hay estandarización',
    company: 'Growing Startup',
    employeeCount: '5-15',
  },
];

async function runTests() {
  console.log('🚀 Iniciando pruebas de generación de roadmaps...\n');

  for (const testCase of testCases) {
    try {
      console.log(`\n📋 Test: ${testCase.mainChallenge}`);
      console.log(`   Empresa: ${testCase.company}`);
      console.log(`   Empleados: ${testCase.employeeCount}`);
      console.log(`   Contexto: ${testCase.context.substring(0, 50)}...`);

      const roadmap = await generateRoadmapWithAI(
        testCase.sessionId,
        testCase.mainChallenge,
        testCase.context,
        testCase.company,
        testCase.employeeCount
      );

      // Validar estructura
      if (!roadmap.stages || roadmap.stages.length !== 4) {
        throw new Error(`❌ Esperados 4 stages, got ${roadmap.stages?.length}`);
      }

      console.log(`   ✅ ${roadmap.stages.length} stages generadas`);
      console.log(`   ✅ ROI Estimate: ${roadmap.roi_estimate}%`);
      console.log(`   ✅ Timeline: ${roadmap.timeline_months} meses`);
      console.log(`   ✅ Métricas: ${roadmap.keyMetrics?.length || 0}`);

      // Mostrar primer stage como ejemplo
      const firstStage = roadmap.stages[0];
      console.log(`   📍 Stage 1: ${firstStage.title}`);
      console.log(`      Duración: ${firstStage.duration}`);
      console.log(`      Entregables: ${firstStage.deliverables?.length || 0}`);
    } catch (error) {
      console.error(`   ❌ Error:`, error instanceof Error ? error.message : error);
    }
  }

  console.log('\n✨ Pruebas completadas\n');
}

runTests().catch(console.error);

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TopNavBar from '@/src/frontend/components/TopNavBar';

export default function DiagnosticStep2() {
  const router = useRouter();
  const [context, setContext] = useState('');

  useEffect(() => {
    const diagData = JSON.parse(localStorage.getItem('diagnosticData') || '{}');
    setContext(diagData.context || '');
  }, []);

  const handleContinue = () => {
    if (context.trim().length >= 20) {
      const diagData = JSON.parse(localStorage.getItem('diagnosticData') || '{}');
      localStorage.setItem('diagnosticData', JSON.stringify({
        ...diagData,
        context: context.trim(),
      }));
      router.push('/diagnostic/step3');
    }
  };

  const handleBack = () => {
    router.push('/diagnostic/step1');
  };

  return (
    <>
      <TopNavBar />
      <main className="flex-grow flex flex-col items-center justify-center px-3 py-4 md:py-5">
        {/* Progress Indicator */}
        <div className="w-full max-w-4xl mb-4">
          <div className="flex justify-between items-end mb-1.5">
            <span className="text-xs font-medium text-primary uppercase tracking-widest">Paso 2 de 3</span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-primary-container w-2/3 transition-all duration-500"></div>
          </div>
        </div>

        {/* Hero Title Section */}
        <div className="text-center max-w-2xl mb-5">
          <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight leading-tight mb-2">
            Entendido. Para tener el contexto completo:
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant font-body leading-relaxed">
            ¿Cómo funciona este proceso hoy en día? Menciona qué herramientas o áreas están involucradas y en qué punto exacto se genera el problema.
          </p>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-5xl mb-5">
          {/* Large Context textarea */}
          <div className="bg-white border-2 border-outline-variant rounded-lg shadow-sm hover:border-primary-container transition-colors">
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Ejemplo: Nuestro proceso de facturación es 100% manual. Involucra 3 equipos (Operaciones, Finanzas, Cobranza) que trabajan en Excel. El cuello de botella ocurre cuando hay facturas con errores: toma 2-3 días corregirlas. Usamos SAP antiguo que no se integra con nada, y todo se hace por email."
              className="w-full bg-transparent border-none focus:outline-none text-on-surface p-4 min-h-[140px] font-body text-xs placeholder:text-outline placeholder:text-opacity-60 resize-none"
            />
            <div className="h-0.5 bg-primary transition-all duration-300" style={{
              width: context.length > 0 ? '100%' : '0%'
            }}></div>
          </div>
          <p className="text-xs text-outline mt-1.5">
            {context.length}/500 caracteres. Mínimo 20 recomendado.
          </p>
        </div>        {/* Action Button - Above Summary Cards */}
        <div className="mt-4 mb-5 flex justify-between items-center w-full max-w-5xl gap-4">
          <button
            onClick={handleBack}
            className="px-6 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 border-2 border-outline text-on-surface hover:bg-surface-container cursor-pointer"
          >
            <span className="material-symbols-outlined text-base" data-icon="arrow_back">
              arrow_back
            </span>
            Atrás
          </button>

          <button
            onClick={handleContinue}
            disabled={context.trim().length < 20}
            style={{
              backgroundColor: context.trim().length >= 20 ? '#0077B6' : '#eceef0',
              color: context.trim().length >= 20 ? '#ffffff' : '#707881',
            }}
            className={`px-8 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
              context.trim().length >= 20
                ? 'shadow-lg shadow-blue-500/20 hover:shadow-xl active:scale-95 cursor-pointer'
                : 'cursor-not-allowed opacity-50'
            }`}
          >
            Analizar mi operación
            <span className="material-symbols-outlined text-base" data-icon="arrow_forward">
              arrow_forward
            </span>
          </button>
        </div>
        <p className="text-xs text-outline font-label">El análisis está 100% seguro y confidencial.</p>

        {/* Summary Cards - Structural Mapping & Immediate Impact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-5xl mb-5">
          {/* Mapeo Estructural Card */}
          <div className="p-4 rounded-lg bg-surface-container-lowest border-2 border-transparent ring-on-surface/5 shadow-sm">
            <div className="flex items-start gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-lg" data-icon="schema">
                schema
              </span>
              <h3 className="text-sm font-bold text-on-surface">Mapeo Estructural</h3>
            </div>
            <p className="text-xs text-on-surface-variant leading-tight">
              Identifica departamentos, sistemas y puntos de integración críticos en tu operación.
            </p>
          </div>

          {/* Impacto Inmediato Card */}
          <div className="p-4 rounded-lg bg-surface-container-lowest border-2 border-transparent ring-on-surface/5 shadow-sm">
            <div className="flex items-start gap-2 mb-2">              <span className="material-symbols-outlined text-primary text-lg" data-icon="trending_down">
                trending_down
              </span>
              <h3 className="text-sm font-bold text-on-surface">Impacto Inmediato</h3>
            </div>
            <p className="text-xs text-on-surface-variant leading-tight">
              Medimos costo, tiempo y riesgos actuales en tu flujo de trabajo.
            </p>
          </div>
        </div>

        {/* Visual Accent Element (Decorative) */}
      </main>
      <div className="fixed top-1/4 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-1/4 -left-24 w-96 h-96 bg-tertiary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
    </>
  );
}

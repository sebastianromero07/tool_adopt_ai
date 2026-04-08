'use client';

import React from 'react';

// --- DATA PARA EL TIMELINE ---
const stages = [
  {
    number: 1,
    title: 'Entendimiento operativo',
    phase: 'Fase de Diagnóstico',
    badgeColor: 'bg-[#0077B6]/10 text-[#0077B6]',
    focus: 'Proceso prioritario',
    validation: 'Punto crítico',
    result: 'Diagnóstico priorizado',
    resultColor: 'text-[#0077B6]',
  },
  {
    number: 2,
    title: 'Diseño de la intervención',
    phase: 'Arquitectura de Solución',
    badgeColor: 'bg-[#d0a600]/20 text-[#745b00]',
    focus: 'Caso de uso inicial',
    validation: 'Viabilidad operativa',
    result: 'Ruta de solución validada',
    resultColor: 'text-[#745b00]',
  },
  {
    number: 3,
    title: 'Implementación guiada',
    phase: 'Ejecución Activa',
    badgeColor: 'bg-[#dcfce7] text-[#2A915E]',
    focus: 'Primer frente de ejecución',
    validation: 'Uso real en campo',
    result: 'Solución operativa inicial',
    resultColor: 'text-[#2A915E]',
  },
  {
    number: 4,
    title: 'Adopción y mejora continua',
    phase: 'Escalabilidad & Feedback',
    badgeColor: 'bg-[#e2e8f0] text-[#1e293b]',
    focus: 'Estabilidad operativa',
    validation: 'Impacto y feedback',
    result: 'Expansión con criterio',
    resultColor: 'text-[#1e293b]',
  },
];

const getStageColor = (index: number) => {
  const colors = ['#0077B6', '#E7B904', '#2A915E', '#1e293b'];
  return colors[index] || '#0077B6';
};

// --- COMPONENTE DEL BUCLE ITERATIVO ---
function IterativeLoopComponent() {
  return (
    <div className="relative py-12 md:pl-24 mb-4">
      <div className="absolute left-0 top-0 bottom-0 w-24 hidden md:flex items-center justify-center -ml-4">
        <svg className="w-full h-full" fill="none" viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0V200" stroke="#E0E3E5" strokeLinecap="round" strokeWidth="4" strokeDasharray="8 4" className="animate-[dash_30s_linear_infinite]" />
          <path d="M12 30C50 30 50 170 12 170" stroke="url(#paint0_linear)" strokeDasharray="6 6" strokeLinecap="round" strokeWidth="3" />
          <path d="M12 170C-26 170 -26 30 12 30" stroke="url(#paint1_linear)" strokeDasharray="6 6" strokeLinecap="round" strokeWidth="3" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear" x1="12" x2="12" y1="30" y2="170">
              <stop stopColor="#0077B6"></stop>
              <stop offset="1" stopColor="#0a1628"></stop>
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear" x1="12" x2="12" y1="170" y2="30">
              <stop stopColor="#0a1628"></stop>
              <stop offset="1" stopColor="#0077B6"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="bg-white border border-[#0077B6]/20 p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
          <span className="material-symbols-outlined text-[120px]">sync</span>
        </div>

        <div className="shrink-0 relative">
          <div className="w-16 h-16 rounded-2xl bg-[#0077B6] flex items-center justify-center text-white shadow-lg shadow-[#0077B6]/30 z-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            <span className="material-symbols-outlined text-3xl animate-[spin_10s_linear_infinite]">sync</span>
          </div>
          <div className="absolute -inset-4 bg-[#0077B6]/10 rounded-full blur-xl animate-pulse"></div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h4 className="font-headline text-xl font-extrabold text-[#0a1628] mb-2 flex items-center justify-center md:justify-start gap-2">
            Iteramos hasta validar ROI
            <span className="inline-block px-2 py-0.5 bg-[#0077B6]/10 text-[#0077B6] text-[10px] font-bold rounded uppercase tracking-widest">
              Bucle de Calidad
            </span>
          </h4>
          <p className="text-[#404850] text-sm md:text-base leading-relaxed max-w-xl">
            Cada intervención se ajusta en función de uso real, fricción operativa y resultados observables antes de escalar.
          </p>
        </div>

        <div className="hidden lg:flex flex-col items-end gap-2 border-l border-[#bfc7d2]/30 pl-8">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#0077B6]/20 border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#191c1e]">QA</div>
            <div className="w-8 h-8 rounded-full bg-[#535f74]/20 border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#191c1e]">UX</div>
            <div className="w-8 h-8 rounded-full bg-[#745b00]/20 border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#191c1e]">ROI</div>
          </div>
          <span className="text-[10px] font-bold text-[#707881] uppercase tracking-tighter">Validación continua</span>
        </div>
      </div>
    </div>
  );
}

// --- PÁGINA PRINCIPAL ---
export default function Page() {
  return (
    <main className="max-w-7xl mx-auto px-8 py-12 bg-[#f7f9fb]">
      {/* HEADER SECTION */}
      <header className="mb-16">
        <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-[#0077B6] tracking-tight mb-4">
          Roadmap de Transformación IA
        </h1>
        <p className="text-[#404850] text-xl max-w-2xl leading-relaxed">
          Una ruta estratégica diseñada para optimizar la arquitectura operativa y escalar la capacidad de respuesta a través de inteligencia aplicada.
        </p>
      </header>

      {/* 01 / CONTEXTO */}
      <section className="mb-20">
        <div className="flex items-baseline gap-4 mb-8">
          <span className="text-[#745b00] font-headline font-bold text-sm tracking-widest uppercase">01 / Contexto</span>
          <h2 className="font-headline text-3xl font-bold text-[#191c1e]">Lectura del negocio</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border-l-4 border-[#0077B6] shadow-sm">
            <span className="material-symbols-outlined text-[#0077B6] mb-4">troubleshoot</span>
            <h3 className="font-headline font-bold text-lg mb-2 text-[#191c1e]">Desafío principal</h3>
            <p className="text-[#404850] text-sm">Cuellos de botella críticos para escalar la operación actual.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border-l-4 border-[#0077B6] shadow-sm">
            <span className="material-symbols-outlined text-[#0077B6] mb-4">account_tree</span>
            <h3 className="font-headline font-bold text-lg mb-2 text-[#191c1e]">Área afectada</h3>
            <p className="text-[#404850] text-sm">Operaciones y coordinación interna entre departamentos.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border-l-4 border-[#0077B6] shadow-sm">
            <span className="material-symbols-outlined text-[#0077B6] mb-4">warning</span>
            <h3 className="font-headline font-bold text-lg mb-2 text-[#191c1e]">Consecuencia actual</h3>
            <p className="text-[#404850] text-sm">Demoras, retrabajo constante y pérdida total de visibilidad operativa.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border-l-4 border-[#0077B6] shadow-sm">
            <span className="material-symbols-outlined text-[#0077B6] mb-4">target</span>
            <h3 className="font-headline font-bold text-lg mb-2 text-[#191c1e]">Objetivo</h3>
            <p className="text-[#404850] text-sm">Reducir fricción operativa y aumentar drásticamente la capacidad de respuesta.</p>
          </div>
        </div>
      </section>

      {/* 02 / ESTRATEGIA (TIMELINE) */}
      <section className="mb-20">
        <div className="flex items-baseline gap-4 mb-12">
          <span className="text-[#745b00] font-headline font-bold text-sm tracking-widest uppercase">
            02 / Estrategia
          </span>
          <h2 className="font-headline text-3xl font-bold text-[#191c1e]">Ruta Crítica de Evolución</h2>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-[#e0e3e5] hidden md:block"></div>

          {stages.map((stage, index) => (
            <div key={stage.number}>
              <div className="relative flex flex-col md:flex-row gap-8 mb-16 items-start">
                <div 
                  className="md:w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl z-10 shrink-0 shadow-lg"
                  style={{ backgroundColor: getStageColor(index) }}
                >
                  {stage.number}
                </div>

                <div className="bg-[#f2f4f6] p-8 rounded-xl flex-1 items-center grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 border border-[#e0e3e5]/50">
                  <div>
                    <h3 className="font-headline text-2xl font-bold mb-2 text-[#191c1e]">{stage.title}</h3>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 ${stage.badgeColor} text-xs font-bold rounded-full uppercase tracking-tighter mb-4`}>
                      {stage.phase}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs font-bold text-[#707881] uppercase mb-1">Focus</p>
                      <p className="text-[#191c1e] font-medium">{stage.focus}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#707881] uppercase mb-1">Validation</p>
                      <p className="text-[#191c1e] font-medium">{stage.validation}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#707881] uppercase mb-1">Result</p>
                      <p className={`${stage.resultColor} font-bold`}>{stage.result}</p>
                    </div>
                  </div>
                </div>
              </div>

              {index === 1 && <IterativeLoopComponent />}

              {index === 1 && (
                <div className="relative py-8 md:pl-24 mb-12">
                  <div className="bg-[#0077B6]/5 border-2 border-dashed border-[#0077B6]/30 p-6 rounded-2xl flex items-center gap-4">
                    <span className="material-symbols-outlined text-[#0077B6] text-3xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                      lightbulb
                    </span>
                    <p className="font-headline font-semibold text-[#0077B6] text-lg italic">
                      "Priorizamos una primera intervención acotada, medible y viable antes de escalar"
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SUMMARY CARDS */}
      <section className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#bfc7d2]/30">
          <h4 className="text-[#745b00] font-bold text-xs uppercase tracking-widest mb-4">Punto de Partida</h4>
          <h3 className="font-headline text-xl font-bold mb-3 text-[#191c1e]">Problema que atacaremos primero</h3>
          <p className="text-[#404850] leading-relaxed">Fricción en el flujo de datos entre preventa e implementación que genera retrasos de 3 días.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#bfc7d2]/30">
          <h4 className="text-[#0077B6] font-bold text-xs uppercase tracking-widest mb-4">Impacto Esperado</h4>
          <h3 className="font-headline text-xl font-bold mb-3 text-[#191c1e]">Resultado operacional esperado</h3>
          <p className="text-[#404850] leading-relaxed">Reducción del 40% en el tiempo de procesamiento de nuevos pedidos mediante automatización inteligente.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#bfc7d2]/30">
          <h4 className="text-[#2A915E] font-bold text-xs uppercase tracking-widest mb-4">Métrica de Éxito</h4>
          <h3 className="font-headline text-xl font-bold mb-3 text-[#191c1e]">Qué validaremos primero</h3>
          <p className="text-[#404850] leading-relaxed">La precisión del agente IA en la clasificación automática de documentos operativos sin intervención humana.</p>
        </div>
      </section>

      {/* FOOTER CTA SECTION */}
      <section className="bg-[#101c2e] text-white rounded-3xl p-12 overflow-hidden relative shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <h2 className="font-headline text-4xl font-extrabold mb-4 leading-tight">Listo para validar tu primera intervención</h2>
          <p className="text-slate-300 text-lg mb-8">Agenda una sesión de diagnóstico personalizada con nuestro equipo consultor para definir tu primer caso de uso viable.</p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#0077B6] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#0095D9] transition-all flex items-center gap-2 shadow-md">
              <span className="material-symbols-outlined">event</span>
              Agendar diagnóstico
            </button>
            <button className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">download</span>
              Descargar roadmap
            </button>
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#0077B6]/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute right-20 top-0 w-40 h-40 bg-[#745b00]/20 rounded-full blur-[60px] pointer-events-none"></div>
      </section>
    </main>
  );
}
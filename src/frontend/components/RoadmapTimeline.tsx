'use client';

export default function RoadmapTimeline() {
  return (
    <section className="mb-20">
      {/* Label de sección */}
      <div className="flex items-baseline gap-4 mb-12">
        <span className="text-tertiary font-headline font-bold text-sm tracking-widest uppercase">
          02 / Estrategia
        </span>
        <h2 className="font-headline text-3xl font-bold">Ruta Crítica de Evolución</h2>
      </div>

      <div className="relative">
        {/* Línea vertical central */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-surface-container-highest hidden md:block" />

        {/* ── ETAPA 1 ── */}
        <div className="relative flex flex-col md:flex-row gap-8 mb-16 items-start">
          <div className="md:w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl z-10 shrink-0 shadow-lg">
            1
          </div>
          <div className="bg-surface-container-low p-8 rounded-xl flex-1 editorial-grid items-center">
            <div>
              <h3 className="font-headline text-2xl font-bold mb-2">Entendimiento operativo</h3>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-tighter mb-4">
                Fase de Diagnóstico
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-xs font-bold text-outline uppercase mb-1">Focus</p>
                <p className="text-on-surface font-medium">Proceso prioritario</p>
              </div>
              <div>
                <p className="text-xs font-bold text-outline uppercase mb-1">Validation</p>
                <p className="text-on-surface font-medium">Punto crítico</p>
              </div>
              <div>
                <p className="text-xs font-bold text-outline uppercase mb-1">Result</p>
                <p className="text-primary font-bold">Diagnóstico priorizado</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── ETAPA 2 ── */}
        <div className="relative flex flex-col md:flex-row gap-8 mb-4 items-start">
          <div className="md:w-16 h-16 rounded-full bg-[#E7B904] flex items-center justify-center text-white font-bold text-xl z-10 shrink-0 shadow-lg">
            2
          </div>
          <div className="bg-surface-container-low p-8 rounded-xl flex-1 editorial-grid items-center">
            <div>
              <h3 className="font-headline text-2xl font-bold mb-2">Diseño de la intervención</h3>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-tertiary-container/20 text-tertiary text-xs font-bold rounded-full uppercase tracking-tighter mb-4">
                Arquitectura de Solución
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-xs font-bold text-outline uppercase mb-1">Focus</p>
                <p className="text-on-surface font-medium">Caso de uso inicial</p>
              </div>
              <div>
                <p className="text-xs font-bold text-outline uppercase mb-1">Validation</p>
                <p className="text-on-surface font-medium">Viabilidad operativa</p>
              </div>
              <div>
                <p className="text-xs font-bold text-outline uppercase mb-1">Result</p>
                <p className="text-tertiary font-bold">Ruta de solución validada</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── BUCLE ITERATIVO ── */}
        <div className="relative py-12 md:pl-24 mb-4">
          {/* SVG conector lateral */}
          <div className="absolute left-0 top-0 bottom-0 w-24 hidden md:flex items-center justify-center -ml-4">
            <svg className="w-full h-full" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="iterative-loop-path" d="M12 0V200" stroke="#E0E3E5" strokeWidth="4" strokeLinecap="round" />
              <path d="M12 30C50 30 50 170 12 170" stroke="url(#g0)" strokeDasharray="6 6" strokeLinecap="round" strokeWidth="3" />
              <path d="M12 170C-26 170 -26 30 12 30" stroke="url(#g1)" strokeDasharray="6 6" strokeLinecap="round" strokeWidth="3" />
              <defs>
                <linearGradient id="g0" x1="12" y1="30" x2="12" y2="170" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0D7EC0" />
                  <stop offset="1" stopColor="#0a1628" />
                </linearGradient>
                <linearGradient id="g1" x1="12" y1="170" x2="12" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0a1628" />
                  <stop offset="1" stopColor="#0D7EC0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Tarjeta del loop */}
          <div className="bg-gradient-to-r from-white to-[#f7f9fb] border border-primary/20 p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
            {/* Ícono decorativo de fondo */}
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[120px]">sync</span>
            </div>

            {/* Ícono principal animado */}
            <div className="shrink-0 relative">
              <div className="w-16 h-16 rounded-2xl bg-[#0D7EC0] flex items-center justify-center text-white shadow-lg shadow-primary/30 z-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                <span className="material-symbols-outlined text-3xl animate-[spin_10s_linear_infinite]">sync</span>
              </div>
              <div className="absolute -inset-4 bg-primary/10 rounded-full blur-xl animate-pulse" />
            </div>

            {/* Texto */}
            <div className="flex-1 text-center md:text-left">
              <h4 className="font-headline text-xl font-extrabold text-[#0a1628] mb-2 flex items-center justify-center md:justify-start gap-2">
                Iteramos hasta validar ROI
                <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-widest">
                  Bucle de Calidad
                </span>
              </h4>
              <p className="text-on-surface-variant text-sm md:text-base leading-relaxed max-w-xl">
                Cada intervención se ajusta en función de uso real, fricción operativa y
                resultados observables antes de escalar.
              </p>
            </div>

            {/* Badges de validación */}
            <div className="hidden lg:flex flex-col items-end gap-2 border-l border-outline-variant/30 pl-8">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-white flex items-center justify-center text-[10px] font-bold">QA</div>
                <div className="w-8 h-8 rounded-full bg-secondary/20 border-2 border-white flex items-center justify-center text-[10px] font-bold">UX</div>
                <div className="w-8 h-8 rounded-full bg-tertiary/20 border-2 border-white flex items-center justify-center text-[10px] font-bold">ROI</div>
              </div>
              <span className="text-[10px] font-bold text-outline uppercase tracking-tighter">Validación continua</span>
            </div>
          </div>
        </div>

        {/* ── CALLOUT ── */}
        <div className="relative py-8 md:pl-24 mb-12">
          <div className="bg-[#0D7EC0]/5 border-2 border-dashed border-[#0D7EC0]/30 p-6 rounded-2xl flex items-center gap-4">
            <span className="material-symbols-outlined text-[#0D7EC0] text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}>
              lightbulb
            </span>
            <p className="font-headline font-semibold text-[#0D7EC0] text-lg italic">
              "Priorizamos una primera intervención acotada, medible y viable antes de escalar"
            </p>
          </div>
        </div>

        {/* ── ETAPA 3 ── */}
        <div className="relative flex flex-col md:flex-row gap-8 mb-16 items-start">
          <div className="md:w-16 h-16 rounded-full bg-[#2A915E] flex items-center justify-center text-white font-bold text-xl z-10 shrink-0 shadow-lg">
            3
          </div>
          <div className="bg-surface-container-low p-8 rounded-xl flex-1 editorial-grid items-center">
            <div>
              <h3 className="font-headline text-2xl font-bold mb-2">Implementación guiada</h3>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-[#2A915E] text-xs font-bold rounded-full uppercase tracking-tighter mb-4">
                Ejecución Activa
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-xs font-bold text-outline uppercase mb-1">Focus</p>
                <p className="text-on-surface font-medium">Primer frente de ejecución</p>
              </div>
              <div>
                <p className="text-xs font-bold text-outline uppercase mb-1">Validation</p>
                <p className="text-on-surface font-medium">Uso real en campo</p>
              </div>
              <div>
                <p className="text-xs font-bold text-outline uppercase mb-1">Result</p>
                <p className="text-[#2A915E] font-bold">Solución operativa inicial</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── ETAPA 4 ── */}
        <div className="relative flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-xl z-10 shrink-0 shadow-lg">
            4
          </div>
          <div className="bg-surface-container-low p-8 rounded-xl flex-1 editorial-grid items-center">
            <div>
              <h3 className="font-headline text-2xl font-bold mb-2">Adopción y mejora continua</h3>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-200 text-slate-800 text-xs font-bold rounded-full uppercase tracking-tighter mb-4">
                Escalabilidad &amp; Feedback
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-xs font-bold text-outline uppercase mb-1">Focus</p>
                <p className="text-on-surface font-medium">Estabilidad operativa</p>
              </div>
              <div>
                <p className="text-xs font-bold text-outline uppercase mb-1">Validation</p>
                <p className="text-on-surface font-medium">Impacto y feedback</p>
              </div>
              <div>
                <p className="text-xs font-bold text-outline uppercase mb-1">Result</p>
                <p className="text-slate-800 font-bold">Expansión con criterio</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
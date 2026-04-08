'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TopNavBar from '@/src/frontend/components/TopNavBar';

interface TerminalLine {
  type: 'log' | 'info' | 'json' | 'processing';
  text: string;
}

const terminalLines: TerminalLine[] = [
  { type: 'log', text: 'Iniciando proceso de extracción...' },
  { type: 'info', text: 'Analizando entrada del usuario' },
  { type: 'info', text: 'Identificando entidades de negocio' },
  { type: 'info', text: 'Mapeando desafíos operativos' },
  {
    type: 'json',
    text: `{
  "status": "ANALYZING",
  "payload": {
    "entidad": "Logística",
    "desafío": "Falta de visibilidad",
    "herramientas": [
      "Excel",
      "Legacy ERP"
    ],
    "impacto": "Pérdida de pedidos",
    "criticidad": "Alta",
    "oportunidad": "Automatización de flujo"
  },
  "metadata": {
    "confianza": 0.982,
    "tokens": 442
  }
}`,
  },
  { type: 'processing', text: 'Extrayendo insights estratégicos...' },
];

export default function ProcessingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-surface">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-on-surface-variant">Cargando análisis de IA...</p>
          </div>
        </div>
      }
    >
      <ProcessingContent />
    </Suspense>
  );
}

function ProcessingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const [displayedLines, setDisplayedLines] = useState<Array<{ type: string; displayedText: string }>>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextCharacter = () => {
      if (lineIndex < terminalLines.length) {
        const currentLine = terminalLines[lineIndex];
        const fullText = currentLine.text;

        if (charIndex < fullText.length) {
          // LÓGICA CORREGIDA AQUÍ
          setDisplayedLines((prev) => {
            const newLines = [...prev];
            
            // Forzamos el texto exacto usando slice(). 
            // Esto evita que React Strict Mode duplique letras
            newLines[lineIndex] = {
              type: currentLine.type,
              displayedText: fullText.slice(0, charIndex + 1),
            };
            
            return newLines;
          });

          charIndex++;
          const charDelay = currentLine.type === 'json' ? 5 : 30; // Faster for JSON
          timeoutId = setTimeout(typeNextCharacter, charDelay);
        } else {
          // Move to next line
          charIndex = 0;
          lineIndex++;
          const lineDelay = currentLine.type === 'json' ? 200 : 500;
          timeoutId = setTimeout(typeNextCharacter, lineDelay);
        }

        // Update progress
        setProgress(Math.round(((lineIndex + charIndex / fullText.length) / terminalLines.length) * 100));
      } else {
        // All lines typed
        setIsComplete(true);
        setProgress(100);

        // Redirect after 2 seconds of completion
        timeoutId = setTimeout(() => {
          router.push(`/diagnostic/roadmap?sessionId=${sessionId}`);
        }, 2000);
      }
    };

    timeoutId = setTimeout(typeNextCharacter, 500);

    return () => clearTimeout(timeoutId);
  }, [router]);

  return (
    <>
      <TopNavBar />
      <main className="bg-surface text-on-surface min-h-[calc(100vh-80px)] flex items-center justify-center p-6 md:p-12 overflow-hidden relative">
        {/* Grid Layout */}
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Section: AI Terminal */}
          <div className="lg:col-span-6 xl:col-span-7 h-full flex flex-col justify-center">
            <div className="bg-slate-900 rounded-xl overflow-hidden flex flex-col h-[500px] shadow-2xl border border-slate-700">
              {/* Terminal Header */}
              <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">
                  Engine: AdoptAI_v2.0.4
                </span>
              </div>
              {/* Terminal Content */}
              <div className="p-6 font-mono text-xs sm:text-sm overflow-y-auto flex-grow bg-slate-950 custom-scrollbar relative">
                {/* Animated Text */}
                <div className="space-y-1 whitespace-pre-wrap break-words">
                  {displayedLines.map((line, index) => (
                    <div key={index} className="leading-relaxed">
                      {line.type === 'log' && (
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-green-400 text-sm">terminal</span>
                          <span className="text-slate-400">{line.displayedText}</span>
                        </div>
                      )}
                      {line.type === 'info' && (
                        <p className="text-slate-400">
                          <span className="text-blue-400">INFO</span> [14:22:01] {line.displayedText}
                        </p>
                      )}
                      {line.type === 'json' && (
                        <div className="text-green-400 opacity-90" style={{ textShadow: '0 0 5px rgba(74, 222, 128, 0.3)' }}>
                          {line.displayedText}
                        </div>
                      )}
                      {line.type === 'processing' && (
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-5 bg-green-400 animate-pulse inline-block"></span>
                          <span className="text-slate-500 italic">{line.displayedText}</span>
                        </div>
                      )}
                    </div>
                  ))}
                  {/* Blinking cursor */}
                  {!isComplete && displayedLines.length > 0 && displayedLines[displayedLines.length - 1].type !== 'processing' && (
                    <div className="inline-block w-2 h-5 bg-green-400 animate-pulse ml-1 align-middle"></div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Status */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center h-full space-y-10">
            {/* Logo */}
            <div>
              <div className="flex items-center gap-2 mb-8">
                <img
                  alt="AdoptAI Logo"
                  className="h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida/ADBb0ujO9A16e-JFAyHV839g47AL4yIM6xioUGvq9Vu8UABPAWw2Ifih_O_JDqZNRb2zoICEKSUryt4rvng-T6QqtLIzmM8vScaawQ4mowDuNKp3u2QuUXsCbP6gn0dyXH9wRwyfWhcueDwrw_u1Xm2A_gLdhUutzySm1gWQu9OkNKmt_56Szyx4nJGTO_5ZwOwL9uJsDr852ksNMc654l4F2HWXYkKv90PdgEdBk6lq34kiUeMfVeWzWCdSI04w5r_UlL5PpHZYrRuvJW4"
                />
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-extrabold text-[#0077B6] leading-tight tracking-tighter mb-4">
                Análisis de IA en curso
              </h1>
              <p className="text-[#404850] text-lg leading-relaxed font-body max-w-md">
                Nuestra arquitectura de inteligencia está transformando sus datos no estructurados en un plan estratégico personalizado.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-[#404850]">Progreso del análisis</span>
                <span className="text-sm font-bold text-[#0077B6]">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-2 bg-[#e0e3e5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#0077B6] to-[#0095D9] transition-all duration-300 rounded-full"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>

            {/* Status Steps */}
            <div className="space-y-2">
              {[
                { label: 'Análisis de entrada', icon: 'check_circle', completed: progress > 10 },
                { label: 'Extracción de entidades', icon: 'check_circle', completed: progress > 35 },
                { label: 'Generación de estrategia', icon: 'check_circle', completed: progress > 60 },
                { label: 'Creación de roadmap', icon: 'check_circle', completed: progress > 85 },
              ].map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span
                    className={`material-symbols-outlined text-lg ${
                      step.completed ? 'text-green-500' : 'text-slate-400'
                    }`}
                    style={{ fontVariationSettings: step.completed ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {step.icon}
                  </span>
                  <span className={step.completed ? 'text-[#191c1e] font-medium' : 'text-[#404850]'}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            {isComplete && (
              <div className="p-4 rounded-lg bg-green-50 border border-green-200 flex items-center gap-3">
                <span className="material-symbols-outlined text-green-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                <div>
                  <p className="text-sm font-semibold text-green-900">Análisis completado</p>
                  <p className="text-xs text-green-700">Redirigiendo a tu roadmap...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="fixed top-0 right-0 -z-10 w-1/3 h-1/3 bg-[#cde5ff]/30 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="fixed bottom-0 left-0 -z-10 w-1/4 h-1/4 bg-[#ffe08a]/20 blur-[100px] rounded-full pointer-events-none"></div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.7);
        }
      `}</style>
    </>
  );
}
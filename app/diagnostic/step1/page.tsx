'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TopNavBar from '@/src/frontend/components/TopNavBar';

const challenges = [
  {
    id: 'cost-overruns',
    title: 'Sobrecostos operativos',
    description: 'Gastos excesivos en procesos manuales y mantenimiento de sistemas obsoletos.',
    icon: 'payments',
  },
  {
    id: 'bottlenecks',
    title: 'Cuellos de botella para escalar',
    description: 'La infraestructura actual impide el crecimiento ante una mayor demanda.',
    icon: 'trending_up',
  },
  {
    id: 'chaos',
    title: 'Dependencias y procesos caóticos',
    description: 'Falta de estandarización y silos de información entre departamentos.',
    icon: 'hub',
  },
  {
    id: 'other',
    title: 'Otros',
    description: 'Tu desafío es único y requiere un enfoque personalizado.',
    icon: 'more_horiz',
  },
];

export default function DiagnosticStep1() {
  const router = useRouter();
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>('bottlenecks');
  const [customChallenge, setCustomChallenge] = useState('');

  const handleContinue = () => {
    if (selectedChallenge) {
      const diagData = JSON.parse(localStorage.getItem('diagnosticData') || '{}');
      localStorage.setItem('diagnosticData', JSON.stringify({
        ...diagData,
        mainChallenge: selectedChallenge,
        customChallenge: selectedChallenge === 'other' ? customChallenge : '',
      }));
      router.push('/diagnostic/step2');
    }
  };

  const isOthersSelected = selectedChallenge === 'other';  return (
    <>
      <TopNavBar />
      <main className="flex-grow flex flex-col items-center justify-center px-3 py-4 md:py-5">
        {/* Progress Indicator */}
        <div className="w-full max-w-4xl mb-4">
          <div className="flex justify-between items-end mb-1.5">
            <span className="text-xs font-medium text-primary uppercase tracking-widest">Paso 1 de 3</span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-primary-container w-1/3 transition-all duration-500"></div>
          </div>
        </div>

        {/* Hero Title Section */}
        <div className="text-center max-w-2xl mb-5">
          <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight leading-tight mb-2">
            ¿Cuál es el principal desafío operativo de tu negocio?
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant font-body leading-relaxed">
            Selecciona la opción que mejor represente tu situación actual para que el Asistente AI pueda diseñar tu ruta de optimización.
          </p>
        </div>

        {/* Interactive Bento-ish Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-5xl mb-5">          {challenges.map((challenge) => (
            <button
              key={challenge.id}
              onClick={() => setSelectedChallenge(challenge.id)}
              className={`group text-left p-4 rounded-lg transition-all duration-300 flex flex-col items-start gap-2 ring-1 shadow-sm hover:shadow-md relative overflow-hidden cursor-pointer ${
                selectedChallenge === challenge.id
                  ? 'bg-surface-container-low border-2 border-primary bg-primary-container/5 ring-primary/20'
                  : 'bg-surface-container-lowest border-2 border-transparent hover:border-primary-container ring-on-surface/5'
              }`}
            >
              {/* Selection State Indicator */}
              {selectedChallenge === challenge.id && (
                <div className="absolute top-2 right-2">
                  <span
                    className="material-symbols-outlined text-primary text-lg"
                    data-icon="check_circle"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
              )}
              
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                selectedChallenge === challenge.id
                  ? 'bg-primary/10'
                  : 'bg-surface-container-low group-hover:bg-primary/10'
              }`}>
                <span className="material-symbols-outlined text-primary text-base" data-icon={challenge.icon}>
                  {challenge.icon}
                </span>
              </div>
              
              <div className="pr-6">
                <h3 className="text-sm font-bold text-on-surface mb-0.5">{challenge.title}</h3>
                <p className="text-xs text-on-surface-variant leading-tight">{challenge.description}</p>
              </div>
            </button>
          ))}
        </div>        {/* Conditional Input (Reveal on Otros selected) */}
        <div className={`mt-3 w-full max-w-5xl transition-opacity duration-300 ${isOthersSelected ? 'opacity-100 pointer-events-auto' : 'opacity-50 pointer-events-none'}`}>
          <div className="bg-surface-container-low p-1 rounded-lg">
            <textarea
              value={customChallenge}
              onChange={(e) => setCustomChallenge(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 text-on-surface p-2 min-h-[60px] font-body text-xs placeholder:text-outline resize-none"
              placeholder="Describe brevemente tu desafío..."
            />
            <div className="h-0.5 bg-primary transition-all duration-300" style={{
              width: customChallenge.length > 0 ? '100%' : '0%'
            }}></div>
          </div>
        </div>        {/* Action Button */}
        <div className="mt-4 flex flex-col items-center">          <button
            onClick={handleContinue}
            disabled={!selectedChallenge || (isOthersSelected && !customChallenge.trim())}
            style={{
              backgroundColor: (selectedChallenge && (!isOthersSelected || customChallenge.trim())) ? '#0077B6' : '#eceef0',
              color: (selectedChallenge && (!isOthersSelected || customChallenge.trim())) ? '#ffffff' : '#707881',
            }}
            className={`px-8 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
              selectedChallenge && (!isOthersSelected || customChallenge.trim())
                ? 'shadow-lg shadow-blue-500/20 hover:shadow-xl active:scale-95 cursor-pointer'
                : 'cursor-not-allowed opacity-50'
            }`}
          >
            Continuar
            <span className="material-symbols-outlined text-base" data-icon="arrow_forward">
              arrow_forward
            </span>
          </button>
          <p className="mt-2 text-xs text-outline font-label">Puedes volver atrás en cualquier momento para ajustar tus respuestas.</p>
        </div>
      </main>

      {/* Visual Accent Element (Decorative) */}
      <div className="fixed top-1/4 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-1/4 -left-24 w-96 h-96 bg-tertiary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
    </>
  );
}

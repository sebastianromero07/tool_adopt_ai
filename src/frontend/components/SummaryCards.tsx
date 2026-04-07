'use client';

import React from 'react';

interface SummaryCard {
  label: string;
  labelColor: string;
  title: string;
  description: string;
}

const summaryCards: SummaryCard[] = [
  {
    label: 'Punto de Partida',
    labelColor: 'text-tertiary',
    title: 'Problema que atacaremos primero',
    description:
      'Fricción en el flujo de datos entre preventa e implementación que genera retrasos de 3 días.',
  },
  {
    label: 'Impacto Esperado',
    labelColor: 'text-primary',
    title: 'Resultado operacional esperado',
    description:
      'Reducción del 40% en el tiempo de procesamiento de nuevos pedidos mediante automatización inteligente.',
  },
  {
    label: 'Métrica de Éxito',
    labelColor: 'text-[#2A915E]',
    title: 'Qué validaremos primero',
    description:
      'La precisión del agente IA en la clasificación automática de documentos operativos sin intervención humana.',
  },
];

export default function SummaryCards() {
  return (
    <section className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
      {summaryCards.map((card, index) => (
        <div key={index} className="bg-white dark:bg-surface p-8 rounded-2xl shadow-sm border border-outline-variant/30 hover:shadow-md transition-shadow">
          <h4 className={`${card.labelColor} font-bold text-xs uppercase tracking-widest mb-4`}>
            {card.label}
          </h4>
          <h3 className="font-headline text-xl font-bold mb-3">{card.title}</h3>
          <p className="text-on-surface-variant leading-relaxed">{card.description}</p>
        </div>
      ))}
    </section>
  );
}

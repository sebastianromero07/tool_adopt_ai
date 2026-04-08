'use client';

import React from 'react';

interface BusinessContextSectionProps {
  businessContext?: {
    mainChallenge: string;
    affectedArea: string;
    currentConsequence: string;
    objective: string;
  };
}

export default function BusinessContextSection({ businessContext }: BusinessContextSectionProps) {
  const cards = businessContext ? [
    { icon: 'troubleshoot', title: 'Desafío principal',   text: businessContext.mainChallenge },
    { icon: 'account_tree', title: 'Área afectada',       text: businessContext.affectedArea },
    { icon: 'warning',      title: 'Consecuencia actual', text: businessContext.currentConsequence },
    { icon: 'target',       title: 'Objetivo',            text: businessContext.objective },
  ] : [
    { icon: 'troubleshoot', title: 'Desafío principal',   text: 'Cuellos de botella críticos para escalar la operación actual.' },
    { icon: 'account_tree', title: 'Área afectada',       text: 'Operaciones y coordinación interna entre departamentos.' },
    { icon: 'warning',      title: 'Consecuencia actual', text: 'Demoras, retrabajo constante y pérdida total de visibilidad operativa.' },
    { icon: 'target',       title: 'Objetivo',            text: 'Reducir fricción operativa y aumentar drásticamente la capacidad de respuesta.' },
  ];

  return (
    <section className="mb-20">
      {/* Label de sección */}
      <div className="flex items-baseline gap-4 mb-8">
        <span className="text-tertiary font-headline font-bold text-sm tracking-widest uppercase">
          01 / Contexto
        </span>
        <h2 className="font-headline text-3xl font-bold">Lectura del negocio</h2>
      </div>

      {/* Grid de 4 tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-primary shadow-sm"
          >
            <span className="material-symbols-outlined text-primary mb-4 block">
              {card.icon}
            </span>
            <h3 className="font-headline font-bold text-lg mb-2">{card.title}</h3>
            <p className="text-on-surface-variant text-sm">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
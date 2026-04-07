'use client';

import React from 'react';

interface ContextCard {
  icon: string;
  title: string;
  description: string;
}

const contextCards: ContextCard[] = [
  {
    icon: 'troubleshoot',
    title: 'Desafío principal',
    description: 'Cuellos de botella críticos para escalar la operación actual.',
  },
  {
    icon: 'account_tree',
    title: 'Área afectada',
    description: 'Operaciones y coordinación interna entre departamentos.',
  },
  {
    icon: 'warning',
    title: 'Consecuencia actual',
    description: 'Demoras, retrabajo constante y pérdida total de visibilidad operativa.',
  },
  {
    icon: 'target',
    title: 'Objetivo',
    description: 'Reducir fricción operativa y aumentar drásticamente la capacidad de respuesta.',
  },
];

export default function BusinessContextSection() {
  return (
    <section className="mb-20">
      <div className="flex items-baseline gap-4 mb-8">
        <span className="text-tertiary font-headline font-bold text-sm tracking-widest uppercase">
          01 / Contexto
        </span>
        <h2 className="font-headline text-3xl font-bold">Lectura del negocio</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contextCards.map((card, index) => (
          <div
            key={index}
            className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="material-symbols-outlined text-primary mb-4 text-2xl block" data-icon={card.icon}>
              {card.icon}
            </span>
            <h3 className="font-headline font-bold text-lg mb-2">{card.title}</h3>
            <p className="text-on-surface-variant text-sm">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

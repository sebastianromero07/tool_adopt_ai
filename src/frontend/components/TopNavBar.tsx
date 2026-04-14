'use client';

import React from 'react';
import Link from 'next/link';

export default function TopNavBar() {
  return (
    <nav className="w-full top-0 sticky z-50 bg-surface border-none shadow-sm">
      <div className="flex justify-between items-center px-12 py-4 w-full max-w-screen-2xl mx-auto">        {/* Logo */}
        <Link href="/diagnostic/step1" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined text-2xl text-primary">smart_toy</span>
          <span className="font-bold text-lg text-on-background">AdoptAI</span>
        </Link>

        {/* Botón Inicio */}
        <Link 
          href="/diagnostic/step1"
          className="px-6 py-2 rounded-lg bg-primary text-on-primary font-semibold text-sm hover:shadow-md transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-base">home</span>
          Inicio
        </Link>
      </div>
    </nav>
  );
}

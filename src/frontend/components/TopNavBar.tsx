'use client';

import React from 'react';
import Link from 'next/link';

export default function TopNavBar() {
  return (
    <nav className="w-full top-0 sticky z-50 bg-surface border-none shadow-sm">
      <div className="flex justify-between items-center px-12 py-4 w-full max-w-screen-2xl mx-auto">
        {/* Logo */}
        <Link href="/diagnostic/step1" className="flex items-center gap-3">
          <img 
            src="https://lh3.googleusercontent.com/aida/ADBb0ujO9A16e-JFAyHV839g47AL4yIM6xioUGvq9Vu8UABPAWw2Ifih_O_JDqZNRb2zoICEKSUryt4rvng-T6QqtLIzmM8vScaawQ4mowDuNKp3u2QuUXsCbP6gn0dyXH9wRwyfWhcueDwrw_u1Xm2A_gLdhUutzySm1gWQu9OkNKmt_56Szyx4nJGTO_5ZwOwL9uJsDr852ksNMc654l4F2HWXYkKv90PdgEdBk6lq34kiUeMfVeWzWCdSI04w5r_UlL5PpHZYrRuvJW4"
            alt="AdoptAI Logo"
            className="h-8 w-auto object-contain hover:opacity-80 transition-opacity"
          />
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

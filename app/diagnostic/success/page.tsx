'use client';

import Link from 'next/link';
import TopNavBar from '@/src/frontend/components/TopNavBar';

export default function Page() {
  return (
    <>
      <TopNavBar />
      <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        {/* Success icon */}
        <div className="mb-8 text-7xl">✓</div>

        {/* Success message */}
        <h1 className="text-4xl font-bold text-on-background mb-3 text-center">
          ¡Diagnóstico enviado exitosamente!
        </h1>
        <p className="text-lg text-outline mb-8 text-center max-w-2xl">
          Hemos recibido tu información y tu solicitud está siendo procesada por nuestro equipo de IA. 
          Recibirás un email de confirmación en los próximos minutos.
        </p>

        {/* Next steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-variant">
            <div className="text-3xl mb-3">📧</div>
            <h3 className="text-lg font-semibold text-on-background mb-2">
              Email de confirmación
            </h3>
            <p className="text-sm text-outline">
              Revisa tu bandeja de entrada para el correo de confirmación
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-variant">
            <div className="text-3xl mb-3">⏱️</div>
            <h3 className="text-lg font-semibold text-on-background mb-2">
              Análisis en curso
            </h3>
            <p className="text-sm text-outline">
              Nuestro AI analiza tu contexto en tiempo real
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-variant">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-on-background mb-2">
              Tu hoja de ruta
            </h3>
            <p className="text-sm text-outline">
              Recibe una estrategia personalizada en 24 horas
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="px-8 py-3 rounded-full border border-outline text-on-background font-medium hover:bg-surface-container transition-colors text-center"
          >
            Volver al inicio
          </Link>
          <Link
            href="/roadmap"
            className="px-8 py-3 rounded-full bg-primary text-on-primary font-medium hover:shadow-lg transition-all text-center"
          >
            Ver hoja de ruta de ejemplo
          </Link>
        </div>
      </main>
    </>
  );
}

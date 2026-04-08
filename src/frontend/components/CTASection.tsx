'use client';

import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export default function CTASection() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    const element = document.getElementById('roadmap-content');
    if (!element) {
      alert('No se encontró el contenido del roadmap para descargar.');
      return;
    }

    setIsDownloading(true);

    try {
      // 1. Tomamos la "foto" EXACTA sin alterar sus dimensiones con padding
      const dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 2, 
        backgroundColor: '#f7f9fb', 
      });

      // 2. Definimos las medidas (Márgenes de 15mm)
      const margin = 15;
      const pdfWidth = 210; // Ancho A4 estándar en mm
      const contentWidth = pdfWidth - (margin * 2);
      
      // 3. Calculamos la proporción matemática exacta
      const contentHeight = (element.offsetHeight * contentWidth) / element.offsetWidth;

      // 4. Creamos el PDF sumando los márgenes arriba y abajo
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: [pdfWidth, contentHeight + (margin * 2)]
      });

      // 5. Agregamos la foto con su margen X e Y
      pdf.addImage(dataUrl, 'PNG', margin, margin, contentWidth, contentHeight);
      pdf.save('AdoptAI_Roadmap_Estrategico.pdf');
      
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      alert('Hubo un error al generar el documento. Por favor, intenta nuevamente.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
  <section className="bg-on-secondary-fixed text-white rounded-3xl p-12 overflow-hidden relative">
    {/* Contenido */}
    <div className="relative z-10 max-w-2xl">
      <h2 className="font-headline text-4xl font-extrabold mb-4 leading-tight">
        Listo para validar tu primera intervención
      </h2>
      <p className="text-slate-300 text-lg mb-8">
        Agenda una sesión de diagnóstico personalizada con nuestro equipo consultor
        para definir tu primer caso de uso viable.
      </p>
      <div className="flex flex-wrap gap-4">
        <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-container transition-all flex items-center gap-2">
          <span className="material-symbols-outlined">event</span>
          Agendar diagnóstico
        </button>
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-2 disabled:opacity-70"
        >
          {isDownloading ? (
            <>
              <span className="material-symbols-outlined animate-spin">sync</span>
              Generando PDF...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">download</span>
              Descargar roadmap
            </>
          )}
        </button>
      </div>
    </div>

    {/* Decoración blur */}
    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
    <div className="absolute right-20 top-0 w-40 h-40 bg-tertiary/20 rounded-full blur-[60px]" />
  </section>
);
}
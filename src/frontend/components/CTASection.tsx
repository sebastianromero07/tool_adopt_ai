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
    <section className="bg-[#101c2e] text-white rounded-3xl p-12 overflow-hidden relative shadow-lg mt-12">
      <div className="relative z-10 max-w-2xl">
        <h2 className="font-headline text-4xl font-extrabold mb-4 leading-tight">
          Listo para validar tu primera intervención
        </h2>
        <p className="text-slate-300 text-lg mb-8">
          Agenda una sesión de diagnóstico personalizada con nuestro equipo consultor para definir tu primer caso de uso viable.
        </p>
        <div className="flex flex-wrap gap-4">
          
          <a 
            href="https://api.whatsapp.com/send/?phone=51991735542&text=Hola%2C+vi+su+web+y+me+interesa+agendar+una+llamada+con+AdoptAI&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0077B6] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#0095D9] transition-all flex items-center gap-2 shadow-md"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>event</span>
            Agendar diagnóstico
          </a>

          <button 
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className={`bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 ${
              isDownloading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-white/20 cursor-pointer'
            }`}
          >
            {isDownloading ? (
              <>
                <span className="material-symbols-outlined animate-[spin_1s_linear_infinite]" style={{ fontVariationSettings: "'FILL' 1" }}>sync</span>
                Generando PDF...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>download</span>
                Descargar roadmap
              </>
            )}
          </button>

        </div>
      </div>
      
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#0077B6]/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute right-20 top-0 w-40 h-40 bg-[#745b00]/20 rounded-full blur-[60px] pointer-events-none"></div>
    </section>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import TopNavBar from '@/src/frontend/components/TopNavBar';
import RoadmapHero from '@/src/frontend/components/RoadmapHero';
import BusinessContextSection from '@/src/frontend/components/BusinessContextSection';
import RoadmapTimeline from '@/src/frontend/components/RoadmapTimeline';
import SummaryCards from '@/src/frontend/components/SummaryCards';
import CTASection from '@/src/frontend/components/CTASection';

interface RoadmapData {
  id: string;
  roadmap_content: {
    stages: Array<any>;
    recommendations: string;
    roi_estimate: number;
    timeline_months: number;
    keyMetrics: string[];
  };
  generated_at: string;
  status: string;
}

export default function Page() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!sessionId) {
      setError('No se encontró la sesión de diagnóstico');
      setLoading(false);
      return;
    }

    const fetchRoadmap = async () => {
      try {
        console.log(`🔄 Intentando obtener roadmap (intento ${retryCount + 1})...`);
        
        const response = await fetch(`/api/diagnostic/roadmap/get?sessionId=${sessionId}`);
        
        if (response.status === 404) {
          if (retryCount < 5) {
            console.log(`⏳ Roadmap aún no está listo, reintentando en 2 segundos...`);
            setTimeout(() => {
              setRetryCount(retryCount + 1);
            }, 2000);
          } else {
            setError('El roadmap está tardando más de lo esperado. Por favor, intenta nuevamente en unos momentos.');
            setLoading(false);
          }
          return;
        }

        if (!response.ok) {
          throw new Error('Error al cargar el roadmap');
        }

        const data = await response.json();
        console.log('✅ Roadmap cargado exitosamente:', data);
        setRoadmapData(data);
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error('❌ Error cargando roadmap:', err);
        setError('Error al cargar el roadmap personalizado');
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [sessionId, retryCount]);

  if (loading) {
    return (
      <>
        <TopNavBar />
        <main className="max-w-7xl mx-auto px-8 py-12 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="mb-4">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
            <h2 className="text-2xl font-bold text-on-background mb-2">
              Generando tu roadmap personalizado...
            </h2>
            <p className="text-on-surface-variant">
              La IA está analizando tu información y creando un plan estratégico único para tu empresa.
            </p>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <TopNavBar />
        <main className="max-w-7xl mx-auto px-8 py-12 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="mb-4 text-4xl">⚠️</div>
            <h2 className="text-2xl font-bold text-on-background mb-2">Error</h2>
            <p className="text-on-surface-variant mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary text-on-primary rounded-lg hover:shadow-md transition-all"
            >
              Reintentar
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <TopNavBar />
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div id="roadmap-content" className="bg-white">
          <RoadmapHero />
          <BusinessContextSection />
          
          {/* Mostrar el roadmap generado por IA */}
          {roadmapData && roadmapData.roadmap_content && (
            <section className="mb-20">
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-tertiary font-headline font-bold text-sm tracking-widest uppercase">
                  02 / Etapas
                </span>
                <h2 className="font-headline text-3xl font-bold">Tu ruta de transformación</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {roadmapData.roadmap_content.stages.map((stage: any, index: number) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-xl border border-primary/20 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        {stage.number}
                      </div>
                      <div>
                        <h3 className="font-headline font-bold text-lg text-on-background">
                          {stage.title}
                        </h3>
                        <p className="text-sm text-tertiary font-semibold">{stage.duration}</p>
                      </div>
                    </div>

                    <p className="text-on-surface-variant text-sm mb-4">{stage.description}</p>

                    <div className="mb-4">
                      <p className="text-xs font-semibold text-primary uppercase mb-2">Enfoque</p>
                      <p className="text-sm text-on-background">{stage.focus}</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-secondary uppercase mb-2">Entregables</p>
                      <ul className="space-y-1">
                        {stage.deliverables && stage.deliverables.map((deliverable: string, idx: number) => (
                          <li key={idx} className="text-sm text-on-surface-variant flex items-start gap-2">
                            <span className="text-primary mt-1">✓</span>
                            <span>{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Métricas clave */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-surface-container p-6 rounded-xl text-center border border-surface-variant">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {roadmapData.roadmap_content.roi_estimate}%
                  </div>
                  <p className="text-on-surface-variant text-sm">ROI Estimado</p>
                </div>

                <div className="bg-surface-container p-6 rounded-xl text-center border border-surface-variant">
                  <div className="text-3xl font-bold text-secondary mb-2">
                    {roadmapData.roadmap_content.timeline_months}
                  </div>
                  <p className="text-on-surface-variant text-sm">Meses de Implementación</p>
                </div>

                <div className="bg-surface-container p-6 rounded-xl text-center border border-surface-variant">
                  <div className="text-3xl font-bold text-tertiary mb-2">
                    {roadmapData.roadmap_content.keyMetrics?.length || 0}
                  </div>
                  <p className="text-on-surface-variant text-sm">Métricas de Éxito</p>
                </div>
              </div>

              {/* Recomendaciones */}
              <div className="mt-12 bg-secondary/5 p-8 rounded-xl border border-secondary/20">
                <h3 className="font-headline font-bold text-xl text-on-background mb-4">
                  Recomendaciones Estratégicas
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  {roadmapData.roadmap_content.recommendations}
                </p>
              </div>
            </section>
          )}

          <SummaryCards />
        </div>
        <CTASection />
      </main>
    </>
  );
}

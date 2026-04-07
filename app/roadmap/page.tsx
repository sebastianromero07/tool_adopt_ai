'use client';

import RoadmapHero from '@/src/frontend/components/RoadmapHero';
import BusinessContextSection from '@/src/frontend/components/BusinessContextSection';
import RoadmapTimeline from '@/src/frontend/components/RoadmapTimeline';
import SummaryCards from '@/src/frontend/components/SummaryCards';
import CTASection from '@/src/frontend/components/CTASection';

export default function Page() {
  return (
    <main className="max-w-7xl mx-auto px-8 py-12">
      {/* Todo lo que esté dentro de este DIV saldrá en el PDF */}
      <div id="roadmap-content" className="bg-[#f7f9fb] p-8 -mx-8">
        <RoadmapHero />
        <BusinessContextSection />
        <RoadmapTimeline />
        <SummaryCards />
      </div>
      
      {/* El CTA se queda afuera para que los botones no salgan impresos en el PDF */}
      <CTASection />
    </main>
  );
}
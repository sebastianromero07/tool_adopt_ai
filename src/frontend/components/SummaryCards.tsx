export default function SummaryCards() {
  return (
    <section className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-outline-variant/30">
        <h4 className="text-tertiary font-bold text-xs uppercase tracking-widest mb-4">
          Punto de Partida
        </h4>
        <h3 className="font-headline text-xl font-bold mb-3">
          Problema que atacaremos primero
        </h3>
        <p className="text-on-surface-variant leading-relaxed">
          Fricción en el flujo de datos entre preventa e implementación que genera retrasos de 3 días.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-outline-variant/30">
        <h4 className="text-primary font-bold text-xs uppercase tracking-widest mb-4">
          Impacto Esperado
        </h4>
        <h3 className="font-headline text-xl font-bold mb-3">
          Resultado operacional esperado
        </h3>
        <p className="text-on-surface-variant leading-relaxed">
          Reducción del 40% en el tiempo de procesamiento de nuevos pedidos mediante automatización inteligente.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-outline-variant/30">
        <h4 className="text-[#2A915E] font-bold text-xs uppercase tracking-widest mb-4">
          Métrica de Éxito
        </h4>
        <h3 className="font-headline text-xl font-bold mb-3">
          Qué validaremos primero
        </h3>
        <p className="text-on-surface-variant leading-relaxed">
          La precisión del agente IA en la clasificación automática de documentos operativos sin intervención humana.
        </p>
      </div>
    </section>
  );
}
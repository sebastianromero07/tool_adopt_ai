# AdoptAI — Simulador de Transformación Operativa

**Demo en vivo:** [enlace]  
**Video:** [Loom / YouTube — 2-3 min]

---

## Por qué este reto

Cuando leí las tres opciones disponibles, el Tercer Reto me atrapó de inmediato: crear algo con **impacto comercial directo** para AdoptAI, no solo un ejercicio técnico.

Mi primera pregunta fue honesta: *¿qué hace AdoptAI que yo pueda mostrar de forma interactiva?* La respuesta estaba en su metodología de 4 pasos. Si lograba que un cliente potencial la *experimentara* antes de contratar, la herramienta se vendería sola.

Esa intuición me llevó a construir un **simulador de roadmap personalizado**: el cliente describe su problema, la IA genera un plan de ataque real siguiendo exactamente los 4 pasos de AdoptAI, y en el camino la agencia captura un lead calificado con toda la información que necesita para cerrar.

---

## El primer obstáculo: las preguntas equivocadas

Empecé donde era lógico: pedirle a Gemini que me ayudara a diseñar el formulario de diagnóstico.

Su primera sugerencia fue un desastre. Me propuso preguntas como *"¿Usas Excel?"* o *"¿Tu equipo usa WhatsApp para coordinar?"*. Demasiado específicas, demasiado tácticas. Si el cliente tenía un SAP que funcionaba mal, esas preguntas no capturaría nada útil.

Tuve que frenar y replantear. Le pedí a la IA que pensara en **problemas estructurales de negocio**, no en herramientas. Después de varias rondas, llegamos a un flujo de dos pasos que me convenció:

1. **Pastillas de selección rápida** — cuatro categorías amplias: sobrecostos, cuellos de botella, caos operativo, o problema personalizado.
2. **Una sola pregunta abierta** — *"¿Cómo funciona este proceso hoy y en qué punto exacto se rompe?"*

Simple. Sin supuestos. El cliente describe su realidad, no la que nosotros imaginamos.

---

## El problema de que la IA devuelva texto libre

Una vez resuelto el input, llegó el reto técnico más interesante: **¿cómo convierto la respuesta de Gemini en una visualización rica?**

Si la IA devolvía un bloque de texto, el frontend tendría que interpretarlo, y eso era frágil. Decidí que la única forma de hacer esto robusto era obligar al modelo a responder **exclusivamente en JSON estructurado**.

Diseñé un System Prompt estricto que especificaba campo por campo lo que esperaba: el contexto del negocio, las etapas del roadmap con duraciones y entregables, métricas clave, ROI estimado. El frontend entonces simplemente *mapea* esos datos en componentes visuales. Cero interpretación manual.

```javascript
{
  businessContext: { mainChallenge, affectedArea, currentConsequence, objective },
  stages: [{ number, title, description, duration, focus, deliverables }],
  summary: { startingPoint, expectedImpact, successMetric },
  roi_estimate: 35,
  timeline_months: 6
}
```

El resultado fue que el 99% de las veces Gemini devolvía exactamente lo que necesitaba. Para el 1% restante, implementé un sistema de fallback con roadmaps predefinidos por tipo de desafío — el usuario nunca ve un error.

---

## De roadmap a motor de ventas

En algún punto durante el desarrollo me di cuenta de algo: la herramienta no era solo útil para el cliente, era **extraordinariamente valiosa para el equipo de ventas de AdoptAI**.

Cada vez que alguien completa el diagnóstico, el sistema guarda automáticamente su nombre, empresa, problema y el roadmap generado en Supabase, y dispara cuatro emails:

- Confirmación al cliente
- Alerta inmediata al equipo de ventas con el resumen del lead
- Roadmap completo al cliente
- Informe detallado al equipo con todos los datos de contacto y el roadmap generado

AdoptAI ya no necesita preguntar *"¿cuál es tu problema?"* en la primera llamada. Ya lo sabe.

---

## La visualización: que se sienta como un entregable real

El roadmap no podía ser texto en una página. Quería que el cliente lo mirara y pensara *"esto es profesional, esto es lo que quiero"*.

Construí cuatro componentes que trabajan juntos:

- **BusinessContextSection** — cuatro tarjetas que reflejan el diagnóstico del negocio
- **RoadmapTimeline** — línea temporal con las etapas, duraciones y entregables
- **SummaryCards** — punto de partida, impacto esperado, métrica de éxito
- **CTASection** — descarga en PDF con html2canvas + jsPDF, y botón para agendar diagnóstico real

El PDF fue más complicado de lo que esperaba. Tuve que calcular proporciones matemáticas exactas para que la captura del DOM escalara perfectamente a A4 sin distorsión.

---

## Stack final

| Capa | Tecnología | Por qué |
|---|---|---|
| Frontend | Next.js 16 + Tailwind CSS | Velocidad de desarrollo y componentes limpios |
| Backend | Next.js API Routes + TypeScript | Lógica segura sin exponer claves |
| IA | Google Gemini 2.5 Flash | Velocidad (~200ms) y modo JSON nativo |
| Base de datos | Supabase (PostgreSQL) | Leads, sesiones y roadmaps persistidos |
| Email | Resend | Confiable para las 4 notificaciones automáticas |
| PDF | html2canvas + jsPDF | Captura fiel del DOM sin backend pesado |
| Deploy | Vercel | Auto-deploy desde GitHub |

---

## Lo que aprendí construyendo esto

**La IA no adivina el contexto.** Gemini me dio respuestas genéricas hasta que le di el marco correcto. Guiar a la IA es una habilidad, no un workaround.

**El fallback no es plan B, es parte del diseño.** Un sistema que falla en producción pierde la confianza del usuario para siempre. Mejor entregar algo predefinido y útil que un error elegante.

**Forzar JSON estructurado fue el game-changer.** El momento en que el frontend dejó de interpretar texto y empezó a mapear datos, todo se volvió simple y predecible.

**El valor real no era el roadmap bonito.** Era el lead calificado que llega al equipo de ventas con el problema ya descrito, listo para una conversación productiva.

---

*Construido en Abril 2026 — v1.0.0*
# AdoptAI - Simulador de Transformación Operativa

**Demo en vivo:** [Enlace a tu despliegue en Vercel/Render, ej: adoptai-simulador.vercel.app]  
**Video Demostración:** [Enlace a Loom o YouTube con tu presentación de 2 mins]

## El Reto Elegido: Opción 3 (Valor para AdoptAI)
Comencé leyendo los retos y me incliné rápidamente por el **Tercer Reto**. Me motivó la idea de crear una herramienta que no solo fuera técnica, sino que tuviera un impacto comercial directo. 

En lugar de quedarme con una sola idea fija, decidí combinar varias sugerencias del reto: construí una **herramienta de demostración** que visualiza el poder de la IA, pero empaquetada como un **motor de marketing y cualificación de leads** para recolectar información valiosa de los clientes potenciales.

---

## ¿Qué es esta herramienta?
Es un "Simulador de Roadmap" interactivo. Un cliente potencial con problemas operativos ingresa a la web, describe su dolor en dos sencillos pasos, y la aplicación (potenciada por LLMs) genera un plan de ataque personalizado estructurado **exactamente en los 4 pasos metodológicos de AdoptAI** (Diagnóstico, Diseño, Implementación iterativa y Mantenimiento). 

---

## Diario de Desarrollo y Uso de IA (El Proceso)

Aquí detallo cómo abordé el problema, qué aprendí y cómo utilicé la IA como copiloto, no solo para escribir código, sino para diseñar el producto.

### 1. Ideación y el problema del "Contexto"
Yo ya tenía decidido graficar en una línea temporal cómo trabaja AdoptAI para resolver los problemas de las empresas. Pero me preguntaba: *¿Cómo interviene la IA aquí sin que parezca un simple ChatGPT incrustado?* Me surgió la idea de comenzar con unas preguntas específicas para que el LLM del backend tuviera contexto del problema y el roadmap fuera 100% personalizado.

### 2. Iteración de Prompts (Yo vs. Gemini)
Comencé a interactuar con Gemini para pelotear ideas sobre qué preguntas hacerle al cliente en la interfaz.

* **El primer intento de la IA:** Gemini me sugirió preguntas demasiado específicas, asumiendo de antemano que el cliente usaba Excel, WhatsApp o que solo quería automatizar tareas manuales.
* **Mi corrección (Autonomía):** Me di cuenta de que esto cerraba puertas. ¿Qué pasaba si el cliente quería rediseñar un proceso para escalar, o si ya usaba un software costoso que funcionaba mal? Le pedí a la IA que pivotara hacia preguntas más generales y estratégicas.
* **La Solución Final:** Decidí dividir el *input* en dos pasos optimizados para UX:
    1.  **Selección Rápida (Pastillas):** Categorías amplias de problemas (Sobrecostos, Cuellos de botella para escalar, Dependencias/Caos). Incluí una opción "Otros" para dar total libertad.
    2.  **Contexto Abierto:** Una sola pregunta precisa: *"¿Cómo funciona este proceso hoy en día y en qué punto exacto se rompe?"*.

### 3. Del Texto al Diseño Estructurado (JSON)
El mayor desafío técnico fue evitar que la IA devolviera un bloque de texto aburrido. Quería una interfaz visual rica. 
Diseñé un *System Prompt* estricto en el backend para obligar al modelo a devolver un `JSON` con campos específicos (`diagnostico_ejecutivo`, `paso_1_narrativa`, `hipotesis_tecnologica`). Así, el frontend simplemente mapea estos datos en tarjetas interactivas, líneas de tiempo y *badges* de duración estimada.

---

## Stack Tecnológico
* **Frontend:** [Ej: React / Next.js / Tailwind CSS] - Generación inicial de componentes UI apoyada con [Ej: v0 de Vercel / Cursor / Stitch].
* **Backend:** [Ej: Node.js con Express / Python FastAPI] - Para manejar la lógica de forma segura sin exponer API Keys.
* **IA Model:** [Ej: API de Gemini 1.5 Flash / Claude 3 Haiku] - Elegido por su velocidad para generar el JSON dinámico.
* **Despliegue (Shipping):** [Ej: Frontend en Vercel, Backend en Render].

---

## Alineación con la Rúbrica de AdoptAI

* **Uso de la IA:** Utilizada en tres capas. 1) *Product Management* (peloteo de ideas y refinamiento de UX con Gemini). 2) *Coding* (generación de componentes UI y boilerplate). 3) *Core Feature* (Llamada a la API del LLM como motor de la aplicación).
* **Creatividad:** Fui más allá de "automatizar una tarea". Construí un producto B2B que vende los servicios de la agencia educando al cliente sobre cómo trabaja AdoptAI.
* **Autonomía:** No acepté la primera respuesta de la IA. Identifiqué los sesgos en sus preguntas sugeridas y las rediseñé para que abarcaran problemas estructurales (escalabilidad, rediseño) y no solo "macros de Excel".
* **Shipping:** Proyecto full-stack funcional y desplegado en la nube.

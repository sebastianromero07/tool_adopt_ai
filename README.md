# 🚀 AdoptAI - Plataforma de Transformación Digital con IA

**Diagnóstico inteligente → Roadmap personalizado → Ejecución guiada**

Una plataforma full-stack que guía a empresas a través de un proceso de diagnóstico de 3 pasos, genera roadmaps estratégicos personalizados con IA (Google Gemini), y envía notificaciones por email tanto al cliente como al equipo.

---

## 📋 Descripción del Proyecto

AdoptAI es un sistema que:

1. **Recopila información** del cliente en 3 pasos (desafío, contexto, datos personales)
2. **Genera roadmaps** automáticamente usando Google Gemini AI
3. **Envía emails personalizados** con confirmación y roadmap completo
4. **Permite descargar PDF** del roadmap generado

### Flujo Automatizado

```
Cliente completa diagnóstico
    ↓
Se guarda en Supabase (diagnostic_sessions)
    ↓
Sistema genera roadmap con IA en background
    ↓
Se envían 2 emails:
  📧 Confirmación al cliente con roadmap completo
  🔔 Notificación al equipo (NOTIFICATION_EMAIL) con datos del cliente + roadmap
    ↓
Cliente puede descargar PDF o ver en web
```

---

## 🎯 Paso a Paso - Cómo se Construyó

### FASE 1: Configuración Base (Next.js 16 + Tailwind)

**Paso 1.1** - Crear proyecto Next.js con Turbopack
```bash
npx create-next-app@latest tool_adopt_ai --typescript --tailwind --app
cd tool_adopt_ai
npm run dev
```

**Paso 1.2** - Instalar dependencias principales
```bash
npm install @supabase/supabase-js resend dotenv zod html2canvas jspdf
```

**Paso 1.3** - Configurar Tailwind CSS con variables de color Material Design 3

---

### FASE 2: Infraestructura Backend

**Paso 2.1** - Crear cliente Supabase
- **Archivo**: `src/backend/config/supabase.ts`
- Configura cliente público (para el navegador)
- Configura cliente con service role key (para el servidor)
- Permitir leer/escribir datos del backend

**Paso 2.2** - Crear tablas en Supabase
- **Archivo**: `src/backend/database/migrations.sql`
- **Tabla 1**: `diagnostic_sessions`
  - id, client_name, email, company, position, main_challenge, context, employee_count
  - created_at, updated_at, status
- **Tabla 2**: `roadmap_results`
  - id, diagnostic_session_id, roadmap_content (JSON), stages, recommendations
  - roi_estimate, timeline_months, status, generated_at

**Paso 2.3** - Configurar Resend para emails
- **Archivo**: `src/backend/config/resend.ts`
- **4 funciones exportadas**:
  1. `sendDiagnosticConfirmation(email, clientName)` - Confirma recepción de diagnóstico
  2. `sendLeadNotification(clientName, clientEmail, company, mainChallenge, context)` - Notifica al equipo
  3. `sendRoadmapGenerated(email, clientName, roadmapData, company)` - Envía roadmap AL CLIENTE
  4. `sendRoadmapNotificationToTeam(clientName, clientEmail, company, mainChallenge, context, roadmapData)` - Notifica AL EQUIPO

**Paso 2.4** - Servicio de diagnósticos
- **Archivo**: `src/backend/services/diagnosticService.ts`
- Función `scheduleDiagnosticSession()`:
  1. Guarda sesión en Supabase
  2. Envía email de confirmación al cliente
  3. Envía notificación al equipo sobre nuevo lead

---

### FASE 3: Generación de Roadmaps con IA

**Paso 3.1** - Servicio de generación con Google Gemini
- **Archivo**: `src/backend/services/roadmapGenerationService.ts`
- **Interfaz `RoadmapGenerated`** con:
  ```typescript
  {
    stages: [
      {
        number: 1,
        title: "Etapa 1",
        description: "...",
        duration: "3 semanas",
        focus: "...",
        deliverables: ["entregable1", "entregable2"]
      }
    ],
    businessContext: {
      mainChallenge: "Desafío identificado",
      affectedArea: "Área del negocio",
      currentConsequence: "Consecuencia actual",
      objective: "Objetivo a alcanzar"
    },
    summary: {
      startingPoint: "Punto de partida",
      expectedImpact: "Impacto esperado",
      successMetric: "Métrica de éxito"
    },
    roi_estimate: 35,
    timeline_months: 6,
    keyMetrics: ["métrica1", "métrica2"],
    recommendations: "Recomendaciones..."
  }
  ```

**Paso 3.2** - Prompt especializado por tipo de desafío
- `cost-overruns` - Auditoria de costos, automatización de procesos
- `bottlenecks` - Escalabilidad, mejora de infraestructura
- `chaos` - Estandarización, integración de sistemas
- `other` - Análisis personalizado genérico

**Paso 3.3** - Fallback a datos mock
- Si Google Gemini falla o no está disponible
- Genera roadmap con datos predefinidos según desafío
- Asegura que el sistema siempre entrega valor

**Paso 3.4** - Envío de 2 emails después de generar roadmap
- Obtiene datos del cliente desde `diagnostic_sessions`
- Envía email detallado AL CLIENTE con todo el roadmap
- Envía notificación AL EQUIPO (NOTIFICATION_EMAIL) con resumen + datos del cliente

---

### FASE 4: Frontend - 3 Pasos de Diagnóstico

**Paso 4.1** - Step 1: Selección de Desafío
- **Archivo**: `app/diagnostic/step1/page.tsx`
- Usuario elige entre 4 opciones de desafíos
- Guarda en localStorage bajo `diagnosticData`
- Botón "Continuar" lleva a step 2

**Paso 4.2** - Step 2: Descripción de Contexto
- **Archivo**: `app/diagnostic/step2/page.tsx`
- Textarea grande para que el usuario describa el problema operativo
- Validación: mínimo 20 caracteres
- Guarda en localStorage
- Botón "Continuar" lleva a step 3

**Paso 4.3** - Step 3: Información Personal
- **Archivo**: `app/diagnostic/step3/page.tsx`
- Formulario con campos:
  - fullName (requerido)
  - email (requerido, validación regex)
  - position (requerido)
  - company (requerido)
  - employeeCount (selector: 5-15, 15-50, 50+)
- Al hacer clic en "Generar":
  1. Valida todos los campos
  2. Envía POST a `/api/diagnostic/schedule`
  3. Recibe sessionId
  4. Guarda en localStorage
  5. Redirecciona a `/diagnostic/processing?sessionId=xxx`

---

### FASE 5: Página de Procesamiento

**Paso 5.1** - Terminal animada
- **Archivo**: `app/diagnostic/processing/page.tsx`
- Simula procesamiento de IA con efecto de máquina de escribir
- Muestra líneas de ejecución + JSON mock con datos analizados
- Barra de progreso que avanza lentamente

**Paso 5.2** - Polling para obtener roadmap
- Hace peticiones HTTP a `/api/diagnostic/roadmap/get?sessionId=xxx` cada 2 segundos
- Cuando el roadmap está listo (status 200), redirecciona a:
  `/diagnostic/roadmap?sessionId=xxx`
- Si falla después de 30 intentos, muestra error

---

### FASE 6: Página de Visualización del Roadmap

**Paso 6.1** - Componentes de visualización
- `TopNavBar.tsx` - Logo + botón Inicio
- `RoadmapHero.tsx` - Encabezado con título
- `BusinessContextSection.tsx` - Contexto dinámico (recibe props)
  - Muestra mainChallenge, affectedArea, currentConsequence, objective
- `RoadmapTimeline.tsx` - Etapas con timeline visual
  - Línea vertical
  - Bloques por etapa
  - Iconos y duración
- `SummaryCards.tsx` - Resumen dinámico (recibe props)
  - Punto de Partida | Impacto Esperado | Métrica de Éxito
- `CTASection.tsx` - Botones de acción
  - Descargar PDF
  - Compartir

**Paso 6.2** - Datos dinámicos del roadmap
- **Archivo**: `app/diagnostic/roadmap/page.tsx`
- Recibe `sessionId` de query params
- Hace fetch a `/api/diagnostic/roadmap/get?sessionId=xxx`
- Pasa `businessContext` a BusinessContextSection
- Pasa `summary` a SummaryCards
- Pasa `stages` a RoadmapTimeline
- Pasa ROI, timeline, metrics a otros componentes

**Paso 6.3** - Descarga de PDF
- **Archivo**: `src/frontend/components/CTASection.tsx`
- Obtiene el DIV con id `roadmap-content`
- Convierte DOM a imagen con `html2canvas()`
- Genera PDF con `jsPDF`
- Márgenes: 15mm en todos los lados
- Descarga como: `roadmap-[empresa]-[fecha].pdf`

---

### FASE 7: API Routes

**Paso 7.1** - POST `/api/diagnostic/schedule`
- **Archivo**: `app/api/diagnostic/schedule/route.ts`
- **Recibe**:
  ```json
  {
    "clientName": "Juan Pérez",
    "email": "juan@empresa.com",
    "company": "Acme Corp",
    "position": "CEO",
    "mainChallenge": "cost-overruns",
    "customChallenge": null,
    "context": "Descripción del problema...",
    "employeeCount": "15-50",
    "scheduledAt": "2026-04-10T14:30:00Z"
  }
  ```
- **Acción**:
  1. Valida con Zod
  2. Guarda en Supabase `diagnostic_sessions`
  3. Envía email confirmación al cliente
  4. Envía notificación al equipo
  5. Inicia generación de roadmap en background (sin esperar)
  6. Retorna `sessionId`
- **Respuesta**:
  ```json
  {
    "success": true,
    "sessionId": "uuid-xxx",
    "message": "Diagnóstico guardado. Generando roadmap..."
  }
  ```

**Paso 7.2** - GET `/api/diagnostic/roadmap/get?sessionId=xxx`
- **Archivo**: `app/api/diagnostic/roadmap/get/route.ts`
- **Acción**:
  1. Busca roadmap en Supabase `roadmap_results` donde `diagnostic_session_id = sessionId`
  2. Si existe y status='completed' → retorna datos (HTTP 200)
  3. Si no existe aún → retorna error 404
- **Respuesta exitosa**:
  ```json
  {
    "id": "uuid",
    "diagnostic_session_id": "uuid",
    "roadmap_content": { ...full roadmap object... },
    "status": "completed",
    "generated_at": "2026-04-10T14:35:00Z"
  }
  ```

---

## 🛠️ Stack Tecnológico

### Backend
- **Next.js 16.2** (App Router) - Framework full-stack
- **TypeScript** - Tipado estático
- **Node.js** - Runtime
- **Supabase/PostgreSQL** - Base de datos con filas y columnas
- **Google Gemini 2.5 Flash** - Generación de contenido con IA
- **Resend** - Servicio de envío de emails
- **Zod** - Validación de esquemas

### Frontend
- **React 19** - UI con hooks
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utility-first
- **Material Symbols** - Iconografía desde Google
- **html2canvas** - Captura de DOM a imagen
- **jsPDF** - Generación de PDFs

---

## 📁 Estructura de Carpetas

```
tool_adopt_ai/
├── app/
│   ├── api/
│   │   ├── diagnostic/
│   │   │   ├── schedule/
│   │   │   │   └── route.ts           # POST - Guardar diagnóstico
│   │   │   └── roadmap/
│   │   │       └── get/
│   │   │           └── route.ts       # GET - Obtener roadmap
│   ├── diagnostic/
│   │   ├── step1/
│   │   │   └── page.tsx               # Seleccionar desafío
│   │   ├── step2/
│   │   │   └── page.tsx               # Describir contexto
│   │   ├── step3/
│   │   │   └── page.tsx               # Datos personales
│   │   ├── processing/
│   │   │   └── page.tsx               # Terminal animada
│   │   ├── roadmap/
│   │   │   └── page.tsx               # Visualizar roadmap
│   │   └── success/
│   │       └── page.tsx               # Confirmación
│   ├── roadmap/
│   │   └── page.tsx                   # Ruta alternativa de roadmap
│   ├── layout.tsx                     # Layout principal
│   ├── page.tsx                       # Home redirect
│   └── globals.css                    # Estilos globales
├── src/
│   ├── backend/
│   │   ├── config/
│   │   │   ├── supabase.ts            # Cliente Supabase
│   │   │   └── resend.ts              # 4 funciones de email
│   │   ├── database/
│   │   │   └── migrations.sql         # Crear tablas en Supabase
│   │   ├── services/
│   │   │   ├── diagnosticService.ts   # Guardar diagnóstico + emails
│   │   │   └── roadmapGenerationService.ts  # IA con Gemini + emails
│   │   └── types/
│   ├── frontend/
│   │   ├── components/
│   │   │   ├── TopNavBar.tsx
│   │   │   ├── RoadmapHero.tsx
│   │   │   ├── BusinessContextSection.tsx   # Acepta businessContext prop
│   │   │   ├── RoadmapTimeline.tsx
│   │   │   ├── SummaryCards.tsx             # Acepta summary prop
│   │   │   ├── CTASection.tsx               # Descarga PDF
│   │   │   ├── DiagnosticModal.tsx
│   │   │   └── RoadmapDownloadModal.tsx
│   │   ├── hooks/
│   │   └── utils/
│   │       └── api.ts
│   └── types/
│       └── index.ts                   # Tipos globales
├── public/
│   ├── images/
│   └── ...
├── .env.local                         # Variables secretas
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

---

## 🔐 Variables de Entorno

Crear archivo `.env.local` en la raíz del proyecto:

```bash
# =========================================
# SUPABASE - Base de Datos
# =========================================
NEXT_PUBLIC_SUPABASE_URL=https://inoblgchzbnrfqvvlwr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# =========================================
# GOOGLE GEMINI - Generación de IA
# =========================================
GOOGLE_API_KEY=AIzaSyB6EMHhL90HZeILadEytoXHn2FhwfvK2KA

# =========================================
# RESEND - Envío de Emails
# =========================================
RESEND_API_KEY=re_VAJzPmhK_6DAAvw7UzssJG84W47yYu4Cm
NOTIFICATION_EMAIL=aries.book844@gmail.com

# =========================================
# APP CONFIG
# =========================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## ⚙️ Configuración Inicial

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Supabase
1. Ir a https://app.supabase.com
2. Crear o seleccionar proyecto
3. Copiar URL y API keys a `.env.local`
4. Ir a "SQL Editor"
5. Crear nueva query
6. Copiar contenido de `src/backend/database/migrations.sql`
7. Ejecutar query (debe mostrar "Query executed successfully")

### 3. Verificar que las tablas existen
1. En Supabase, ir a "Table Editor"
2. Verificar que existen:
   - ✅ `diagnostic_sessions`
   - ✅ `roadmap_results`

### 4. Configurar políticas RLS (Row Level Security)
1. En Supabase, ir a "Authentication" → "Policies"
2. Para cada tabla, crear policy que permita service_role

### 5. Obtener API Keys
- Google Gemini: https://aistudio.google.com/app/apikey
- Resend: https://resend.com/api-keys
- Supabase: Settings → API

### 6. Desarrollar localmente
```bash
npm run dev
```
Abre http://localhost:3000

---

## 🚀 Uso del Sistema

### Flujo Completo del Usuario

**1. Usuario accede a http://localhost:3000**
   - Se redirecciona a `/diagnostic/step1`

**2. Step 1: Selecciona desafío**
   - Elige entre: Sobrecostos, Cuellos de botella, Caos, Otro
   - Clic en "Continuar"

**3. Step 2: Describe contexto**
   - Escribe problema operativo (min 20 caracteres)
   - Clic en "Continuar"

**4. Step 3: Ingresa datos personales**
   - Nombre, email, cargo, empresa, tamaño empresa
   - Clic en "Generar"
   - **Sistema automáticamente**:
     - Guarda todo en Supabase
     - Envía email de confirmación al cliente
     - Envía notificación al equipo
     - Genera roadmap con IA en background
     - Redirecciona a página de procesamiento

**5. Página de Procesamiento**
   - Terminal animada simula generación de IA
   - Hace polling cada 2 segundos
   - Cuando roadmap está listo (estado "completed"), redirecciona

**6. Visualización del Roadmap**
   - Muestra contexto del negocio (dinámico)
   - Muestra etapas del roadmap (dinámico)
   - Muestra resumen ejecutivo (dinámico)
   - Botón para descargar PDF

**7. Descarga de PDF**
   - Usuario hace clic en "Descargar PDF"
   - Se captura el contenido visual
   - Se genera PDF con márgenes
   - Descarga automáticamente

---

## 📊 Emails Enviados

### Email 1: Confirmación al Cliente
**Cuando**: Al completar Step 3
**Destinatario**: Email del cliente
**Asunto**: ✅ Tu Diagnóstico ha sido Recibido - AdoptAI
**Contenido**:
- Confirmación de recepción
- Indicación de que se está generando roadmap
- Próximos pasos

### Email 2: Notificación de Lead
**Cuando**: Al completar Step 3
**Destinatario**: NOTIFICATION_EMAIL (aries.book844@gmail.com)
**Asunto**: 🔥 NUEVO LEAD: [Cliente] de [Empresa]
**Contenido**:
- Datos del cliente (nombre, email, empresa)
- Desafío principal
- Contexto operativo resumido
- Confirmación de que se generó roadmap

### Email 3: Roadmap al Cliente
**Cuando**: Después de generar roadmap con IA
**Destinatario**: Email del cliente
**Asunto**: 🎯 Tu Roadmap Personalizado está Listo - [Empresa]
**Contenido**:
- Contexto del negocio (mainChallenge, affectedArea, etc.)
- Resumen de impacto (startingPoint, expectedImpact, successMetric)
- Indicadores clave (ROI, timeline)
- Todas las etapas detalladas
- Métricas de éxito
- Recomendaciones estratégicas

### Email 4: Notificación de Roadmap al Equipo
**Cuando**: Después de generar roadmap con IA
**Destinatario**: NOTIFICATION_EMAIL (aries.book844@gmail.com)
**Asunto**: ✅ ROADMAP GENERADO: [Cliente] - [Empresa]
**Contenido**:
- Información del cliente (nombre, email, empresa)
- Datos del roadmap (desafío, ROI, timeline)
- Contexto operativo del cliente
- Resumen del roadmap generado
- Etapas del roadmap
- Recomendaciones

---

## 🧪 Testing Manual

### Test Completo

1. **Abre navegador**: http://localhost:3000
2. **Step 1**: Selecciona "Cuellos de botella para escalar"
3. **Step 2**: Escribe contexto
   ```
   Nuestro ERP es de 2005 y no escala. Los reportes tardan horas y el servidor se cae cuando hay picos de demanda.
   ```
4. **Step 3**: Completa formulario
   - Nombre: "Sebastian Romero"
   - Email: "sebastian@empresa.com"
   - Cargo: "CTO"
   - Empresa: "Tech Solutions"
   - Empleados: "15-50"
5. **Clic en "Generar"**
   - Debe redirigir a `/diagnostic/processing?sessionId=xxx`
6. **Espera**: La terminal animada debe avanzar
   - Después de ~10 segundos, debe redirigir a roadmap
7. **Visualiza roadmap**: Debe mostrar datos dinámicos
8. **Descarga PDF**: Botón debe generar y descargar PDF
9. **Verifica emails**:
   - Check email inbox
   - Debe tener 2-4 emails (confirmación, notificación lead, roadmap)

---

## 🐛 Troubleshooting

### "Could not find the table 'diagnostic_sessions'"
**Solución**: Ejecutar migraciones en Supabase SQL Editor

### "Missing Supabase environment variables"
**Solución**: Verificar que `.env.local` tiene `NEXT_PUBLIC_SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`

### "RESEND_API_KEY is required"
**Solución**: Agregar `RESEND_API_KEY` a `.env.local`

### "Email no se envía"
**Solución**: Verificar que `RESEND_API_KEY` es válida en https://resend.com

### "Roadmap no aparece después de generar"
**Solución**: Esperar 30 segundos máximo. Si no aparece, revisar logs del servidor

---

## 📚 Documentación de Código

### Types/Interfaces Principales

```typescript
// Roadmap generado por IA
interface RoadmapGenerated {
  stages: RoadmapStage[];
  businessContext: BusinessContext;
  summary: RoadmapSummary;
  roi_estimate: number;
  timeline_months: number;
  keyMetrics: string[];
  recommendations: string;
}

// Contexto del negocio
interface BusinessContext {
  mainChallenge: string;
  affectedArea: string;
  currentConsequence: string;
  objective: string;
}

// Resumen ejecutivo
interface RoadmapSummary {
  startingPoint: string;
  expectedImpact: string;
  successMetric: string;
}
```

---

## 🎨 Paleta de Colores (Material Design 3)

| Color | Hex | Uso |
|-------|-----|-----|
| Primary | #006196 | Botones, enlaces, acentos |
| Secondary | #535f74 | Backgrounds alternativos |
| Tertiary | #745b00 | Acentos terciarios |
| Error | #ba1a1a | Estados de error |
| Surface | #fffbfe | Backgrounds |
| On-surface | #1c1b1f | Texto principal |

---

## 📈 Próximas Mejoras

- [ ] Dashboard de analytics para el equipo
- [ ] Soporte para múltiples idiomas
- [ ] Integración con Zapier/Make
- [ ] API pública para terceros
- [ ] Versión mobile responsive mejorada
- [ ] Descarga de roadmap en otros formatos (DOCX, PPTX)
- [ ] Sistema de comentarios en roadmaps
- [ ] Integración con calendarios (Google Calendar, Outlook)
- [ ] Historial de roadmaps por cliente

---

## 📞 Soporte

Para soporte o preguntas:
- Email: support@adoptai.com
- Docs: [Documentación completa]

---

## 📝 Licencia

MIT License - Libre para usar y modificar

---

**Desarrollado con ❤️ para la transformación digital de empresas**

v1.0.0 - Abril 2026

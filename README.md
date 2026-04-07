# AdoptAI - Transformación Digital con IA

Plataforma full-stack para implementar soluciones de inteligencia artificial en organizaciones. Diagnóstico personalizado, roadmap estratégico y ejecución guiada.

## 🚀 Stack Tecnológico

### Backend
- **Next.js API Routes** - Rutas API con TypeScript
- **Node.js** - Runtime
- **Supabase/PostgreSQL** - Base de datos
- **OpenAI/Anthropic** - Generación de roadmaps con IA
- **Resend** - Envío de emails
- **Playwright** - Generación de PDFs

### Frontend
- **Next.js App Router** - Framework React con SSR
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Material Symbols** - Iconografía

## 📁 Estructura de Carpetas

```
tool_adopt_ai/
├── app/
│   ├── api/                    # API Routes del backend
│   │   ├── diagnostic/        # Endpoints de diagnósticos
│   │   └── roadmap/           # Endpoints de roadmaps
│   ├── layout.tsx             # Layout principal
│   ├── page.tsx               # Home
│   └── roadmap/
│       └── page.tsx           # Página de roadmap
├── src/
│   ├── backend/
│   │   ├── config/            # Configuraciones (Supabase, OpenAI, Resend)
│   │   ├── database/          # Migraciones SQL
│   │   ├── services/          # Lógica de negocio
│   │   └── types/             # Tipos del backend
│   ├── frontend/
│   │   ├── components/        # Componentes React
│   │   ├── hooks/             # Custom hooks
│   │   └── utils/             # Utilidades
│   └── types/                 # Tipos globales
├── public/                    # Activos estáticos
└── .env.local                 # Variables de entorno
```

## 🔐 Variables de Entorno

Crear archivo `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Resend
RESEND_API_KEY=your_resend_api_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## 💾 Base de Datos

Ejecutar migraciones en Supabase:

```sql
-- Copiar contenido de src/backend/database/migrations.sql
-- Ejecutar en el SQL Editor de Supabase
```

### Tablas Principales

- **diagnostic_sessions** - Sesiones de diagnóstico agendadas
- **roadmap_requests** - Solicitudes de roadmaps
- **roadmaps** - Roadmaps generados
- **pdf_generation_tasks** - Tareas de generación de PDFs

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

### Compilación

```bash
npm run build
npm start
```

## 📚 API Endpoints

### Diagnósticos

**POST** `/api/diagnostic/schedule`
```json
{
  "clientName": "Juan Pérez",
  "email": "juan@empresa.com",
  "company": "Acme Corp",
  "scheduledAt": "2026-04-10T14:30:00Z"
}
```

### Roadmaps

**POST** `/api/roadmap/create`
```json
{
  "clientName": "Juan Pérez",
  "email": "juan@empresa.com",
  "company": "Acme Corp",
  "problemStatement": "Problema operacional...",
  "expectedImpact": "Impacto esperado...",
  "successMetric": "Métrica de éxito..."
}
```

## 🎨 Paleta de Colores

Basada en Material Design 3:

- **Primary** - `#006196` (Azul)
- **Secondary** - `#535f74` (Gris azulado)
- **Tertiary** - `#745b00` (Ocre)
- **Error** - `#ba1a1a` (Rojo)

## 📖 Componentes Principales

### Frontend Components
- `TopNavBar` - Barra de navegación superior
- `RoadmapHero` - Sección hero del roadmap
- `BusinessContextSection` - Contexto del negocio
- `RoadmapTimeline` - Timeline de fases
- `SummaryCards` - Tarjetas de resumen
- `CTASection` - Call to action
- `DiagnosticModal` - Modal para agendar diagnósticos
- `RoadmapDownloadModal` - Modal para generar roadmaps

## 🔧 Servicios Backend

### diagnosticService.ts
- `scheduleDiagnosticSession()` - Agendar sesión
- `getDiagnosticSession()` - Obtener sesión
- `updateDiagnosticStatus()` - Actualizar estado

### roadmapService.ts
- `createRoadmapRequest()` - Crear solicitud
- `generateRoadmap()` - Generar con IA
- `getRoadmapRequest()` - Obtener solicitud

## 📧 Emails

Plantillas de email enviadas mediante Resend:

1. **Confirmación de Diagnóstico** - Confirmación del agendamiento
2. **Roadmap Generado** - Enlace de descarga del roadmap

## 🧪 Testing

```bash
npm run test
```

## 📝 Licencia

MIT

## 🤝 Soporte

Para soporte: support@adoptai.com

---

**Desarrollado con ❤️ para la transformación digital**

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

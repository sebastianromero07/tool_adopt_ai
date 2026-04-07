# 🚀 Setup Completo: Supabase + Resend + Flujo de Diagnóstico

## ✅ Checklist de Configuración

### 1. **Supabase - Crear Tablas**

Ve a tu proyecto Supabase:
1. Haz clic en **"SQL Editor"** en el panel izquierdo
2. Haz clic en **"New Query"**
3. Copia y pega el contenido de `src/backend/database/migrations.sql`
4. Haz clic en **"Run"**

Esto creará:
- ✅ `diagnostic_sessions` - Almacena datos del usuario + diagnóstico
- ✅ `roadmap_results` - Almacena roadmaps generados por IA
- ✅ `leads_analytics` - Para dashboard interno

### 2. **Supabase - Configurar Políticas de Seguridad**

Ve a **"Authentication" → "Policies"** y crea estas políticas:

#### Política para `diagnostic_sessions`:

```sql
-- Crear nueva sesión (Service Role solo)
CREATE POLICY "service_role_insert" ON diagnostic_sessions
  FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

-- Lectura pública (si es necesario)
CREATE POLICY "public_read" ON diagnostic_sessions
  FOR SELECT
  USING (true);
```

#### Política para `roadmap_results`:

```sql
CREATE POLICY "service_role_manage" ON roadmap_results
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
```

### 3. **Variables de Entorno - `.env.local`**

Ya están configuradas:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://inoblgchzbnrfqvvlwr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Resend
RESEND_API_KEY=re_VAJzPmhK...
NOTIFICATION_EMAIL=contacto@adoptai.com
```

✅ Ya está hecho, no necesitas cambiar nada aquí.

---

## 🎯 Flujo Completo: Cómo Funciona

```
┌─────────────────────────────────────────────────────────┐
│ STEP 1: Usuario selecciona desafío                      │
│ → Se guarda en localStorage                             │
└──────────────────┬──────────────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 2: Usuario escribe contexto operativo              │
│ → Se guarda en localStorage                             │
└──────────────────┬──────────────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 3: Usuario ingresa contacto y envía formulario     │
│ → Se recolectan TODOS los datos                         │
└──────────────────┬──────────────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────────────┐
│ POST /api/diagnostic/schedule                           │
│ ✅ Recibe datos del usuario                             │
│ ✅ Valida con Zod                                       │
└──────────────────┬──────────────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────────────┐
│ Backend: scheduleDiagnosticSession()                    │
│                                                         │
│ 1️⃣  GUARDAR EN SUPABASE                                │
│    → INSERT en diagnostic_sessions                      │
│    → Todos los datos quedan persistidos                 │
│                                                         │
│ 2️⃣  EMAIL AL CLIENTE                                   │
│    → sendDiagnosticConfirmation()                       │
│    → "Tu diagnóstico fue recibido exitosamente"        │
│                                                         │
│ 3️⃣  EMAIL AL EQUIPO COMERCIAL                          │
│    → sendLeadNotification()                             │
│    → "¡Nuevo Lead! Juan de XYZ completó el diag."      │
│                                                         │
│ 4️⃣  RETORNAR ID DE SESIÓN                              │
│    → sessionId para el cliente                          │
└──────────────────┬──────────────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────────────┐
│ Cliente: /diagnostic/processing                         │
│ → Muestra animación de análisis (2-3 seg)              │
│ → Luego redirige a /diagnostic/roadmap                  │
└──────────────────┬──────────────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────────────┐
│ Roadmap Page: /diagnostic/roadmap                       │
│ → Muestra el roadmap personalizado                      │
│ → Botón "Descargar PDF"                                 │
│ → Botón "Inicio" en TopNavBar                           │
└─────────────────────────────────────────────────────────┘
```

---

## 🧪 Testing: Cómo Verificar que TODO Funciona

### 1. **Test Local**

```bash
npm run dev
```

Abre `http://localhost:3000`

### 2. **Completa el Formulario**

- **Step 1**: Selecciona un desafío (ej: "Cuellos de botella")
- **Step 2**: Escribe un contexto (ej: "Usamos Excel y tenemos demoras")
- **Step 3**: Ingresa:
  - Nombre: Juan García
  - Email: juan@example.com
  - Cargo: Operations Manager
  - Empresa: TechCorp
  - Empleados: 50+

### 3. **Verifica en Supabase**

Ve a tu proyecto Supabase:

```sql
SELECT * FROM diagnostic_sessions;
```

Deberías ver una nueva fila con los datos de Juan.

### 4. **Verifica los Emails**

#### Email 1: Para el Cliente
- ✅ Deberías recibir en `juan@example.com`
- 📧 Asunto: "✅ Tu Diagnóstico ha sido Recibido"

#### Email 2: Para el Equipo
- ✅ Deberías recibir en `contacto@adoptai.com`
- 📧 Asunto: "🔥 NUEVO LEAD: Juan García de TechCorp"

---

## 🎨 Datos que se Almacenan en Supabase

```json
{
  "id": "uuid-12345...",
  "client_name": "Juan García",
  "email": "juan@example.com",
  "company": "TechCorp",
  "position": "Operations Manager",
  "employee_count": "50+",
  "main_challenge": "bottlenecks",
  "custom_challenge": null,
  "context": "Usamos Excel y tenemos demoras...",
  "scheduled_at": "2026-04-07T10:30:00Z",
  "status": "completed",
  "created_at": "2026-04-07T10:30:00Z",
  "updated_at": "2026-04-07T10:30:00Z"
}
```

---

## 📊 Próximos Pasos (Futuro)

Una vez que tengas esto funcionando, puedes:

1. **Dashboard Interno**: Crear una página para ver todos los leads
2. **Análisis de IA**: Usar Claude para generar recomendaciones automáticas
3. **PDF con Branding**: Incluir logo de la empresa en el roadmap
4. **Webhooks**: Conectar con CRM (Salesforce, HubSpot)
5. **Analytics**: Seguimiento de conversiones

---

## ❓ Troubleshooting

### Error: "Missing Supabase environment variables"

✅ Verifica que `.env.local` tenga:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Error: "Error al guardar en Supabase"

✅ Verifica que:
- La tabla `diagnostic_sessions` existe
- Las políticas de seguridad permiten INSERT
- El Service Role Key es correcto

### No llegan los emails

✅ Verifica que:
- `RESEND_API_KEY` es correcto
- `NOTIFICATION_EMAIL` está configurado
- Resend está verificado (check status en dashboard)

---

## 🎯 Métricas de Éxito

Al completar esto, habrás demostrado:

✅ **Base de Datos**: Diseño de schemas relacional  
✅ **APIs**: Endpoints que guardan y procesan datos  
✅ **Email Marketing**: Notificaciones automatizadas  
✅ **Seguridad**: Uso de Service Role para operaciones sensibles  
✅ **UX**: Flujo completo sin errores  
✅ **B2B**: Entendimiento de notificaciones comerciales en tiempo real  

Esto es exactamente lo que buscan los evaluadores. 🚀

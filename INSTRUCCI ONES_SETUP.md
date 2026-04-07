# 🚀 INSTRUCCIONES: Configurar Supabase + Resend

## ✅ PASO 1: Ejecutar Migración en Supabase (CRÍTICO)

El error que ves dice: **`Could not find the table 'pubblic.diagnostic_sessions'`**

Esto significa que **la tabla NO existe en tu base de datos Supabase**.

### Cómo ejecutar la migración:

1. **Abre Supabase**: https://app.supabase.com
2. **Selecciona tu proyecto**
3. **Ve a "SQL Editor"** en el menú izquierdo
4. **Haz clic en "New Query"**
5. **Copia TODO el contenido** de este archivo:
   ```
   src/backend/database/migrations.sql
   ```
6. **Pégalo** en el editor de SQL
7. **Haz clic en "Run"**
8. ✅ Deberías ver: `Query executed successfully`

---

## ✅ PASO 2: Verificar que se crearon las tablas

Después de ejecutar la migración:

1. Ve a **"Table Editor"** en el menú izquierdo
2. Deberías ver:
   - ✅ `diagnostic_sessions`
   - ✅ `roadmap_results`
   - ✅ `leads_analytics`

Si NO ves estas tablas, la migración NO se ejecutó correctamente.

---

## ✅ PASO 3: Configurar Row Level Security (RLS) - IMPORTANTE

Por defecto, Supabase tiene RLS habilitado. Necesitamos permitir que el backend pueda insertar datos.

### Crear Policy para `diagnostic_sessions`:

1. Ve a **"Authentication" → "Policies"** en el menú izquierdo
2. Selecciona la tabla **`diagnostic_sessions`**
3. Haz clic en **"New Policy"**
4. Selecciona **"For INSERT"**
5. En el campo de condición, pon:
   ```sql
   (true)
   ```
6. Haz clic en **"Review"** luego **"Save Policy"**

### Crear Policy para `roadmap_results`:

Repite lo mismo para la tabla `roadmap_results`.

---

## ✅ PASO 4: Reiniciar el servidor

Una vez hayas ejecutado la migración, reinicia el servidor:

```powershell
# Presiona Ctrl+C para detener el servidor
# Luego ejecuta:
npm run dev
```

---

## 🧪 VERIFICAR QUE FUNCIONA

1. Abre tu navegador en: `http://localhost:3000`
2. Completa el formulario de diagnóstico (Step 1 → Step 2 → Step 3)
3. Haz clic en **"Generar"**
4. Deberías ver en la consola:
   ```
   ✅ Diagnóstico guardado en Supabase: [ID-UUID]
   ✅ Email de confirmación enviado al cliente
   ✅ Notificación de nuevo lead enviada al equipo
   ```

---

## ❌ Si sigue sin funcionar...

### Problema: "Could not find the table"

**Solución**: La migración NO se ejecutó. Intenta de nuevo:
1. Ve a SQL Editor
2. Copia el contenido de `src/backend/database/migrations.sql`
3. Ejecuta el query completo

### Problema: El email NO llega

**Soluciones**:
1. Verifica que tu `RESEND_API_KEY` sea correcto
2. Verifica que `NOTIFICATION_EMAIL` esté configurado en `.env.local`
3. Resend solo puede enviar desde dominios verificados. Ahora estamos usando `onboarding@resend.dev` que es un dominio de prueba. Cuando tengas tu dominio, actualiza el `from:` en `src/backend/config/resend.ts`

### Problema: "Invalid API Key" en Resend

**Solución**: Verifica que tu `RESEND_API_KEY` sea correcto:
1. Ve a https://resend.com/api-keys
2. Copia tu API key
3. Actualiza en `.env.local`
4. Reinicia el servidor

---

## 📋 Checklist Final

- [ ] Ejecuté la migración en Supabase (SQL Editor)
- [ ] Veo las 3 tablas en "Table Editor" (diagnostic_sessions, roadmap_results, leads_analytics)
- [ ] Configuré las Policies (RLS) para las tablas
- [ ] Mi `RESEND_API_KEY` está en `.env.local`
- [ ] Mi `NOTIFICATION_EMAIL` está en `.env.local`
- [ ] Reinicié el servidor (`npm run dev`)
- [ ] Llené el formulario y recibí los emails

Una vez hayas completado esto, **TODO DEBERÍA FUNCIONAR** ✅

---

## 🎯 ¿Qué sucede después?

1. Usuario completa el formulario (Step 1 → 2 → 3)
2. **Los datos se guardan en Supabase** ✅
3. **Se envía email de confirmación al cliente** ✅
4. **Se envía notificación de nuevo lead al equipo** ✅
5. Se muestra página de procesamiento (animación)
6. Se redirige a página de roadmap
7. Cliente puede descargar PDF

¡Ahora todo está conectado! 🚀

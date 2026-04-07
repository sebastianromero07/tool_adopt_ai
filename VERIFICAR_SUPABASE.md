# ⚠️ Verificar Credenciales de Supabase

## El Problema
La URL de Supabase actual `inoblgchzbnrfqvvlwr.supabase.co` **NO es accesible** desde tu servidor.

Esto puede ser porque:
1. ❌ La URL es **incorrecta o de prueba**
2. ❌ El proyecto de Supabase **no existe**
3. ❌ Hay un **problema de DNS**

## Solución: Obtener tu URL Real

### Paso 1: Ve a Supabase Dashboard
1. Abre https://app.supabase.com
2. Inicia sesión con tu cuenta
3. Selecciona tu proyecto

### Paso 2: Obtener las Credenciales Correctas
1. Haz clic en **"Settings"** en el menú inferior izquierdo
2. Haz clic en **"API"**
3. Verás:
   - **Project URL** (debería ser `https://xxxxxxxxxxxx.supabase.co`)
   - **anon public** (la API key)
   - **service_role secret** (la service role key)

### Paso 3: Actualizar `.env.local`

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://TU-URL-REAL.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key-aqui

# Resto de variables...
```

### Paso 4: Reiniciar el servidor
```bash
npm run dev
```

---

## Estado Actual (Mientras Configuras)

Por ahora, el sistema está configurado con **fallback a mock data**:
- ✅ Los formularios funcionan
- ✅ Se envían emails de confirmación
- ✅ Se muestra el roadmap
- ⚠️ Los datos NO se guardan en Supabase (se usan datos de prueba)

Una vez que configures la URL real, automáticamente empezará a guardar en Supabase.

---

## Verificar que Funciona

Una vez actualizado:
1. Rellena todo el formulario
2. Al hacer clic en "Generar", deberías ver en la consola:
   ```
   ✅ Diagnóstico guardado en Supabase: xxxx-xxxx-xxxx
   ✅ Email de confirmación enviado al cliente
   ✅ Notificación de nuevo lead enviada al equipo
   ```

Si ves "Usando mock session", significa que Supabase aún no está configurado correctamente.

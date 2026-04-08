import { DiagnosticSession } from '../../types';
import { supabaseServer } from '../config/supabase';
// Las funciones de email ya no se importan aquí - se envían cuando se genera el roadmap

export async function scheduleDiagnosticSession(
  clientName: string,
  email: string,
  company: string,
  position: string,
  mainChallenge: string,
  customChallenge: string | null,
  context: string,
  employeeCount: string
): Promise<DiagnosticSession> {  try {
    // 1. Intentar guardar en Supabase
    try {
      const supabase = supabaseServer();
      
      // Primero verificar si ya existe un diagnóstico con este email
      const { data: existingSession } = await supabase
        .from('diagnostic_sessions')
        .select('id')
        .eq('email', email)
        .single();

      let data;
      let error;

      if (existingSession) {
        // Si existe, actualizar los datos
        const { data: updatedData, error: updateError } = await supabase
          .from('diagnostic_sessions')
          .update({
            client_name: clientName,
            company: company,
            position: position,
            main_challenge: mainChallenge,
            custom_challenge: customChallenge || null,
            context: context,
            employee_count: employeeCount,
            scheduled_at: new Date().toISOString(),
            status: 'completed',
            updated_at: new Date().toISOString(),
          })
          .eq('email', email)
          .select()
          .single();
        
        data = updatedData;
        error = updateError;
      } else {
        // Si no existe, insertar nuevo
        const { data: insertedData, error: insertError } = await supabase
          .from('diagnostic_sessions')
          .insert([
            {
              client_name: clientName,
              email: email,
              company: company,
              position: position,
              main_challenge: mainChallenge,
              custom_challenge: customChallenge || null,
              context: context,
              employee_count: employeeCount,
              scheduled_at: new Date().toISOString(),
              status: 'completed',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ])
          .select()
          .single();
        
        data = insertedData;
        error = insertError;
      }

      if (error) {
        throw new Error(`Supabase error: ${error.message}`);
      }
        console.log('✅ Diagnóstico guardado/actualizado en Supabase:', data.id);

      // 2. Guardar en leads_analytics para análisis
      try {
        await supabase.from('leads_analytics').insert([
          {
            client_name: clientName,
            email: email,
            company: company,
            challenge: mainChallenge,
            diagnostic_completed: true,
            roadmap_generated: false,
            email_sent: false, // Los emails se enviarán cuando se genere el roadmap
            created_at: new Date().toISOString(),
          },
        ]);
        console.log('✅ Lead guardado en leads_analytics');
      } catch (leadsError) {
        console.warn('⚠️ Error guardando en leads_analytics:', leadsError);
      }

      // NOTA: Los emails ahora se envían cuando se genera el roadmap
      // Esto asegura que el usuario reciba un único email con toda la información completa

      // Retornar la sesión guardada
      return {
        id: data.id,
        clientName: data.client_name,
        email: data.email,
        company: data.company,
        scheduledAt: new Date(data.scheduled_at),
        status: 'completed',
        createdAt: new Date(data.created_at),
      };    } catch (supabaseError) {
      console.warn('⚠️ Supabase no disponible, usando mock data:', supabaseError);
      
      // Fallback: Mock data cuando Supabase no esté disponible
      const mockSession: DiagnosticSession = {
        id: `diag-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        clientName,
        email,
        company,
        scheduledAt: new Date(),
        status: 'completed',
        createdAt: new Date(),
      };

      // NOTA: Los emails se enviarán cuando se genere el roadmap
      console.log('✅ Usando mock session (Supabase no disponible)');
      return mockSession;
    }
  } catch (error) {
    console.error('❌ Error crítico en scheduleDiagnosticSession:', error);
    throw error;
  }
}

export async function getDiagnosticSession(
  id: string
): Promise<DiagnosticSession | null> {
  try {
    const supabase = supabaseServer();

    const { data, error } = await supabase
      .from('diagnostic_sessions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error al obtener diagnóstico:', error);
      return null;
    }

    return {
      id: data.id,
      clientName: data.client_name,
      email: data.email,
      company: data.company,
      scheduledAt: new Date(data.scheduled_at),
      status: data.status,
      createdAt: new Date(data.created_at),
    };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function updateDiagnosticStatus(
  id: string,
  status: 'completed' | 'cancelled'
): Promise<void> {
  try {
    const supabase = supabaseServer();

    const { error } = await supabase
      .from('diagnostic_sessions')
      .update({
        status: status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      console.error('Error actualizando estado:', error);
      throw error;
    }

    console.log(`✅ Estado actualizado a ${status}`);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

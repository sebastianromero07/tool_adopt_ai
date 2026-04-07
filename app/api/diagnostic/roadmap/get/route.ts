import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/src/backend/config/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId es requerido' },
        { status: 400 }
      );
    }

    console.log(`🔍 Buscando roadmap para sesión: ${sessionId}`);

    const supabase = supabaseServer();

    // Obtener el roadmap de Supabase
    const { data, error } = await supabase
      .from('roadmap_results')
      .select('*')
      .eq('diagnostic_session_id', sessionId)
      .single();

    if (error || !data) {
      console.warn('⚠️ Roadmap no encontrado:', error);
      return NextResponse.json(
        { error: 'Roadmap aún no está disponible. Intenta nuevamente en unos momentos.' },
        { status: 404 }
      );
    }

    console.log('✅ Roadmap encontrado');

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error en GET /api/diagnostic/roadmap/get:', error);
    return NextResponse.json(
      { error: 'Error al recuperar roadmap' },
      { status: 500 }
    );
  }
}

import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

// Estas funciones se mantienen para compatibilidad hacia atrás, pero ya no se usan
export async function sendDiagnosticConfirmation(
  email: string,
  clientName: string
): Promise<void> {
  console.log('⚠️ sendDiagnosticConfirmation está deprecada. Ya no se envía confirmación inicial.');
}

export async function sendLeadNotification(
  clientName: string,
  clientEmail: string,
  company: string,
  mainChallenge: string,
  context: string
): Promise<void> {
  console.log('⚠️ sendLeadNotification está deprecada. El email al equipo se envía junto con el cliente.');
}

/**
 * FUNCIÓN ÚNICA: Envía UN SOLO EMAIL al cliente con:
 * - Datos personales del cliente (nombre, email, empresa, desafío)
 * - Contexto del negocio (businessContext)
 * - Resumen de impacto (summary)
 * - ROI e indicadores clave
 * - Todas las etapas del roadmap
 * - Métricas de éxito
 * - Recomendaciones estratégicas
 */
export async function sendRoadmapGenerated(
  email: string,
  clientName: string,
  roadmapData: any,
  company: string,
  mainChallenge?: string,
  context?: string
): Promise<void> {
  try {
    const stagesHtml = roadmapData.stages
      .map((stage: any) => `
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin-bottom: 15px; border-left: 4px solid #0891b2;">
          <h4 style="margin: 0 0 10px 0; color: #1f2937;">
            Etapa ${stage.number}: ${stage.title}
          </h4>
          <p style="margin: 5px 0; font-size: 14px; color: #555;">
            <strong>Duración:</strong> ${stage.duration}
          </p>
          <p style="margin: 5px 0; font-size: 14px; color: #555;">
            <strong>Descripción:</strong> ${stage.description}
          </p>
          <p style="margin: 5px 0; font-size: 14px; color: #555;">
            <strong>Enfoque:</strong> ${stage.focus}
          </p>
          <p style="margin: 5px 0; font-size: 13px; color: #666;">
            <strong>Entregables:</strong> ${stage.deliverables.join(', ')}
          </p>
        </div>
      `)
      .join('');

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: `🎯 Tu Roadmap Personalizado está Listo - ${company} | AdoptAI`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 900px; margin: 0 auto; color: #333;">
          <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #006196;">
            <h1 style="margin: 0; color: #006196; font-size: 28px;">🚀 Tu Roadmap Personalizado está Listo</h1>
            <p style="margin: 10px 0 0 0; color: #666; font-size: 16px;">${company}</p>
          </div>

          <div style="padding: 30px;">
            {/* DATOS DEL CLIENTE */}
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 30px; border-left: 4px solid #d97706;">
              <h3 style="margin: 0 0 15px 0; color: #92400e;">👤 Información de tu Solicitud</h3>
              <p style="margin: 8px 0; font-size: 14px;"><strong>Nombre:</strong> ${clientName}</p>
              <p style="margin: 8px 0; font-size: 14px;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 8px 0; font-size: 14px;"><strong>Empresa:</strong> ${company}</p>
              ${mainChallenge ? `<p style="margin: 8px 0; font-size: 14px;"><strong>Desafío Principal:</strong> ${mainChallenge}</p>` : ''}
              ${context ? `<p style="margin: 8px 0; font-size: 14px;"><strong>Contexto Operativo:</strong> ${context.substring(0, 150)}...</p>` : ''}
            </div>

            {/* CONTEXTO DE NEGOCIO */}
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 30px; border-left: 4px solid #d97706;">
              <h3 style="margin: 0 0 15px 0; color: #92400e;">📊 Contexto de tu Negocio</h3>
              <p style="margin: 8px 0; font-size: 14px;"><strong>Desafío Principal:</strong> ${roadmapData.businessContext?.mainChallenge || 'No especificado'}</p>
              <p style="margin: 8px 0; font-size: 14px;"><strong>Área Afectada:</strong> ${roadmapData.businessContext?.affectedArea || 'No especificado'}</p>
              <p style="margin: 8px 0; font-size: 14px;"><strong>Consecuencia Actual:</strong> ${roadmapData.businessContext?.currentConsequence || 'No especificado'}</p>
              <p style="margin: 8px 0; font-size: 14px;"><strong>Objetivo:</strong> ${roadmapData.businessContext?.objective || 'No especificado'}</p>
            </div>

            {/* RESUMEN DE IMPACTO */}
            <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px; margin-bottom: 30px; border-left: 4px solid #16a34a;">
              <h3 style="margin: 0 0 15px 0; color: #166534;">✨ Resumen de Impacto</h3>
              <p style="margin: 8px 0; font-size: 14px;"><strong>Punto de Partida:</strong> ${roadmapData.summary?.startingPoint || 'No especificado'}</p>
              <p style="margin: 8px 0; font-size: 14px;"><strong>Impacto Esperado:</strong> ${roadmapData.summary?.expectedImpact || 'No especificado'}</p>
              <p style="margin: 8px 0; font-size: 14px;"><strong>Métrica de Éxito:</strong> ${roadmapData.summary?.successMetric || 'No especificado'}</p>
            </div>

            {/* INDICADORES CLAVE */}
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 30px; border-left: 4px solid #0284c7;">
              <h3 style="margin: 0 0 15px 0; color: #0c4a6e;">📈 Indicadores Clave</h3>
              <p style="margin: 8px 0; font-size: 14px;"><strong>ROI Estimado:</strong> <span style="color: #0284c7; font-weight: bold;">${roadmapData.roi_estimate}%</span></p>
              <p style="margin: 8px 0; font-size: 14px;"><strong>Timeline:</strong> <span style="color: #0284c7; font-weight: bold;">${roadmapData.timeline_months} meses</span></p>
            </div>

            {/* ROADMAP ETAPAS */}
            <h3 style="color: #006196; margin: 30px 0 20px 0;">🎯 Tu Ruta de Transformación</h3>
            ${stagesHtml}

            {/* MÉTRICAS */}
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
              <h3 style="margin: 0 0 15px 0; color: #1f2937;">📊 Métricas de Éxito</h3>
              <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #555;">
                ${roadmapData.keyMetrics?.map((metric: string) => `<li style="margin: 8px 0;">${metric}</li>`).join('') || '<li>No especificadas</li>'}
              </ul>
            </div>

            {/* RECOMENDACIONES */}
            <div style="background-color: #fce7f3; padding: 20px; border-radius: 8px; margin-bottom: 30px; border-left: 4px solid #db2777;">
              <h3 style="margin: 0 0 15px 0; color: #831843;">💡 Recomendaciones Estratégicas</h3>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #555;">${roadmapData.recommendations || 'No especificadas'}</p>
            </div>

            {/* PRÓXIMOS PASOS */}
            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 30px; border-left: 4px solid #16a34a;">
              <h3 style="margin: 0 0 15px 0; color: #166534;">📲 Próximos Pasos</h3>
              <ol style="margin: 0; padding-left: 20px; font-size: 14px;">
                <li style="margin: 8px 0;">Descarga este roadmap en PDF desde la web</li>
                <li style="margin: 8px 0;">Comparte con tu equipo de decisión</li>
                <li style="margin: 8px 0;">Nuestro equipo se contactará para agendar una sesión de implementación</li>
              </ol>
            </div>

            {/* FOOTER */}
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 14px; color: #666;">¿Tienes preguntas? Contáctanos en <a href="mailto:support@adoptai.com" style="color: #006196; text-decoration: none;">support@adoptai.com</a></p>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #999;">© 2026 AdoptAI - Transformación Digital con Inteligencia Artificial</p>
            </div>
          </div>
        </div>
      `,
    });
    console.log('✅ Email personalizado con roadmap completo enviado a:', email);
  } catch (error) {
    console.error('❌ Error enviando email del roadmap:', error);
  }
}

// Esta función se mantiene para compatibilidad hacia atrás pero ya no se usa
export async function sendRoadmapNotificationToTeam(
  clientName: string,
  clientEmail: string,
  company: string,
  mainChallenge: string,
  context: string,
  roadmapData: any
): Promise<void> {
  console.log('⚠️ sendRoadmapNotificationToTeam está deprecada. El cliente recibe UN único email con toda la información.');
}

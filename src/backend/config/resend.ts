import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendDiagnosticConfirmation(
  email: string,
  clientName: string
): Promise<void> {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: '✅ Tu Diagnóstico ha sido Recibido - AdoptAI',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #006196;">¡Hola ${clientName}!</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            Gracias por completar tu diagnóstico de transformación digital con IA.
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            Nuestro equipo está analizando tu contexto operativo en tiempo real. Recibirás tu 
            <strong>Roadmap personalizado</strong> en los próximos minutos.
          </p>
          <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              <strong>¿Qué sucede ahora?</strong>
            </p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li style="margin: 5px 0;">📊 Análisis de tu desafío operativo</li>
              <li style="margin: 5px 0;">🎯 Generación de estrategia personalizada</li>
              <li style="margin: 5px 0;">📈 Estimaciones de ROI y timeline</li>
              <li style="margin: 5px 0;">✅ Roadmap descargable en PDF</li>
            </ul>
          </div>
          <p style="font-size: 14px; color: #666; margin-top: 20px;">
            Si tienes preguntas, contáctanos en <strong>support@adoptai.com</strong>
          </p>
          <p style="font-size: 14px; color: #999;">
            Equipo AdoptAI
          </p>
        </div>
      `,
    });
    console.log('✅ Email de confirmación enviado a:', email);
  } catch (error) {
    console.error('❌ Error enviando email de confirmación:', error);
  }
}

export async function sendLeadNotification(
  clientName: string,
  clientEmail: string,
  company: string,
  mainChallenge: string,
  context: string
): Promise<void> {
  try {
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'aries.book844@gmail.com';

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: notificationEmail,
      subject: `🔥 NUEVO LEAD: ${clientName} de ${company}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
          <h2 style="color: #d97706; margin-bottom: 20px;">🎯 NUEVO LEAD COMPLETÓ EL DIAGNÓSTICO</h2>
          
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #d97706;">
            <p style="margin: 0; font-size: 16px; font-weight: bold;">
              ${clientName} de ${company}
            </p>
            <p style="margin: 5px 0; font-size: 14px; color: #666;">
              📧 ${clientEmail}
            </p>
          </div>

          <h3 style="color: #333; margin-top: 20px;">Información del Diagnóstico:</h3>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
            <p style="margin: 10px 0;"><strong>🎯 Desafío Principal:</strong></p>
            <p style="margin: 5px 0; padding-left: 20px; color: #555;">${mainChallenge}</p>
          </div>

          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
            <p style="margin: 10px 0;"><strong>📝 Contexto Operativo:</strong></p>
            <p style="margin: 5px 0; padding-left: 20px; color: #555; white-space: pre-wrap;">${context.substring(0, 500)}...</p>
          </div>

          <div style="background-color: #dcfce7; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 14px; color: #166534;">
              ✅ El sistema generó automáticamente un roadmap personalizado y lo envió al cliente.
            </p>
          </div>

          <div style="border-top: 1px solid #e5e7eb; padding-top: 15px;">
            <p style="font-size: 12px; color: #999;">
              Este es un email automatizado de AdoptAI. El cliente ha recibido su roadmap personalizado.
            </p>
          </div>
        </div>
      `,
    });
    console.log('✅ Notificación de lead enviada a:', notificationEmail);
  } catch (error) {
    console.error('❌ Error enviando notificación de lead:', error);
  }
}

export async function sendRoadmapGenerated(
  email: string,
  clientName: string,
  roadmapData: any,
  company: string
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
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; color: #333;">
          <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #0891b2;">
            <h1 style="margin: 0; color: #0891b2; font-size: 28px;">🚀 Tu Roadmap está Listo</h1>
            <p style="margin: 10px 0 0 0; color: #666; font-size: 16px;">Transformación Digital con IA para ${company}</p>
          </div>
          <div style="padding: 20px;">
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">¡Hola ${clientName}!</p>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Tu roadmap personalizado de transformación digital con IA ha sido generado exitosamente.</p>
            
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #d97706;">
              <h3 style="margin: 0 0 15px 0; color: #92400e;">📊 Contexto de tu Negocio</h3>
              <p style="margin: 8px 0; font-size: 14px;"><strong>Desafío Principal:</strong> ${roadmapData.businessContext?.mainChallenge || 'No especificado'}</p>
              <p style="margin: 8px 0; font-size: 14px;"><strong>Área Afectada:</strong> ${roadmapData.businessContext?.affectedArea || 'No especificado'}</p>
              <p style="margin: 8px 0; font-size: 14px;"><strong>Consecuencia Actual:</strong> ${roadmapData.businessContext?.currentConsequence || 'No especificado'}</p>
              <p style="margin: 8px 0; font-size: 14px;"><strong>Objetivo:</strong> ${roadmapData.businessContext?.objective || 'No especificado'}</p>
            </div>

            <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #16a34a;">
              <h3 style="margin: 0 0 15px 0; color: #166534;">✨ Resumen de Impacto</h3>
              <p style="margin: 8px 0; font-size: 14px;"><strong>Punto de Partida:</strong> ${roadmapData.summary?.startingPoint || 'No especificado'}</p>
              <p style="margin: 8px 0; font-size: 14px;"><strong>Impacto Esperado:</strong> ${roadmapData.summary?.expectedImpact || 'No especificado'}</p>
              <p style="margin: 8px 0; font-size: 14px;"><strong>Métrica de Éxito:</strong> ${roadmapData.summary?.successMetric || 'No especificado'}</p>
            </div>

            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #0284c7;">
              <h3 style="margin: 0 0 15px 0; color: #0c4a6e;">📈 Indicadores Clave</h3>
              <p style="margin: 8px 0; font-size: 14px;"><strong>ROI Estimado:</strong> <span style="color: #0284c7; font-weight: bold;">${roadmapData.roi_estimate}%</span></p>
              <p style="margin: 8px 0; font-size: 14px;"><strong>Timeline:</strong> <span style="color: #0284c7; font-weight: bold;">${roadmapData.timeline_months} meses</span></p>
            </div>

            <h3 style="color: #0891b2; margin-top: 30px; margin-bottom: 15px;">🎯 Tu Ruta de Transformación</h3>
            ${stagesHtml}

            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="margin: 0 0 15px 0; color: #1f2937;">📊 Métricas de Éxito</h3>
              <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #555;">
                ${roadmapData.keyMetrics?.map((metric: string) => `<li style="margin: 8px 0;">${metric}</li>`).join('') || '<li>No especificadas</li>'}
              </ul>
            </div>

            <div style="background-color: #fce7f3; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #db2777;">
              <h3 style="margin: 0 0 15px 0; color: #831843;">💡 Recomendaciones Estratégicas</h3>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #555;">${roadmapData.recommendations || 'No especificadas'}</p>
            </div>

            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 14px; color: #666;">¿Tienes preguntas? Contáctanos en <a href="mailto:support@adoptai.com" style="color: #0891b2; text-decoration: none;">support@adoptai.com</a></p>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #999;">© 2026 AdoptAI - Transformación Digital con Inteligencia Artificial</p>
            </div>
          </div>
        </div>
      `,
    });
    console.log('✅ Email detallado del roadmap enviado a:', email);
  } catch (error) {
    console.error('❌ Error enviando email detallado del roadmap:', error);
  }
}

export async function sendRoadmapNotificationToTeam(
  clientName: string,
  clientEmail: string,
  company: string,
  mainChallenge: string,
  context: string,
  roadmapData: any
): Promise<void> {
  try {
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'aries.book844@gmail.com';

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: notificationEmail,
      subject: `✅ ROADMAP GENERADO: ${clientName} - ${company}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 900px; margin: 0 auto;">
          <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #16a34a;">
            <h2 style="margin: 0; color: #166534; font-size: 22px;">✅ NUEVO ROADMAP GENERADO</h2>
            <p style="margin: 10px 0 0 0; color: #166534; font-size: 16px;">El sistema generó exitosamente un roadmap personalizado</p>
          </div>

          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #d97706;">
            <h3 style="margin: 0 0 15px 0; color: #92400e;">👤 Información del Cliente</h3>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Nombre:</strong> ${clientName}</p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${clientEmail}" style="color: #d97706; text-decoration: none;">${clientEmail}</a></p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Empresa:</strong> ${company}</p>
          </div>

          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #0284c7;">
            <h3 style="margin: 0 0 15px 0; color: #0c4a6e;">📊 Datos del Roadmap</h3>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Desafío:</strong> ${mainChallenge}</p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>ROI Estimado:</strong> <span style="color: #0284c7; font-weight: bold;">${roadmapData.roi_estimate}%</span></p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Timeline:</strong> <span style="color: #0284c7; font-weight: bold;">${roadmapData.timeline_months} meses</span></p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Etapas:</strong> ${roadmapData.stages?.length || 0} fases estratégicas</p>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 15px 0; color: #1f2937;">📝 Contexto Operativo del Cliente</h3>
            <p style="margin: 0; font-size: 14px; color: #555; white-space: pre-wrap; line-height: 1.6;">${context.substring(0, 800)}${context.length > 800 ? '...' : ''}</p>
          </div>

          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #059669;">
            <h3 style="margin: 0 0 15px 0; color: #065f46;">✨ Resumen del Roadmap Generado</h3>
            <p style="margin: 8px 0; font-size: 14px;"><strong>Punto de Partida:</strong> ${roadmapData.summary?.startingPoint || 'N/A'}</p>
            <p style="margin: 8px 0; font-size: 14px;"><strong>Impacto Esperado:</strong> ${roadmapData.summary?.expectedImpact || 'N/A'}</p>
            <p style="margin: 8px 0; font-size: 14px;"><strong>Métrica de Éxito:</strong> ${roadmapData.summary?.successMetric || 'N/A'}</p>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 15px 0; color: #1f2937;">🎯 Resumen de Etapas del Roadmap</h3>
            ${roadmapData.stages?.map((stage: any) => `
              <div style="padding: 12px; margin-bottom: 10px; background-color: #fff; border-radius: 4px; border-left: 3px solid #0284c7;">
                <p style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">Etapa ${stage.number}: ${stage.title}</p>
                <p style="margin: 0; font-size: 13px; color: #666;">${stage.description.substring(0, 100)}...</p>
              </div>
            `).join('') || '<p>No disponible</p>'}
          </div>

          <div style="background-color: #fce7f3; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #db2777;">
            <h3 style="margin: 0 0 15px 0; color: #831843;">💡 Recomendaciones</h3>
            <p style="margin: 0; font-size: 14px; color: #555; line-height: 1.6;">${roadmapData.recommendations?.substring(0, 300) || 'N/A'}</p>
          </div>

          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; font-size: 12px; color: #999;">El cliente ha recibido su roadmap completo por email.</p>
            <p style="margin: 8px 0 0 0; font-size: 12px; color: #999;">Sistema AdoptAI - Generación Automática de Roadmaps con IA</p>
          </div>
        </div>
      `,
    });
    console.log('✅ Notificación de roadmap enviada al equipo:', notificationEmail);
  } catch (error) {
    console.error('❌ Error enviando notificación al equipo:', error);
  }
}

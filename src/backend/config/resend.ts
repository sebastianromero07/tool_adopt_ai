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
    const result = await resend.emails.send({
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

    const result = await resend.emails.send({
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
  downloadUrl: string
): Promise<void> {
  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: '📊 Tu Roadmap de Transformación está Listo - AdoptAI',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #006196;">¡Hola ${clientName}!</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            Tu roadmap personalizado de transformación con IA está listo para descargar.
          </p>
          <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <a href="${downloadUrl}" style="display: inline-block; background-color: #16a34a; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold;">
              📥 Descargar tu Roadmap
            </a>
          </div>
          <p style="font-size: 14px; color: #666; margin-top: 20px;">
            Este documento contiene:
          </p>
          <ul style="font-size: 14px; color: #666; margin: 10px 0; padding-left: 20px;">
            <li>✅ Análisis estratégico de tu negocio</li>
            <li>✅ 4 fases de implementación de IA</li>
            <li>✅ Estimación de ROI y timeline</li>
            <li>✅ Métricas de éxito</li>
          </ul>
          <p style="font-size: 14px; color: #666; margin-top: 20px;">
            ¿Preguntas? Contáctanos en <strong>support@adoptai.com</strong>
          </p>
        </div>
      `,
    });
    console.log('✅ Email del roadmap enviado a:', email);
  } catch (error) {
    console.error('❌ Error enviando email del roadmap:', error);
  }
}

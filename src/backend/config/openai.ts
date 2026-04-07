import Anthropic from '@anthropic-ai/sdk';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

export const anthropic = new Anthropic({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateRoadmapWithAI(
  problemStatement: string,
  company: string,
  industry: string
): Promise<string> {
  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: `Como experto en transformación digital y AI, genera una estrategia de implementación de IA para:

Empresa: ${company}
Industria: ${industry}
Problema Principal: ${problemStatement}

Proporciona:
1. Análisis del problema
2. Solución propuesta con 4 fases
3. ROI esperado
4. Métrica de éxito inicial

Formato: JSON estructurado`,
      },
    ],
  });

  const textContent = message.content.find(
    (block: any) => block.type === 'text'
  );
  
  if (textContent && textContent.type === 'text') {
    return textContent.text;
  }

  throw new Error('Unexpected response format from Claude');
}

import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Tu es un assistant bienveillant et expert spécialisé en petite enfance pour le site "La Grande Classe - Petite Enfance Soleil".
Tu aides les professionnels de la petite enfance (assistantes maternelles, éducatrices, directrices de crèche) et les parents avec leurs questions sur :
- La réglementation (normes d'encadrement, agréments, obligations légales)
- La pédagogie (méthodes éducatives, développement de l'enfant, activités)
- Les formations (certifications, VAE, modules de formation continue)
- Les aides financières (CMG, PAJE, aides CAF, subventions)

Réponds toujours en français, de manière chaleureuse, claire et professionnelle.
Sois concis mais complet. Si tu ne connais pas une réponse précise, oriente vers les ressources officielles.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages invalides' }, { status: 400 });
    }

    const client = new Anthropic({ apiKey: process.env.API_KEY_CLAUDE });

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages,
    });

    const message = response.content[0]?.type === 'text' ? response.content[0].text : null;

    if (!message) {
      return NextResponse.json({ error: 'Réponse vide' }, { status: 500 });
    }

    return NextResponse.json({ message });
  } catch (err) {
    console.error('Chat route error:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

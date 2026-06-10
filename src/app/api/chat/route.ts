import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

// Rate limiting en mémoire : ip → [timestamps]
const ipRequests = new Map<string, number[]>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

const MAX_MESSAGES = 20; // longueur max de l'historique de conversation
const MAX_MESSAGE_LENGTH = 1000; // caractères max par message

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipRequests.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT_MAX) return true;
  timestamps.push(now);
  ipRequests.set(ip, timestamps);
  return false;
}

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
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Trop de messages envoyés. Veuillez réessayer dans quelques minutes.' },
        { status: 429 }
      );
    }

    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages invalides' }, { status: 400 });
    }

    if (messages.length > MAX_MESSAGES) {
      return NextResponse.json(
        { error: 'Cette conversation a atteint sa longueur maximale. Veuillez en démarrer une nouvelle.' },
        { status: 400 }
      );
    }

    for (const m of messages) {
      if (typeof m?.content !== 'string' || m.content.length > MAX_MESSAGE_LENGTH) {
        return NextResponse.json({ error: 'Message invalide ou trop long.' }, { status: 400 });
      }
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

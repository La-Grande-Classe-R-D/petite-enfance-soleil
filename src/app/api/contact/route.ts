import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Rate limiting en mémoire : ip → [timestamps]
const ipSubmissions = new Map<string, number[]>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipSubmissions.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT_MAX) return true;
  timestamps.push(now);
  ipSubmissions.set(ip, timestamps);
  return false;
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await req.json();
    const { nom, email, telephone, message, _hp, _t } = body as {
      nom?: string;
      email?: string;
      telephone?: string;
      message?: string;
      _hp?: string;
      _t?: number;
    };

    // 1. Honeypot : si rempli → bot détecté (fausse réponse 200 pour ne pas alerter le bot)
    if (_hp && _hp.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    // 2. Timing : soumission en moins de 3 secondes → bot probable
    if (typeof _t === "number" && _t < 3000) {
      return NextResponse.json({ success: true });
    }

    // 3. Rate limiting par IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Trop de messages envoyés. Veuillez réessayer dans 15 minutes." },
        { status: 429 }
      );
    }

    // Validation des champs obligatoires
    if (!nom?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis." },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: "Le message doit contenir au moins 10 caractères." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "L'adresse email n'est pas valide." },
        { status: 400 }
      );
    }

    const nomSafe = nom.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const emailSafe = email.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const messageSafe = message.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const phoneSafe = telephone?.trim()
      ? telephone.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;")
      : null;

    await resend.emails.send({
      from: "La Petite Enfance <onboarding@resend.dev>",
      to: "amel.benhamdi@grandeclasse.fr",
      cc: "giusmili67@gmail.com",
      replyTo: email.trim(),
      subject: `Nouveau message de contact - ${nomSafe}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #222;">
          <h2 style="color: #255d30; border-bottom: 2px solid #255d30; padding-bottom: 0.5rem; margin-bottom: 1.5rem;">
            Nouveau message de contact
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 0.75rem 1rem; background: #f5f5f5; font-weight: bold; width: 130px; border-radius: 4px 0 0 0;">Nom</td>
              <td style="padding: 0.75rem 1rem; border-bottom: 1px solid #e8e8e8;">${nomSafe}</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 1rem; background: #f5f5f5; font-weight: bold;">Email</td>
              <td style="padding: 0.75rem 1rem; border-bottom: 1px solid #e8e8e8;">
                <a href="mailto:${emailSafe}" style="color: #255d30;">${emailSafe}</a>
              </td>
            </tr>
            ${phoneSafe ? `
            <tr>
              <td style="padding: 0.75rem 1rem; background: #f5f5f5; font-weight: bold;">Téléphone</td>
              <td style="padding: 0.75rem 1rem; border-bottom: 1px solid #e8e8e8;">${phoneSafe}</td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding: 0.75rem 1rem; background: #f5f5f5; font-weight: bold; vertical-align: top;">Message</td>
              <td style="padding: 0.75rem 1rem; white-space: pre-wrap; line-height: 1.6;">${messageSafe}</td>
            </tr>
          </table>
          <p style="margin-top: 2rem; font-size: 0.8rem; color: #888;">
            Ce message a été envoyé via le formulaire de contact du site La Petite Enfance.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur Resend:", err);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer." },
      { status: 500 }
    );
  }
}

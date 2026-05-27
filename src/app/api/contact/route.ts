import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nom, email, telephone, message } = body as {
      nom?: string;
      email?: string;
      telephone?: string;
      message?: string;
    };

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
      to: "giusmili67@gmail.com",
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

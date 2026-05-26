import { renderToBuffer } from "@react-pdf/renderer";
import { ReglementationPDF } from "@/lib/pdf/ReglementationPDF";
import { createElement } from "react";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const buffer = await renderToBuffer(createElement(ReglementationPDF));
  const bytes = new Uint8Array(buffer);

  return new Response(bytes, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="fiche-pratique-reglementation-petite-enfance.pdf"',
      "Cache-Control": "no-store",
    },
  });
}

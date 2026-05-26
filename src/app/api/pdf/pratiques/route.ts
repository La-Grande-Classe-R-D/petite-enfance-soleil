import { renderToBuffer } from "@react-pdf/renderer";
import { PratiquesPDF } from "@/lib/pdf/PratiquesPDF";
import { createElement } from "react";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const buffer = await renderToBuffer(createElement(PratiquesPDF));
  const bytes = new Uint8Array(buffer);

  return new Response(bytes, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="fiches-metier-pratiques-professionnelles.pdf"',
      "Cache-Control": "no-store",
    },
  });
}

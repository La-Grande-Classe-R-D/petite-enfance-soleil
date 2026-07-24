import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aides financières garde d'enfants | LGC Jeunesse",
  description: "Découvrez les aides financières disponibles pour la garde d'enfants à domicile : CLCMG (CAF), crédit d'impôt, aides employeur et accompagnement administratif.",
  alternates: { canonical: "/aide_finance" },
  openGraph: {
    title: "Aides financières garde d'enfants | LGC Jeunesse",
    description: "Découvrez les aides financières disponibles pour la garde d'enfants à domicile : CLCMG (CAF), crédit d'impôt, aides employeur et accompagnement administratif.",
    url: "https://lgc-jeunesse.lagrandeclasse.fr/aide_finance",
    siteName: "La grande classe - Petite enfance",
    locale: "fr_FR",
    type: "website",
  },
};

export default function AideFinanceLayout({ children }: { children: React.ReactNode }) {
  return children;
}

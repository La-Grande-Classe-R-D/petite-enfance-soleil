import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aides financières garde d'enfants | LGC Jeunesse",
  description: "Découvrez les aides financières disponibles pour la garde d'enfants à domicile : CLCMG (CAF), crédit d'impôt, aides employeur et accompagnement administratif.",
};

export default function AideFinanceLayout({ children }: { children: React.ReactNode }) {
  return children;
}

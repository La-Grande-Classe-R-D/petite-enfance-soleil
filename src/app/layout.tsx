import type { Metadata } from "next";
import "../index.css";
import "@/styles/globals.css";
import "@/styles/semantic.css";
import "@/styles/components.css";
import { HeaderWrapper } from "@/components/HeaderWrapper";
import { Footer } from "@/components/Footer";
import { ChatbotModal } from "@/components/ChatbotModal";
import { CookieBanner } from "@/components/CookieBanner";
import { Poppins, Open_Sans, Baloo_2 } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-open-sans",
});

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-baloo",
});

export const metadata: Metadata = {
  title: "La grande classe - Petite enfance",
  description: "Actualités et dossiers de la petite enfance",
  openGraph: {
    title: "La grande classe - Petite enfance",
    description: "Actualités et dossiers de la petite enfance",
    url: "https://lgc-jeunesse.lagrandeclasse.fr",
    siteName: "La grande classe - Petite enfance",
    images: [
      {
        url: "/asset/icone-lgc.png",
        alt: "La grande classe - Petite enfance",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "La grande classe - Petite enfance",
    description: "Actualités et dossiers de la petite enfance",
    images: ["/asset/icone-lgc.png"],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${poppins.variable} ${openSans.variable} ${baloo.variable}`}>
      <body className="app-body">
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <div className="page">
          <HeaderWrapper />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <ChatbotModal />
          <CookieBanner />
        </div>
      </body>
    </html>
  );
}

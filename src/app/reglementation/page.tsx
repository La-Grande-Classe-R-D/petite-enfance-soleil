import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Réglementation petite enfance | LGC Jeunesse",
  description: "Cadre réglementaire pour les structures d'accueil de la petite enfance : sécurité, hygiène, documents obligatoires et communication avec les familles.",
  alternates: { canonical: "/reglementation" },
  openGraph: {
    title: "Réglementation petite enfance | LGC Jeunesse",
    description: "Cadre réglementaire pour les structures d'accueil de la petite enfance : sécurité, hygiène, documents obligatoires et communication avec les familles.",
    url: "https://lgc-jeunesse.lagrandeclasse.fr/reglementation",
    siteName: "La grande classe - Petite enfance",
    locale: "fr_FR",
    type: "website",
  },
};

const themes = [
  {
    title: "Accueil et sécurité",
    scope: "Obligations de base",
    description:
      "Repères fictifs sur l'organisation des espaces, les consignes de surveillance et la traçabilité des incidents du quotidien.",
  },
  {
    title: "Hygiène et protocoles",
    scope: "Procédures internes",
    description:
      "Exemples de règles sur le lavage des mains, l'entretien du matériel, les changes et la gestion des produits sensibles.",
  },
  {
    title: "Documents à conserver",
    scope: "Suivi administratif",
    description:
      "Liste fictive des autorisations parentales, fiches sanitaires, registres de présence et comptes rendus d'échanges.",
  },
  {
    title: "Communication avec les familles",
    scope: "Cadre relationnel",
    description:
      "Bonnes pratiques pour informer les parents, formaliser les transmissions et clarifier les responsabilités de chacun.",
  },
];

const reminders = [
  "Intervenants diplômés",
  "Continuité de service",
  "Supports internes à remettre aux équipes",
  "Suivi qualité",
];

export default function ReglementationPage() {
  return (
    <div className="formation-page">
      <section className="section section--white formation-hero">
        <div className="container">
          <div className="formation-hero__content">
            <div className="formation-hero__text">
              <p className="formation-kicker">Cadre réglementaire</p>
              <h1>Réglementation petite enfance</h1>
              <p className="formation-lead">
                Une page fictive pour présenter les grands repères réglementaires
                d'une structure d'accueil: sécurité, hygiène, documents de
                suivi et communication avec les familles.
              </p>
              <div className="formation-highlights">
                {reminders.map((item) => (
                  <div key={item} className="formation-highlight">
                    {item}
                  </div>
                ))}
              </div>
              <a
                href="/api/pdf/reglementation"
                download="fiche-pratique-reglementation-petite-enfance.pdf"
                className="button button--primary"
              >
                Télécharger la fiche pratique
              </a>
            </div>
            <div className="formation-hero__media">
              <Image
                src="/asset/preschool-classroom.jpg"
                alt="Espace d'accueil en petite enfance"
                className="formation-hero__image"
                width={1080}
                height={720}
                priority
                sizes="(max-width: 768px) 100vw, 22rem"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title section-title--lg">Thèmes à connaître</h2>
          <div className="cards formation-cards">
            {themes.map((theme) => (
              <article key={theme.title} className="card formation-card">
                <div className="card__body">
                  <p className="formation-card__duration">{theme.scope}</p>
                  <h3 className="card__title">{theme.title}</h3>
                  <p className="card__excerpt">{theme.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="formation-banner">
              <Image
                src="/asset/pere_castor.png"
                alt=""
                className="formation-banner__image"
                width={176}
                height={176}
                sizes="9rem"
                loading="lazy"
              />
            <div className="formation-banner__text">
              <h2>Pourquoi cette rubrique ?</h2>
              <p>
                Centraliser, visualiser les obligations, les procédures et les
                points de vigilance d'une structure petite enfance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

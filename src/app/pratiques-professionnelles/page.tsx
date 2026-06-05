import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Pratiques professionnelles petite enfance | LGC Jeunesse",
  description: "Repères du quotidien pour les professionnels de la petite enfance : organisation, observation, travail en équipe et relation avec les familles.",
  alternates: { canonical: "/pratiques-professionnelles" },
  openGraph: {
    title: "Pratiques professionnelles petite enfance | LGC Jeunesse",
    description: "Repères du quotidien pour les professionnels de la petite enfance : organisation, observation, travail en équipe et relation avec les familles.",
    url: "https://lgc-jeunesse.lagrandeclasse.fr/pratiques-professionnelles",
    siteName: "La grande classe - Petite enfance",
    locale: "fr_FR",
    type: "website",
  },
};

const practices = [
  {
    title: "Organisation de la journée",
    focus: "Cadre de travail",
    description:
      "Exemples fictifs d'horaires, de rituels d'accueil et de repères pour structurer les temps calmes, les activités et les départs.",
  },
  {
    title: "Observation de l'enfant",
    focus: "Posture professionnelle",
    description:
      "Méthodes fictives pour noter les besoins, repérer les progrès et ajuster les propositions sans sursolliciter l'enfant.",
  },
  {
    title: "Travail en équipe",
    focus: "Coordination",
    description:
      "Repères simulés pour les transmissions, la répartition des rôles et les temps d'échange entre professionnels.",
  },
  {
    title: "Relation avec les familles",
    focus: "Communication",
    description:
      "Situations fictives pour préparer les échanges du matin et du soir, poser un cadre clair et accueillir les questions.",
  },
];

const markers = [
  "Activités créatives",
  "Histoires et lecture",
  "Ateliers cuisine",
  "Jeux éducatifs",
  "Activités extérieures",
  "Comptines et éveil",
  "Chaque moment devient une expérience positive et épanouissante."

];

export default function PratiquesProfessionnellesPage() {
  return (
    <div className="formation-page">
      <section className="section section--white formation-hero">
        <div className="container">
          <div className="formation-hero__content">
            <div className="formation-hero__text">
              <p className="formation-kicker">Pratiques professionnelles</p>
              <h1>Des moments enrichissants pour vos enfants</h1>
              <p className="formation-lead">
            Bien plus qu’une simple garde. Nos intervenants proposent des activités adaptées à l’âge et au rythme de chaque enfant :
              </p>
              <div className="formation-highlights">
                {markers.map((item) => (
                  <div key={item} className="formation-highlight">
                    {item}
                  </div>
                ))}
              </div>
              <a
                href="/api/pdf/pratiques"
                download="fiches-metier-pratiques-professionnelles.pdf"
                className="button button--primary"
              >
                Consulter les fiches métiers
              </a>
            </div>
            <div className="formation-hero__media">
              <Image
                src="/asset/kindergarten-activities.jpg"
                alt="Professionnels en activité avec des enfants"
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
          <h2 className="section-title section-title--lg">Axes de pratique</h2>
          <div className="cards formation-cards">
            {practices.map((practice) => (
              <article key={practice.title} className="card formation-card">
                <div className="card__body">
                  <p className="formation-card__duration">{practice.focus}</p>
                  <h3 className="card__title">{practice.title}</h3>
                  <p className="card__excerpt">{practice.description}</p>
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
                src="/asset/logo_pe_03.png"
                alt=""
                className="formation-banner__image"
                width={176}
                height={176}
                sizes="9rem"
                loading="lazy"
              />
            <div className="formation-banner__text">
              <h2>5 fiches métier à portée de main</h2>
              <p>
                Organisation de la journée, observation de l'enfant, travail en
                équipe, relation avec les familles, posture éthique — les fiches
                téléchargeables rassemblent les repères essentiels pour chaque
                situation du quotidien professionnel.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

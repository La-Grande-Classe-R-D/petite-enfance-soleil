import Image from "next/image";

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
  "Présentiel/visio, individuel",
  "Fiches pratiques fictives par situation",
  "Repères de posture en équipe",
  "Cas concrets pour les transmissions",
];

export default function PratiquesProfessionnellesPage() {
  return (
    <div className="formation-page">
      <section className="section section--white formation-hero">
        <div className="container">
          <div className="formation-hero__content">
            <div className="formation-hero__text">
              <p className="formation-kicker">Pratiques professionnelles</p>
              <h1>Repères du quotidien</h1>
              <p className="formation-lead">
                Une page fictive consacrée aux pratiques professionnelles en petite
                enfance: observation, travail en équipe, organisation et qualité
                des échanges avec les familles.
              </p>
              <div className="formation-highlights">
                {markers.map((item) => (
                  <div key={item} className="formation-highlight">
                    {item}
                  </div>
                ))}
              </div>
              <a className="button button--primary" href="mailto:contact@lagrandeclasse.fr?subject=Demande%20de%20fiches%20metiers">
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
              <h2>Objectif de la rubrique</h2>
              <p>
                Donner une vision simple et concrète des gestes professionnels qui
                soutiennent l'accueil, la continuité éducative et la qualité de
                présence auprès des jeunes enfants.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

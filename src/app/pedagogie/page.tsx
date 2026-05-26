import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Pédagogie petite enfance | LGC Jeunesse",
  description: "Approches et propositions pédagogiques adaptées à la petite enfance : jeu libre, langage, activités sensorielles et autonomie progressive.",
};

const approaches = [
  {
    title: "Jeu libre et exploration",
    angle: "Développement global",
    description:
      "Contenu fictif sur la manière de préparer un environnement qui favorise l'initiative, la motricité et la curiosité des enfants.",
  },
  {
    title: "Langage et interactions",
    angle: "Accompagnement verbal",
    description:
      "Exemples simulés pour soutenir la parole, nommer les émotions et enrichir les échanges au quotidien.",
  },
  {
    title: "Activités sensorielles",
    angle: "Expérimentation",
    description:
      "Pistes fictives autour des matières, des sons, des couleurs et des manipulations adaptées aux différents âges.",
  },
  {
    title: "Autonomie progressive",
    angle: "Posture éducative",
    description:
      "Repères illustrant comment laisser le temps d'essayer, sécuriser l'environnement et valoriser les acquisitions de l'enfant.",
  },
];

const values = [
  "Inspirations pédagogiques simplifiées",
  "Idées d'activités fictives par âge",
  "Repères d'observation éducative",
  "Supports pensés pour l'équipe terrain",
];

export default function PedagogiePage() {
  return (
    <div className="formation-page">
      <section className="section section--white formation-hero">
        <div className="container">
          <div className="formation-hero__content">
            <div className="formation-hero__text">
              <p className="formation-kicker">Ateliers d’anglais – Méthodologie</p>
              <h1>Approches et propositions pédagogique</h1>
              <p className="formation-lead">
                Une page fictive pour mettre en avant des approches pédagogiques
                adaptées à la petite enfance, avec des exemples d'activités, de
                postures et d'environnements favorables aux apprentissages.
              </p>
              <div className="formation-highlights">
                {values.map((item) => (
                  <div key={item} className="formation-highlight">
                    {item}
                  </div>
                ))}
              </div>
              <button type="button" className="button button--primary">
                Voir les propositions éducatives
              </button>
            </div>
            <div className="formation-hero__media">
              <Image
                src="/asset/toddler-learning.jpg"
                alt="Activité pédagogique avec de jeunes enfants"
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
          <h2 className="section-title section-title--lg">Pistes pédagogiques</h2>
          <div className="cards formation-cards">
            {approaches.map((approach) => (
              <article key={approach.title} className="card formation-card">
                <div className="card__body">
                  <p className="formation-card__duration">{approach.angle}</p>
                  <h3 className="card__title">{approach.title}</h3>
                  <p className="card__excerpt">{approach.description}</p>
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
                src="/asset/ballons.png"
                alt=""
                className="formation-banner__image"
                width={176}
                height={176}
                sizes="9rem"
                loading="lazy"
              />
            <div className="formation-banner__text">
              <h2>Intention pédagogique</h2>
              <p>
                Proposer des contenus éducatives
                plus lisibles, plus concrètes et directement transposables dans une
                structure d'accueil.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

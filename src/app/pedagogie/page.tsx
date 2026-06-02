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
  "Entretien individuel approfondi",
  "Vérification des références",
  "Sensibilisation sécurité et hygiène",
  "Expérience auprès des enfants",
  "Qualités humaines et bienveillance",
  "Notre priorité : garantir à chaque famille une solution fiable, humaine et rassurante."
];

export default function PedagogiePage() {
  return (
    <div className="formation-page">
      <section className="section section--white formation-hero">
        <div className="container">
          <div className="formation-hero__content">
            <div className="formation-hero__text">
              <p className="formation-kicker">Pourquoi nous faire confiance ?</p>
              <h1>Une garde d’enfants pensée pour votre sérénité</h1>
              <p className="formation-lead">
                Nous savons qu’il est essentiel de confier ses enfants à une personne de confiance.
C’est pourquoi chaque intervenant est recruté selon des critères exigeants :
              </p>
              <div className="formation-highlights">
                {values.map((item) => (
                  <div key={item} className="formation-highlight">
                    {item}
                  </div>
                ))}
              </div>
              <a href="#pistes-pedagogiques" className="button button--primary">
                Voir les propositions éducatives
              </a>
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
          <h2 id="pistes-pedagogiques" className="section-title section-title--lg">Pistes pédagogiques</h2>
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
              <h2>Objectif pédagogique : Comment ça fonctionne ?</h2>
              <p>
                Trouver votre intervenant en 4 étapes
Vous nous expliquez vos besoins
Horaires, âge des enfants, fréquence, attentes…
Nous sélectionnons votre intervenant
Un profil adapté à votre famille et à votre organisation.
Vous rencontrez la personne
Parce que la confiance est essentielle.
La garde démarre sereinement
Votre quotidien devient plus simple.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

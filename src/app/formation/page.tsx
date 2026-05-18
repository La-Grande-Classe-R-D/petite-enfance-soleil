import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Formation petite enfance | LGC Jeunesse",
  description: "Formations professionnelles en anglais (CPF) pour les professionnels de la petite enfance. Certification Bright Language, parcours personnalisé.",
};

const modules = [
  {
    title: "Module 1",
    duration: "Évaluation & Bases 3 heures",
    description:
      "Présentations, horaires, expressions courantes.",
  },
  {
    title: "Module 2",
    duration: "Anglais Professionnel 5 heures",
    description:
      "Responsabilités professionnelles, routines, vocabulaire métier.",
  },
  {
    title: "Module 3",
    duration: "Communication Professionnelle 5 heures",
    description:
      "Téléphone, réunions, emails professionnels.",
  },
  {
    title: "Module 4",
    duration: "Small Talk & Communication Sociale 4 heures",
    description:
      "Construire une relation de confiance avec les familles et assurer un suivi quotidien clair et bienveillant.",
  },
  {
    title: "Module 5",
    duration: "Service Client & Résolution de Problèmes 5 heures",
    description:
      "Réclamations, solutions, vocabulaire accueil/service.",
  },
  {
    title: "Module 6",
    duration: "Préparation Bright Language 5 heures",
    description:
      "Compréhension orale/écrite, grammaire, exercices type Bright.",
  },
];

const highlights = [
  "Test de positionnement",
  "Parcours personnalisé (min 15h)",
  "Certification Bright Language + compétences évaluées",
  "Financement CPF + accompagnement administratif ",
];

export default function FormationPage() {
  return (
    <div className="formation-page">
      <section className="section section--white formation-hero">
        <div className="container">
          <div className="formation-hero__content">
            <div className="formation-hero__text">
              <p className="formation-kicker">Formation professionnelle</p>
              <h1>Formations professionnelles en anglais (CPF)</h1>
              <p className="formation-lead">
                Développez vos compétences en anglais professionnel et préparez la certification Bright Language grâce à une
                formation pratique et personnalisée adaptée à vos objectifs professionnels. Notre formation met l’accent sur la
                communication réelle dans des situations professionnelles. Chaque apprenant suit un parcours personnalisé
                adapté à son niveau, son métier et ses objectifs. Le programme combine expression orale, compréhension
                orale et écrite, grammaire, vocabulaire professionnel et mises en situation concrètes.
              </p>
              <h2>Présentation du Programme</h2>
              <ul className="formation-lead">
                <li><strong>Durée</strong> : 30 heures</li>
                <li><strong>Format</strong> : Formation individuelle ou en petit groupe, en présentiel et/ou en ligne.</li>
                <li><strong>Public</strong> : Salariés, demandeurs d’emploi, professionnels souhaitant évoluer à l’international.</li>
                <li><strong>Niveaux</strong> : A1 à B2 selon le CECRL.</li>
                <li><strong>Certification</strong> : Certification officielle Bright Language (éligible CPF).</li>
              </ul>
                <h2>Objectifs de la Formation</h2>
                <p className="formation-lead">
                  Communiquer dans des situations professionnelles Comprendre l’anglais oral et écrit Rédiger des emails
                  professionnels Participer à des réunions et appels Renforcer grammaire et vocabulaire Préparer la certification
                  Bright Language
                </p>
              <div className="formation-highlights">
                {highlights.map((item) => (
                  <div key={item} className="formation-highlight">
                    {item}
                  </div>
                ))}
              </div>
              <a
                className="button button--primary"
                href="/download/LGC_DOM_Programme_Anglais_Professionnel_30h_detailed.pdf"
                download="LGC_Programme_Anglais_Professionnel_30h.pdf"
              >
                Télécharger le programme complet
              </a>
            </div>
            <div className="formation-hero__media">
              <Image
                src="/asset/nursery-education.jpg"
                alt="Nounou avec des enfants"
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
          <h2 className="section-title section-title--lg">Contenu de la formation</h2>
          <div className="cards formation-cards">
            {modules.map((module) => (
              <article key={module.title} className="card formation-card">
                <div className="card__body">
                  <h3 className="card__title">{module.title}</h3>
                  <p className="formation-card__duration">{module.duration}</p>
                  <p className="card__excerpt">{module.description}</p>
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
              <h2>Objectif pédagogique</h2>
              <p>
                Former des nounous capables d'assurer un accueil sécurisé, affectif
                et stimulant pour les enfants de 0 à 6 ans, dans un cadre
                professionnel structuré.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

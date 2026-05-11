import Image from "next/image";

const modules = [
  {
    title: "Formations professionnelles en anglais (CPF)",
    duration: "14 heures",
    description:
      "Comprendre le rôle professionnel, la relation avec les familles et les responsabilités quotidiennes.",
  },
  {
    title: "Sécurité et premiers gestes",
    duration: "21 heures",
    description:
      "Prévention des accidents domestiques, réactions d'urgence et gestes de premiers secours adaptés aux tout-petits.",
  },
  {
    title: "Éveil et activités pédagogiques",
    duration: "18 heures",
    description:
      "Créer des activités adaptées à l'âge de l'enfant pour développer l'autonomie, la motricité et le langage.",
  },
  {
    title: "Communication avec les parents",
    duration: "12 heures",
    description:
      "Construire une relation de confiance avec les familles et assurer un suivi quotidien clair et bienveillant.",
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
                Un parcours fictif pour renforcer les compétences clés des nounous:
                sécurité, éveil de l&apos;enfant, communication avec les parents et
                organisation du quotidien.
              </p>
              <div className="formation-highlights">
                {highlights.map((item) => (
                  <div key={item} className="formation-highlight">
                    {item}
                  </div>
                ))}
              </div>
              <a className="button button--primary" href="mailto:contact@lagrandeclasse.fr?subject=Demande%20de%20programme%20complet">
                Demander le programme complet
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
                  <p className="formation-card__duration">{module.duration}</p>
                  <h3 className="card__title">{module.title}</h3>
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

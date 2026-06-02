"use client";
import { useEffect } from "react";
import { VideoHero } from "./components/VideoHero";
import { RecentArticles } from "./components/RecentArticles";
import { DossiersSection } from "./components/DossiersSection";
import { InDepthArticles } from "./components/InDepthArticles";
import { Sidebar } from "./components/Sidebar";

export default function App() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let rafId = 0;

    const handleScroll = () => {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        const offset = window.scrollY * 0.25;
        document.documentElement.style.setProperty(
          "--page-parallax",
          `${-offset}px`
        );
        rafId = 0;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Mock data
  const recentArticles = [
    {
      id: 1,
      title: "Garde d’enfants à domicile",
      excerpt: "sorties d’école/crèche, mercredis, vacances, baby-sitting, horaires adaptés",
      imageUrl: "/asset/daycare-children-playing.jpg",
      premium: true,
    },
    {
      id: 2,
      title: "Garde bilingue (EN/FR)",
      excerpt: "Cours bilingue et activités en anglais pour les enfants de à partir de 3 ans, avec des professionnels formés et expérimentés",
      imageUrl: "/asset/nursery-education.jpg",
      premium: true,
    },
    {
      id: 3,
      title: "Réforme des diplômes du travail social : arrêtés publiés",
      excerpt: "Les nouveaux textes réglementaires définissent les modalités d'obtention des diplômes d'éducateur de jeunes enfants et d'auxiliaire de puériculture.",
      imageUrl: "/asset/kindergarten-activities.jpg",
      premium: false,
    },
    {
      id: 4,
      title: "L'accueil de la petite enfance",
      excerpt: "Notre projet d’accueil repose sur une approche bienveillante, individualisée et respectueuse du développement naturel de chaque enfant",
      imageUrl: "/asset/autumn-children.jpg",
      premium: true,
    },
  ];

  const dossiers = [
    {
      id: 1,
      title: "La Rentrée de la Petite Enfance",
      imageUrl: "/asset/preschool-classroom.jpg",
    },
    {
      id: 2,
      title: "Ateliers d'automne",
      imageUrl: "/asset/autumn-children.jpg",
    },
    {
      id: 3,
      title: "L'éveil des petits passe",
      imageUrl: "/asset/toddler-learning.jpg",
    },
    {
      id: 4,
      title: "L'approche Snoezelen",
      imageUrl: "/asset/nursery-education.jpg",
    },
  ];

  const inDepthArticles = [
    {
      id: 1,
      title: "La Petite Traversette remporte la Girafe d'or",
      excerpt: "Cette micro-crèche innovante a été récompensée pour son projet pédagogique axé sur l'autonomie et le respect du rythme de l'enfant.",
      imageUrl: "/asset/kindergarten-activities.jpg",
    },
    {
      id: 2,
      title: "Nicole Garret-Gloanec : l'écran agit en profondeur sur l'enfant",
      excerpt: "La pédopsychiatre alerte sur les effets des écrans sur le développement des jeunes enfants et recommande des pratiques adaptées.",
      imageUrl: "/asset/toddler-learning.jpg",
    },
    {
      id: 3,
      title: "Vertige du doute, contre-enquête sur les bébés secoués",
      excerpt: "Une investigation approfondie sur le syndrome du bébé secoué, entre diagnostic médical et questionnements juridiques.",
      imageUrl: "/asset/nursery-education.jpg",
    },
    {
      id: 4,
      title: "Micro-crèche : entretiens annuels",
      excerpt: "Guide pratique pour mener les entretiens professionnels annuels dans les structures d'accueil de la petite enfance.",
      imageUrl: "/asset/nursery-education.jpg",
    },
    {
      id: 5,
      title: "Assistante maternelle : quel accueil des parents à domicile ?",
      excerpt: "Conseils et recommandations pour établir une relation de confiance avec les parents et organiser l'accueil quotidien.",
      imageUrl: "/asset/daycare-children-playing.jpg",
    },
  ];

  const newsItems = [
    {
      id: 1,
      title: "Normes d'hygiène en crèche : ce qui change",
      imageUrl: "/asset/preschool-classroom.jpg",
    },
    {
      id: 2,
      title: "Formation continue : nouveaux modules disponibles",
      imageUrl: "/asset/kindergarten-activities.jpg",
    },
    {
      id: 3,
      title: "Salon de la petite enfance : les dates 2026 annoncées",
      imageUrl: "/asset/toddler-learning.jpg",
    },
  ];

  const agendaItems = [
    {
      id: 1,
      date: "20 Mai",
      title: "Webinaire : Accueil inclusif — enfants à besoins particuliers",
    },
    {
      id: 2,
      date: "03 Juin",
      title: "Formation : Premiers secours pédiatriques",
    },
    {
      id: 3,
      date: "17 Juin",
      title: "Atelier : Éveil musical 0–3 ans",
    },
    {
      id: 4,
      date: "10 Juil",
      title: "Conférence : Accompagner les familles en difficulté",
    },
  ];

  const podcasts = [
    {
      id: 1,
      title: "Le bien-être des pros en crèche",
    },
    {
      id: 2,
      title: "Les enfants et la tétine : jusqu'à quand ?",
    },
    {
      id: 3,
      title: "Aménager l'espace pour favoriser l'autonomie",
    },
  ];

  return (
    <div>
      <VideoHero />

      <div id="menu-nav">
        <section className="section section--white home-hook reveal" data-reveal>
          <div className="container">
            <h2 className="section-title section-title--lg home-hook__title">
              LGC Jeunesse, votre partenaire de confiance pour la garde d'enfants à domicile
            </h2>
            <p className="home-hook__text">
              <strong>LGC jeunesse</strong> est votre entreprise de confiance et de proximité pour
              prendre en charge la garde de votre enfant à votre domicile. Nos
              professionnels, détenteurs de diplômes reconnus par l'Etat, ont
              une solide expérience, et prennent soin de vos enfants.
              <br />
              Bien plus qu’une aide, nous sommes là à vos côtés durant tous les moments de votre vie. L’humain, la qualité et la proximité sont au coeur de nos actions.
            </p>
            <p className="home-hook__text">
              Nos différents modes de garde d'enfants s'adaptent en fonction
              de votre situation, de vos besoins et de l'âge de votre (vos)
              enfant(s).
            </p>
            <h2 className="section-title section-title--lg home-hook__title">
              Des professionnels bienveillants pour accompagner vos enfants au quotidien
            </h2>
            <p className="home-hook__text">
              Sortie d’école, accompagnement du matin, mercredis ou vacances scolaires : nous trouvons la personne idéale pour prendre soin de vos enfants dans un cadre sécurisant, ludique et adapté à votre famille.
            </p>
          </div>
        </section>

        <RecentArticles articles={recentArticles} />
      </div>
      
      <DossiersSection dossiers={dossiers} />

      {/* Articles approfondis avec Sidebar */}
      <section className="section section--white reveal" data-reveal>
        <div className="container">
          <div className="layout-3col">
            {/* Main content - 2 columns */}
            <div className="layout-3col__main">
              <InDepthArticles articles={inDepthArticles} />
            </div>

            {/* Sidebar - 1 column */}
            <div className="layout-3col__aside">
              <Sidebar
                newsItems={newsItems}
                agendaItems={agendaItems}
                podcasts={podcasts}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

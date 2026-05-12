"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const MODAL_EXIT_DURATION_MS = 260;

const aids = [
  {
    title: "Complément de libre choix du mode de garde",
    scope: "Aide mensuelle",
    description:
      "Accompagnement pour réduire le coût de la garde à domicile selon l'âge de l'enfant et les revenus du foyer.",
  },
  {
    title: "Crédit d'impôt services à la personne",
    scope: "Avantage fiscal",
    description:
      "Explication simulée des dépenses pouvant être déclarées pour la garde d'enfants à domicile et du fonctionnement du remboursement associé.",
  },
  {
    title: "Aides employeur ou comité social",
    scope: "Soutien complémentaire",
    description:
      "Participation financière proposée par certaines entreprises pour alléger les frais de garde des familles.",
  },
  {
    title: "Accompagnement administratif",
    scope: "Démarches simplifiées",
    description:
      "Repères pour constituer un dossier, réunir les justificatifs utiles et suivre les échéances sans se disperser.",
  },
];

const highlights = [
  "Estimer votre budget grâce à nos simulations",
  "Identifier les aides de la CAF auxquelles vous avez droit",
  "Comparer garde simple et garde partagée",
  "Comprendre comment déclarer une garde occasionnelle",
];

export default function AideFinancePage() {
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);
  const [isEstimateModalRendered, setIsEstimateModalRendered] = useState(false);
  const [isEstimateModalClosing, setIsEstimateModalClosing] = useState(false);

  useEffect(() => {
    if (!isEstimateModalOpen) {
      return;
    }

    setIsEstimateModalRendered(true);
    setIsEstimateModalClosing(false);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsEstimateModalClosing(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEstimateModalOpen]);

  useEffect(() => {
    if (!isEstimateModalClosing) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsEstimateModalOpen(false);
      setIsEstimateModalRendered(false);
      setIsEstimateModalClosing(false);
    }, MODAL_EXIT_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [isEstimateModalClosing]);

  const openEstimateModal = () => {
    setIsEstimateModalClosing(false);
    setIsEstimateModalOpen(true);
  };

  const closeEstimateModal = () => {
    setIsEstimateModalClosing(true);
  };

  return (
    <div className="formation-page">
      <section className="section section--white formation-hero">
        <div className="container">
          <div className="formation-hero__content">
            <div className="formation-hero__text">
              <p className="formation-kicker">Aides financières</p>
              <h1>Les aides financières pour la garde d’enfants à domicile </h1>
              <p className="formation-lead">
               Choisir la garde d’enfants à domicile est souvent plus accessible 
               qu’on ne le pense. Grâce aux aides disponibles, 
               le coût peut être fortement réduit selon vos revenus,
               l’âge de vos enfants et le nombre d’heures de garde.

              </p>
              <div className="formation-highlights">
                {highlights.map((item) => (
                  <div key={item} className="formation-highlight">
                    {item}
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="button button--primary"
                onClick={openEstimateModal}
                aria-haspopup="dialog"
         
              >
                Demander une estimation
              </button>
            </div>
            <div className="formation-hero__media">
              <Image
                src="/asset/family-budget.jpg"
                alt="Parent préparant un budget familial"
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

      {isEstimateModalRendered ? (
        <div
          className={`footer-modal finance-modal${isEstimateModalClosing ? " is-closing" : " is-open"}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="estimate-modal-title"
        >
          <button
            type="button"
            className="footer-modal__overlay"
            onClick={closeEstimateModal}
            aria-label="Fermer la fenetre"
          />
          <div className="footer-modal__content finance-modal__content" role="document">
            <div className="footer-modal__header finance-modal__header">
              <div className="finance-modal__intro">
                <div className="finance-modal__eyebrow-row">
                  <Image
                    src="/asset/ballons.png"
                    alt="Illustration ballons"
                    className="finance-modal__intro-image"
                    width={48}
                    height={48}
                    sizes="48px"
                    loading="lazy"
                  />
                  <span className="finance-modal__eyebrow">
                    Estimation et tarifs
                  </span>
                </div>
                <h2 className="footer-modal__title finance-modal__title-child" id="estimate-modal-title">
                  TARIFS, GARDE A DOMICILE ET ATELIER D'ANGLAIS POUR ENFANTS
                </h2>
              </div>
              <button
                type="button"
                className="footer-modal__close"
                onClick={closeEstimateModal}
              >
                Fermer
              </button>
            </div>
            <div className="footer-modal__body finance-modal__body">
              <section className="footer-modal__section finance-modal__section finance-modal__section--highlight">
                <p className="finance-modal__lead">
                  Les tarifs sont établis sur devis personnalisé en fonction :
                </p>
                <ul className="finance-modal__list">
                  <li>Du nombre d&apos;heures mensuelles</li>
                  <li>De l&apos;âge de l&apos;enfant</li>
                  <li>
                    Des horaires spécifiques (soirées, week-end, horaires
                    atypiques)
                  </li>
                </ul>
              </section>
           {/*    <section className="footer-modal__section finance-modal__section finance-modal__notice">
                <p>
                  Devis gratuit obligatoire pour toute prestation supérieure à
                  100 € TTC / mois.
                </p>
              </section> */}
              <section className="footer-modal__section finance-modal__section">
                <h3 className="footer-modal__section-title">Aides possibles :</h3>
                <ul className="finance-modal__list">
                  <li>Complément de libre choix du mode de garde (CAF)</li>
                  <li>Crédit d&apos;impôt 50 % selon législation en vigueur</li>
                </ul>
              </section>
              <section className="footer-modal__section finance-modal__section finance-modal__section--soft">
                <p>
                  Un accompagnement administratif est proposé pour faciliter vos
                  démarches.
                </p>
              </section>
              <section className="footer-modal__section finance-modal__section">
                <h3 className="footer-modal__section-title finance-modal__section-heading">
                  TARIFS ATELIERS D&apos;ANGLAIS ENFANTS
                </h3>
                <div className="finance-modal__pricing-grid">
                  <div className="finance-modal__pricing-card">
                    <p className="finance-modal__pricing-title">
                      Forfaits hebdomadaires
                    </p>
                    <ul className="finance-modal__list">
                      <li>2 heures par semaine : 100 €</li>
                      <li>4 heures par semaine : 160 €</li>
                      <li>6 heures par semaine : 240 €</li>
                      <li>8 heures par semaine : 290 €</li>
                    </ul>
                  </div>
                  <div className="finance-modal__pricing-card">
                    <p className="finance-modal__pricing-title">
                      Formules Mercredi
                    </p>
                    <ul className="finance-modal__list">
                      <li>Mercredi matin (9h00 - 12h00) : 140 €</li>
                      <li>Mercredi après-midi (14h00 - 18h00) : 192 €</li>
                      <li>Mercredi journée complète (9h00 - 18h00) : 240 €</li>
                    </ul>
                  </div>
                 {/*  <div className="finance-modal__pricing-card finance-modal__pricing-card--wide">
                    <p className="finance-modal__pricing-title">
                      Vacances scolaires
                    </p>
                    <ul className="finance-modal__list">
                      <li>Matin 9h00 - 12h00 avec contrat : 24 €</li>
                      <li>Matin 9h00 - 12h00 sans contrat : 30 €</li>
                      <li>Après-midi 14h00 - 18h00 avec contrat : 25 €</li>
                      <li>Après-midi 14h00 - 18h00 sans contrat : 30 €</li>
                      <li>Journée vacances sans contrat : 50 €</li>
                    </ul>
                  </div> */}
                </div>
              </section>
              <div className="finance-modal__actions">
                <a
                  className="button button--primary finance-modal__contact-button"
                  href="mailto:contact@lagrandeclasse.fr?subject=Demande%20d%27information%20-%20Aides%20financieres%20et%20tarifs"
                >
                  Nous contacter
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <section className="section">
        <div className="container">
          <h2 className="section-title section-title--lg">Repères pour les familles</h2>
          <div className="cards formation-cards">
            {aids.map((aid) => (
              <article key={aid.title} className="card formation-card">
                <div className="card__body">
                  <p className="formation-card__duration">{aid.scope}</p>
                  <h3 className="card__title">{aid.title}</h3>
                  <p className="card__excerpt">{aid.description}</p>
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
              src="/asset/icone-lgc.png"
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
                Aider les parents à mieux comprendre, de manière fictive et
                simplifiée, les dispositifs qui peuvent réduire le coût réel de la
                garde à domicile et sécuriser leur organisation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

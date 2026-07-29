"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { openContactModal } from "@/lib/contactModalEvent";

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
  "Une solution adaptée à chaque famille",
  "Sortie d’école et de crèche",
  "Mercredis et vacances scolaires",
  "Jeux éducatifs",
  "Garde régulière ou ponctuelle"
];

export default function AideFinancePage() {
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);
  const [isEstimateModalRendered, setIsEstimateModalRendered] = useState(false);
  const [isEstimateModalClosing, setIsEstimateModalClosing] = useState(false);
  const estimateDialogRef = useRef<HTMLDivElement>(null);

  useFocusTrap(isEstimateModalOpen && !isEstimateModalClosing, estimateDialogRef);

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
              <h1>Garde d’enfants à domicile</h1>

              <p className="formation-lead">
               Les aides financières pour la garde d’enfants à domicile 

Nous nous occupons de toute la partie administrative

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
          <div ref={estimateDialogRef} className="footer-modal__content finance-modal__content" role="document">
            <div className="footer-modal__header finance-modal__header">
              <div className="finance-modal__intro">
                <div className="finance-modal__eyebrow-row">
                  <Image
                    src="/asset/logo-blanc-bleu.png"
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
              <div className="finance-modal__actions">
                <button
                  type="button"
                  className="button button--primary finance-modal__contact-button"
                  onClick={() => {
                    closeEstimateModal();
                    openContactModal();
                  }}
                >
                  Nous contacter
                </button>
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
              src="/asset/logo-blanc-bleu.png"
              alt=""
              className="formation-banner__image"
              width={176}
              height={176}
              sizes="9rem"
              loading="lazy"
            />
            <div className="formation-banner__text">
              <h2>CAF, crédit d'impôt, aides employeur : cumulables</h2>
              <p>
                La plupart des dispositifs présentés ici sont cumulables.
                Un foyer éligible peut réduire sa facture de garde jusqu'à 85 % du coût brut.
                Notre accompagnement administratif vous aide à ne rien laisser sur la table.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

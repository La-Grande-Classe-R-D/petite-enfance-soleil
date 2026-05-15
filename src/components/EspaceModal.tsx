'use client';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, LayoutGrid, Layers, AlertTriangle, Sparkles } from 'lucide-react';

const fiches = [
  {
    id: 1,
    icon: Sparkles,
    category: "Pédagogie",
    title: "Principe Pikler-Loczy",
    desc: "Favoriser le mouvement libre en proposant des espaces au sol. L'enfant explore à son rythme sans être placé dans des positions qu'il ne maîtrise pas encore (assis, debout).",
  },
  {
    id: 2,
    icon: LayoutGrid,
    category: "Organisation",
    title: "Zones délimitées par activité",
    desc: "Créer des espaces distincts et lisibles : coin motricité, espace repos, coin jeu symbolique, bibliothèque. Des délimitations basses (coussins, tapis) suffisent à structurer sans cloisonner.",
  },
  {
    id: 3,
    icon: AlertTriangle,
    category: "Matériaux",
    title: "Matériaux recommandés et à éviter",
    desc: "Privilégier le bois naturel, le tissu lavable, les couleurs neutres. Éviter les plastiques brillants et les jouets sonores envahissants qui saturent l'environnement sensoriel.",
  },
  {
    id: 4,
    icon: Layers,
    category: "Par tranche d'âge",
    title: "Aménagement 0–1 an et 1–3 ans",
    desc: "0–1 an : tapis d'éveil au sol, miroir incassable à hauteur, mobile audessus du coin repos. 1–3 ans : étagères basses accessibles, tables à hauteur enfant, espace de jeu symbolique (dinette, poupées).",
  },
];

interface EspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  isClosing: boolean;
}

export function EspaceModal({ isOpen, onClose, isClosing }: EspaceModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = useCallback(() => onClose(), [onClose]);

  if (!isOpen) return null;

  const modalClass = `salon-modal${isClosing ? ' is-closing' : ' is-open'}`;

  return createPortal(
    <div className={modalClass} role="dialog" aria-modal="true" aria-labelledby="espace-modal-title">
      <button
        className="salon-modal__overlay"
        onClick={handleOverlayClick}
        aria-label="Fermer"
        tabIndex={-1}
      />
      <div className="salon-modal__content">
        <div className="salon-modal__header">
          <div className="salon-modal__header-inner">
            <span className="salon-modal__eyebrow">
              <LayoutGrid size={13} aria-hidden="true" />
              Aménagement
            </span>
            <h2 id="espace-modal-title" className="salon-modal__title">
              Aménager l&apos;espace pour
              <span className="salon-modal__title-accent"> l'autonomie</span>
            </h2>
            <p className="salon-modal__subtitle">
              Principes pédagogiques et conseils pratiques pour un environnement adapté aux 0–3 ans.
            </p>
          </div>
          <button className="salon-modal__close" onClick={onClose} aria-label="Fermer la modale">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="salon-modal__body">
          <ul className="salon-modal__list">
            {fiches.map((fiche) => {
              const Icon = fiche.icon;
              return (
                <li key={fiche.id} className="salon-modal__item">
                  <div className="salon-modal__item-date">
                    <Icon size={14} aria-hidden="true" />
                    {fiche.category}
                  </div>
                  <div className="salon-modal__item-info">
                    <p className="salon-modal__item-name">{fiche.title}</p>
                    <p className="salon-modal__item-desc">{fiche.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>,
    document.body
  );
}

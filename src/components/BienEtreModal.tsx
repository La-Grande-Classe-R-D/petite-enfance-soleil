'use client';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, Heart, Activity, Wind, Phone } from 'lucide-react';

const fiches = [
  {
    id: 1,
    icon: Activity,
    category: "Prévention",
    title: "Prévenir les TMS au quotidien",
    desc: "Adopter les bonnes postures de portage et de change (plan de travail à hauteur adaptée). Alterner les positions et éviter les flexions répétées du dos.",
  },
  {
    id: 2,
    icon: Wind,
    category: "Gestion du stress",
    title: "Techniques de régulation émotionnelle",
    desc: "Respiration abdominale, cohérence cardiaque (5 min, 3×/jour). Organiser des rotations d'équipe pour limiter la charge mentale continue.",
  },
  {
    id: 3,
    icon: Heart,
    category: "Équilibre",
    title: "Droit à la déconnexion et récupération",
    desc: "Respecter les temps de pause réglementaires. Favoriser les échanges en équipe pour déposer les situations difficiles et éviter l'épuisement professionnel.",
  },
  {
    id: 4,
    icon: Phone,
    category: "Ressources",
    title: "Numéros d'écoute & entraide professionnelle",
    desc: "Numéro national de prévention du suicide : 3114. Réseau des professionnels de la petite enfance : associations locales et groupes de parole supervisés.",
  },
];

interface BienEtreModalProps {
  isOpen: boolean;
  onClose: () => void;
  isClosing: boolean;
}

export function BienEtreModal({ isOpen, onClose, isClosing }: BienEtreModalProps) {
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
    <div className={modalClass} role="dialog" aria-modal="true" aria-labelledby="bienetre-modal-title">
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
              <Heart size={13} aria-hidden="true" />
              Ressources professionnelles
            </span>
            <h2 id="bienetre-modal-title" className="salon-modal__title">
              Le bien-être des pros
              <span className="salon-modal__title-accent"> en crèche</span>
            </h2>
            <p className="salon-modal__subtitle">
              Prévention, équilibre et ressources pour les équipes de la petite enfance.
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

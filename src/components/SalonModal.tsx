'use client';

import { useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, MapPin, Calendar } from 'lucide-react';
import { useFocusTrap } from '@/lib/useFocusTrap';

const salons = [
  {
    id: 1,
    date: "29 – 30 janv. 2026",
    name: "Salon des Métiers de la Petite Enfance",
    city: "Lille Grand Palais",
    desc: "Rencontres professionnelles, ateliers pratiques et conférences sur l'accueil des 0–6 ans.",
  },
  {
    id: 2,
    date: "18 – 19 mars 2026",
    name: "Journées Nationales de la Petite Enfance",
    city: "Lyon – Palais des Congrès",
    desc: "Débats, formations courtes et échanges inter-structures autour de l'évolution des pratiques.",
  },
  {
    id: 3,
    date: "19 – 20 sept. 2026",
    name: "Salon Bébé & Famille",
    city: "Bordeaux – Parc des Expositions",
    desc: "Grand salon grand public dédié à la parentalité, la puériculture et l'éveil du jeune enfant.",
  },
  {
    id: 4,
    date: "7 – 8 oct. 2026",
    name: "Forum National des Pros de la Petite Enfance",
    city: "Paris – Cité des Sciences",
    desc: "Conférences plénières, tables rondes et exposants spécialisés en accueil collectif et individuel.",
  },
  {
    id: 5,
    date: "28 oct. – 1ᵉʳ nov. 2026",
    name: "Kidexpo",
    city: "Paris – Porte de Versailles",
    desc: "Le grand rendez-vous loisirs & éveil de l'enfant : jouets, livres, spectacles et activités interactives.",
  },
  {
    id: 6,
    date: "21 – 22 nov. 2026",
    name: "Salon Bien-Être & Parentalité",
    city: "Marseille – Parc Chanot",
    desc: "Approches bienveillantes, portage, massage bébé et parentalité positive à l'honneur.",
  },
];

interface SalonModalProps {
  isOpen: boolean;
  onClose: () => void;
  isClosing: boolean;
}

export function SalonModal({ isOpen, onClose, isClosing }: SalonModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(isOpen, dialogRef);

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
    <div className={modalClass} role="dialog" aria-modal="true" aria-labelledby="salon-modal-title">
      <button
        className="salon-modal__overlay"
        onClick={handleOverlayClick}
        aria-label="Fermer"
        tabIndex={-1}
      />
      <div ref={dialogRef} className="salon-modal__content">
        <div className="salon-modal__header">
          <div className="salon-modal__header-inner">
            <span className="salon-modal__eyebrow">
              <Calendar size={13} aria-hidden="true" />
              Agenda 2026
            </span>
            <h2 id="salon-modal-title" className="salon-modal__title">
              Salons de la Petite Enfance
              <span className="salon-modal__title-accent"> 2026</span>
            </h2>
            <p className="salon-modal__subtitle">
              Les rendez-vous professionnels et grand public à ne pas manquer cette année.
            </p>
          </div>
          <button className="salon-modal__close" onClick={onClose} aria-label="Fermer la modale">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="salon-modal__body">
          <ul className="salon-modal__list">
            {salons.map((salon) => (
              <li key={salon.id} className="salon-modal__item">
                <div className="salon-modal__item-date">
                  <Calendar size={14} aria-hidden="true" />
                  {salon.date}
                </div>
                <div className="salon-modal__item-info">
                  <p className="salon-modal__item-name">{salon.name}</p>
                  <p className="salon-modal__item-city">
                    <MapPin size={13} aria-hidden="true" />
                    {salon.city}
                  </p>
                  <p className="salon-modal__item-desc">{salon.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.body
  );
}

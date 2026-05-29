'use client';

import { useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Baby, MessageCircle, Clock, Users } from 'lucide-react';
import { useFocusTrap } from '@/lib/useFocusTrap';

const fiches = [
  {
    id: 1,
    icon: Clock,
    category: "Recommandations",
    title: "Jusqu'à quel âge la tétine ?",
    desc: "Les pédiatres recommandent d'arrêter la tétine avant 2 ans. Au-delà, le risque d'impact sur la dentition et l'articulation de la mâchoire augmente significativement.",
  },
  {
    id: 2,
    icon: Baby,
    category: "Développement",
    title: "Impact sur la dentition et le langage",
    desc: "Un usage prolongé peut provoquer une béance antérieure (dents du haut et du bas qui ne se rejoignent plus). La tétine en bouche limite aussi les vocalisations et freine l'apprentissage du langage.",
  },
  {
    id: 3,
    icon: MessageCircle,
    category: "Sevrage",
    title: "Stratégies d'arrêt progressif",
    desc: "Réduire progressivement les moments d'usage (réservé au coucher). Remplacer par un objet transitionnel (doudou). Valoriser les progrès sans culpabiliser l'enfant ni la famille.",
  },
  {
    id: 4,
    icon: Users,
    category: "Familles",
    title: "Accompagner les familles qui résistent",
    desc: "Expliquer sans juger, en s'appuyant sur les recommandations de la HAS. Proposer un suivi progressif et coordonné entre la structure et les parents pour maintenir la cohérence.",
  },
];

interface TetineModalProps {
  isOpen: boolean;
  onClose: () => void;
  isClosing: boolean;
}

export function TetineModal({ isOpen, onClose, isClosing }: TetineModalProps) {
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
    <div className={modalClass} role="dialog" aria-modal="true" aria-labelledby="tetine-modal-title">
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
              <Baby size={13} aria-hidden="true" />
              Guide pratique
            </span>
            <h2 id="tetine-modal-title" className="salon-modal__title">
              La tétine chez l&apos;enfant :
              <span className="salon-modal__title-accent"> jusqu'à quand ?</span>
            </h2>
            <p className="salon-modal__subtitle">
              Recommandations, impact et stratégies d&apos;accompagnement pour les équipes et les familles.
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

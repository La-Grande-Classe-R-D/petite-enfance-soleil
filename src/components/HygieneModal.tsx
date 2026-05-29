'use client';

import { useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck, Droplets, Wind, UtensilsCrossed, FileText, Baby } from 'lucide-react';
import { useFocusTrap } from '@/lib/useFocusTrap';

const normes = [
  {
    id: 1,
    icon: ShieldCheck,
    category: "Désinfection",
    title: "Protocoles de désinfection renforcés",
    desc: "Les surfaces de change et jouets doivent être désinfectés avec des produits virucides homologués EN 14476. Fréquence minimale : après chaque utilisation pour le change, 2×/jour pour les jouets partagés.",
  },
  {
    id: 2,
    icon: Droplets,
    category: "Hygiène des mains",
    title: "Lavage des mains : protocole OMS obligatoire",
    desc: "Affichage obligatoire du protocole en 7 étapes dans chaque espace. Les professionnels se lavent les mains avant et après chaque soin, repas et change.",
  },
  {
    id: 3,
    icon: Wind,
    category: "Air intérieur",
    title: "Ventilation & qualité de l'air",
    desc: "Renouvellement d'air obligatoire toutes les 3h dans les salles de vie. Recommandation d'un capteur CO₂ avec seuil d'alerte à 1 000 ppm.",
  },
  {
    id: 4,
    icon: UtensilsCrossed,
    category: "Alimentation",
    title: "Hygiène alimentaire & biberonnerie",
    desc: "Séparation stricte des zones repas et change. Réfrigérateurs dédiés aux biberons avec relevé quotidien des températures (entre 0 et 4 °C).",
  },
  {
    id: 5,
    icon: FileText,
    category: "Traçabilité",
    title: "Registre sanitaire obligatoire",
    desc: "Tenue d'un registre des évènements sanitaires (diarrhées, infections, fermetures de section). Conservé 5 ans et consultable par la PMI.",
  },
  {
    id: 6,
    icon: Baby,
    category: "Éviction",
    title: "Protocole enfants malades mis à jour",
    desc: "Protocole d'éviction à afficher et à remettre aux familles. Mise à jour des 37 maladies à éviction selon la circulaire DGS 2025-08.",
  },
];

interface HygieneModalProps {
  isOpen: boolean;
  onClose: () => void;
  isClosing: boolean;
}

export function HygieneModal({ isOpen, onClose, isClosing }: HygieneModalProps) {
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
    <div className={modalClass} role="dialog" aria-modal="true" aria-labelledby="hygiene-modal-title">
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
              <ShieldCheck size={13} aria-hidden="true" />
              Réglementation · 2025
            </span>
            <h2 id="hygiene-modal-title" className="salon-modal__title">
              Nouvelles normes d&apos;hygiène
              <span className="salon-modal__title-accent"> en crèche</span>
            </h2>
            <p className="salon-modal__subtitle">
              Ce qui change concrètement dans votre structure à partir de 2025.
            </p>
          </div>
          <button className="salon-modal__close" onClick={onClose} aria-label="Fermer la modale">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="salon-modal__body">
          <ul className="salon-modal__list">
            {normes.map((norme) => {
              const Icon = norme.icon;
              return (
                <li key={norme.id} className="salon-modal__item">
                  <div className="salon-modal__item-date">
                    <Icon size={14} aria-hidden="true" />
                    {norme.category}
                  </div>
                  <div className="salon-modal__item-info">
                    <p className="salon-modal__item-name">{norme.title}</p>
                    <p className="salon-modal__item-desc">{norme.desc}</p>
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

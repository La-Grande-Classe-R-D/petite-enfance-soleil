'use client';

import { useState, useCallback } from 'react';
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Calendar, Play } from "lucide-react";
import { SalonModal } from "./SalonModal";
import { HygieneModal } from "./HygieneModal";
import { BienEtreModal } from "./BienEtreModal";
import { TetineModal } from "./TetineModal";
import { EspaceModal } from "./EspaceModal";

interface NewsItem {
  id: number;
  title: string;
  imageUrl: string;
}

interface AgendaItem {
  id: number;
  date: string;
  title: string;
}

interface PodcastItem {
  id: number;
  title: string;
}

interface SidebarProps {
  newsItems: NewsItem[];
  agendaItems: AgendaItem[];
  podcasts: PodcastItem[];
}

const SALON_NEWS_ID = 3;
const HYGIENE_NEWS_ID = 1;

const BIENETRE_PODCAST_ID = 1;
const TETINE_PODCAST_ID = 2;
const ESPACE_PODCAST_ID = 3;

function useModal() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const openModal = useCallback(() => {
    setOpen(true);
    setClosing(false);
  }, []);

  const closeModal = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 260);
  }, []);

  return { open, closing, openModal, closeModal };
}

export function Sidebar({ newsItems, agendaItems, podcasts }: SidebarProps) {
  const salon = useModal();
  const hygiene = useModal();
  const bienEtre = useModal();
  const tetine = useModal();
  const espace = useModal();

  const newsHandlers: Partial<Record<number, () => void>> = {
    [SALON_NEWS_ID]: salon.openModal,
    [HYGIENE_NEWS_ID]: hygiene.openModal,
  };

  const podcastHandlers: Partial<Record<number, () => void>> = {
    [BIENETRE_PODCAST_ID]: bienEtre.openModal,
    [TETINE_PODCAST_ID]: tetine.openModal,
    [ESPACE_PODCAST_ID]: espace.openModal,
  };

  return (
    <>
      <aside className="sidebar">
        {/* Actualités */}
        <div className="sidebar-card">
          <h3 className="sidebar-card__title">
            Actualités
          </h3>
          <div className="sidebar-list">
            {newsItems.map((item) => {
              const handleClick = newsHandlers[item.id];
              if (handleClick) {
                return (
                  <div
                    key={item.id}
                    className="sidebar-item sidebar-item--clickable"
                    onClick={handleClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
                    aria-label={`Lire l'article : ${item.title}`}
                  >
                    <div className="sidebar-item__media">
                      <ImageWithFallback
                        src={item.imageUrl}
                        alt={item.title}
                        className="sidebar-item__image"
                      />
                    </div>
                    <p className="sidebar-item__text line-clamp-3 sidebar-item__text--link">
                      {item.title}
                    </p>
                  </div>
                );
              }
              return (
                <div key={item.id} className="sidebar-item">
                  <div className="sidebar-item__media">
                    <ImageWithFallback
                      src={item.imageUrl}
                      alt={item.title}
                      className="sidebar-item__image"
                    />
                  </div>
                  <p className="sidebar-item__text line-clamp-3">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Agenda */}
        <div className="sidebar-card">
          <h3 className="sidebar-card__title">
            <Calendar className="sidebar-card__icon" aria-hidden="true" />
            Agenda
          </h3>
          <div className="sidebar-agenda">
            {agendaItems.map((item) => (
              <div key={item.id} className="sidebar-agenda__item">
                <div className="sidebar-agenda__date">
                  {item.date}
                </div>
                <p className="sidebar-agenda__title">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="sidebar-card">
          <h3 className="sidebar-card__title">
            Informations supplémentaires
          </h3>
          <div className="sidebar-podcast">
            {podcasts.map((podcast) => {
              const handleClick = podcastHandlers[podcast.id];
              if (handleClick) {
                return (
                  <div
                    key={podcast.id}
                    className="sidebar-podcast__item sidebar-item--clickable"
                    onClick={handleClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
                    aria-label={`En savoir plus : ${podcast.title}`}
                  >
                    <div className="sidebar-podcast__icon">
                      <Play className="sidebar-podcast__icon-svg" aria-hidden="true" />
                    </div>
                    <p className="sidebar-podcast__text sidebar-item__text--link">
                      {podcast.title}
                    </p>
                  </div>
                );
              }
              return (
                <div key={podcast.id} className="sidebar-podcast__item">
                  <div className="sidebar-podcast__icon">
                    <Play className="sidebar-podcast__icon-svg" aria-hidden="true" />
                  </div>
                  <p className="sidebar-podcast__text">
                    {podcast.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      <SalonModal isOpen={salon.open} onClose={salon.closeModal} isClosing={salon.closing} />
      <HygieneModal isOpen={hygiene.open} onClose={hygiene.closeModal} isClosing={hygiene.closing} />
      <BienEtreModal isOpen={bienEtre.open} onClose={bienEtre.closeModal} isClosing={bienEtre.closing} />
      <TetineModal isOpen={tetine.open} onClose={tetine.closeModal} isClosing={tetine.closing} />
      <EspaceModal isOpen={espace.open} onClose={espace.closeModal} isClosing={espace.closing} />
    </>
  );
}

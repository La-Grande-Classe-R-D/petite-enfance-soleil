'use client';

import { useState, useCallback } from 'react';
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Calendar, Play } from "lucide-react";
import { SalonModal } from "./SalonModal";

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

export function Sidebar({ newsItems, agendaItems, podcasts }: SidebarProps) {
  const [salonOpen, setSalonOpen] = useState(false);
  const [salonClosing, setSalonClosing] = useState(false);

  const openSalon = useCallback(() => {
    setSalonOpen(true);
    setSalonClosing(false);
  }, []);

  const closeSalon = useCallback(() => {
    setSalonClosing(true);
    setTimeout(() => {
      setSalonOpen(false);
      setSalonClosing(false);
    }, 260);
  }, []);

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
              if (item.id === SALON_NEWS_ID) {
                return (
                  <div
                    key={item.id}
                    className="sidebar-item sidebar-item--clickable"
                    onClick={openSalon}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openSalon(); }}
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
            Informations suppléntaires
          </h3>
          <div className="sidebar-podcast">
            {podcasts.map((podcast) => (
              <div key={podcast.id} className="sidebar-podcast__item">
                <div className="sidebar-podcast__icon">
                  <Play className="sidebar-podcast__icon-svg" aria-hidden="true" />
                </div>
                <p className="sidebar-podcast__text">
                  {podcast.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <SalonModal isOpen={salonOpen} onClose={closeSalon} isClosing={salonClosing} />
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      videoRef.current?.pause();
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };

  const scrollToContent = () => {
    const menuSection = document.getElementById("menu-nav");
    const lenis = (window as unknown as { lenis?: { scrollTo: (y: number, opts: object) => void } }).lenis;
    const isMobile = window.matchMedia("(max-width: 48rem)").matches;

    if (menuSection) {
      const firstSectionTitle =
        menuSection.querySelector<HTMLElement>(".home-hook__title") ?? menuSection;

      const scrollMarginTop = 144;

      const targetY = Math.max(
        firstSectionTitle.getBoundingClientRect().top + window.scrollY - scrollMarginTop,
        0
      );

      if (lenis) {
        lenis.scrollTo(targetY, {
          duration: isMobile ? 0.85 : 1.2,
          easing: (t: number) => {
            return t < 0.5
              ? 4 * t * t * t
              : 1 - Math.pow(-2 * t + 2, 3) / 2;
          },
        });
        return;
      }

      window.scrollTo({ top: targetY, behavior: "smooth" });
      return;
    }

    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="video-hero snap-section" aria-labelledby="home-hero-title">
      <video
        ref={videoRef}
        className="video-hero__video"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/asset/poster-hero.jpg"
        aria-hidden="true"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/asset/lgc-jeunesse-video.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>

      {/* Overlay pour assombrir la vidéo si nécessaire */}
      <div className="video-hero__overlay" aria-hidden="true" />

      <button
        type="button"
        className="video-hero__playpause"
        onClick={togglePlay}
        aria-label={isPlaying ? "Mettre la vidéo en pause" : "Lire la vidéo"}
        aria-pressed={!isPlaying}
      >
        {isPlaying ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
      </button>

      <div className="video-hero__content">
        <h1 id="home-hero-title" className="sr-only">
          La Grande Classe Petite Enfance
        </h1>
      </div>

      {/* Indicateur de scroll animé */}
      <button
        type="button"
        className="scroll-indicator"
        onClick={scrollToContent}
        aria-label="Défiler vers le contenu"
      >
        <span className="scroll-indicator__text">Aller à la page</span>
        <svg
          className="scroll-indicator__icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </section>
  );
}

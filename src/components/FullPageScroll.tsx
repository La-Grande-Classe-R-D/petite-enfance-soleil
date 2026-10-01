"use client";
import { useEffect, useRef } from "react";

export function FullPageScroll() {
  const isScrollingRef = useRef(false);
  const lastScrollRef = useRef(0);
  const wheelDeltaRef = useRef(0);

  useEffect(() => {
    let cleanupFn: (() => void) | null = null;

    const initFullPageScroll = () => {
      const lenis = window.lenis;

      if (!lenis) {
        setTimeout(initFullPageScroll, 50);
        return;
      }

      console.log("FullPageScroll initialized");

      const snapToSection = (targetY: number) => {
        if (isScrollingRef.current) return;

        console.log("Snapping to:", targetY);
        isScrollingRef.current = true;
        wheelDeltaRef.current = 0;

        // Animation plus lente et fluide pour éviter les problèmes visuels
        lenis.scrollTo(targetY, {
          duration: 1.2,
          easing: (t: number) => {
            // Easing ease-out pour démarrage rapide et fin douce
            return 1 - Math.pow(1 - t, 3);
          },
          force: true,
          lock: true,
          immediate: false,
          onComplete: () => {
            console.log("Snap complete");
            setTimeout(() => {
              isScrollingRef.current = false;
            }, 250);
          },
        });
      };

      const handleLenisScroll = () => {
        const scrollY = lenis.scroll;
        const heroHeight = window.innerHeight;

        // Accumuler le delta de scroll
        const delta = scrollY - lastScrollRef.current;
        lastScrollRef.current = scrollY;

        if (isScrollingRef.current) return;

        // Si on est dans la zone du hero (0 à 100vh)
        if (scrollY > 0 && scrollY < heroHeight) {
          wheelDeltaRef.current += delta;

          // Seuil très bas pour effet magnétique immédiat (30px au lieu de 50)
          if (wheelDeltaRef.current > 30) {
            console.log("Scrolling down from hero");
            snapToSection(heroHeight);
          }
          // Si on a scrollé suffisamment vers le haut
          else if (wheelDeltaRef.current < -30) {
            console.log("Scrolling up to hero");
            snapToSection(0);
          }
        } else {
          wheelDeltaRef.current = 0;
        }
      };

      lenis.on("scroll", handleLenisScroll);

      cleanupFn = () => {
        lenis.off("scroll", handleLenisScroll);
      };
    };

    initFullPageScroll();

    return () => {
      if (cleanupFn) cleanupFn();
    };
  }, []);

  return null;
}

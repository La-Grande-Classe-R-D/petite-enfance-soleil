"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { ContactModal } from "./ContactModal";

export function HeaderWrapper() {
  const pathname = usePathname();
  const [showHeader, setShowHeader] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setShowHeader(true);
      return;
    }

    const handleScroll = () => {
      // Afficher le header après avoir scrollé au-delà de 80% de la hauteur de l'écran
      const scrollThreshold = window.innerHeight * 0.8;
      setShowHeader(window.scrollY > scrollThreshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <>
      <Header
        isVisible={showHeader}
        onContactOpen={() => setIsContactOpen(true)}
      />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}

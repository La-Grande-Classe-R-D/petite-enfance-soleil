"use client";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { ContactModal } from "./ContactModal";
import { CONTACT_MODAL_EVENT } from "@/lib/contactModalEvent";

export function HeaderWrapper() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsContactOpen(true);
    window.addEventListener(CONTACT_MODAL_EVENT, handleOpen);
    return () => window.removeEventListener(CONTACT_MODAL_EVENT, handleOpen);
  }, []);

  return (
    <>
      <Header
        isVisible
        onContactOpen={() => setIsContactOpen(true)}
      />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}

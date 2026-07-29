"use client";
import { useState } from "react";
import { Header } from "./Header";
import { ContactModal } from "./ContactModal";

export function HeaderWrapper() {
  const [isContactOpen, setIsContactOpen] = useState(false);

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

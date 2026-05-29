"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { Instagram, Linkedin } from "lucide-react";

function TikTokIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
    </svg>
  );
}

type FooterModal = "legal" | "sitemap" | "contact" | null;
const MODAL_EXIT_DURATION_MS = 260;

export function Footer() {
  const [activeModal, setActiveModal] = useState<FooterModal>(null);
  const [renderedModal, setRenderedModal] = useState<FooterModal>(null);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const legalTitleId = useId();
  const sitemapTitleId = useId();
  const contactTitleId = useId();

  useEffect(() => {
    if (!activeModal) {
      return;
    }

    setRenderedModal(activeModal);
    setIsModalClosing(false);
    closeButtonRef.current?.focus();
  }, [activeModal]);

  useEffect(() => {
    if (!renderedModal) {
      if (!activeModal) {
        lastTriggerRef.current?.focus();
      }
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalClosing(true);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModal, renderedModal]);

  useEffect(() => {
    if (!isModalClosing) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setRenderedModal(null);
      setActiveModal(null);
      setIsModalClosing(false);
    }, MODAL_EXIT_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [isModalClosing]);

  const openModal = (
    modal: Exclude<FooterModal, null>,
    trigger: HTMLButtonElement
  ) => {
    lastTriggerRef.current = trigger;
    setIsModalClosing(false);
    setActiveModal(modal);
  };

  const closeModal = () => {
    setIsModalClosing(true);
  };

  const footerLinks: Array<{
    label: string;
    href?: string;
    newTab?: boolean;
    modal?: Exclude<FooterModal, null>;
  }> = [
    { label: "La grande classe", href: "https://lagrandeclasse.fr", newTab: true },
    { label: "Qui sommes-nous ?", href: "https://lagrandeclasse.fr/", newTab: true },
    { label: "Mentions légales", modal: "legal" },
    { label: "Plan du site", modal: "sitemap" },
    { label: "Contact", modal: "contact" },
  ];

  const socialLinks = [
    { icon: TikTokIcon, href: "https://www.tiktok.com/@lagrandeclasseofficiel", label: "TikTok" },
    { icon: Instagram, href: "https://www.instagram.com/lagrandeclasseidf/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/23704594/", label: "LinkedIn" },
  ];

  const partners = [
  "Ministère de la Santé‚",
    "CAF",
  ];

  const legalSections = [
    {
      title: "La Grande Classe",
      items: [
        { label: "Editeur du site", value: "LGC Jeunesse - SARL, 5000,00 EUR." },
        { label: "Siege social", value: "9 Rue de Saint-Denis, 93400 Saint-Ouen-sur-Seine." },
        { label: "SIRET", value: "508 304 185 00038." },
        { label: "Directeur de la publication", value: "Niang Ismael." },
        {
          label: "Contact",
          value: "01 40 10 27 22.",
          mailto: "contact@lagrandeclasse.fr",
        },
        { label: "Hebergement", value: "La grande classe - SARL." },
        { label: "Propriete intellectuelle", value: "contenus proteges, reproduction interdite sans autorisation." },
        {
          label: "Donnees personnelles",
          value: "usage limite aux services, droits RGPD (acces, rectification, opposition, suppression).",
        },
        { label: "Cookies", value: "utilisation possible pour ameliorer l'experience, desactivation via le navigateur." },
      ],
    },
    {
      title: "Petite Enfance",
      items: [
        { label: "Editeur du site", value: "LGC Jeunesse - SARL, 5000,00 EUR." },
        { label: "Siege social", value: "9 Rue de Saint-Denis, 93400 Saint-Ouen-sur-Seine." },
        { label: "SIRET", value: "508 304 185 00038." },
        { label: "Directeur de la publication", value: "Niang Ismael." },
        {
          label: "Contact",
          value: "01 40 10 27 22.",
          mailto: "contact@lagrandeclasse.fr",
        },
        { label: "Hebergement", value: "La grande classe - SARL." },
        { label: "Propriete intellectuelle", value: "contenus proteges, reproduction interdite sans autorisation." },
        {
          label: "Donnees personnelles",
          value: "usage limite aux services, droits RGPD (acces, rectification, opposition, suppression).",
        },
        { label: "Cookies", value: "utilisation possible pour ameliorer l'experience, desactivation via le navigateur." },
      ],
    },
  ];

  const sitemapLinks = [
    { label: "Petite enfance", href: "/#menu-nav" },
    { label: "Formation", href: "/formation" },
    { label: "Aides Finance", href: "/aide_finance" },
    { label: "Réglementation", href: "/reglementation" },
    { label: "Pratiques professionnelles", href: "/pratiques-professionnelles" },
    { label: "Pédagogie", href: "/pedagogie" },
  ];

  const contactItems = [
    { label: "Adresse", value: "9 rue de Saint-Denis, 93400 Saint-Ouen" },
    { label: "Téléphone", value: "01.40.10.27.22", href: "tel:0140102722" },
    { label: "Email", value: "amel.benhamdi@grandeclasse.fr", href: "mailto:amel.benhamdi@grandeclasse.fr" },
    { label: "Site officiel", value: "lagrandeclasse.fr", href: "https://lagrandeclasse.fr/" },
  ];

  const modalKey = renderedModal ?? activeModal;

  const modalContent = modalKey === "legal"
    ? {
        title: "Mentions legales",
        titleId: legalTitleId,
        body: (
          <div className="footer-modal__body">
            {legalSections.map((section) => (
              <section key={section.title} className="footer-modal__section">
                <h3 className="footer-modal__section-title">{section.title}</h3>
                <ul className="footer-modal__list">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <strong>{item.label} :</strong>{" "}
                      {item.mailto ? (
                        <>
                          <a href={`mailto:${item.mailto}`}>{item.mailto}</a>
                          {item.value ? ` - ${item.value}` : null}
                        </>
                      ) : (
                        item.value
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ),
      }
    : modalKey === "sitemap"
      ? {
          title: "Plan du site",
          titleId: sitemapTitleId,
          body: (
            <div className="footer-modal__body">
              <ul className="footer-modal__list footer-modal__list--links">
                {sitemapLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="footer-modal__link"
                      onClick={closeModal}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ),
        }
      : modalKey === "contact"
        ? {
            title: "Contact",
            titleId: contactTitleId,
            body: (
              <div className="footer-modal__body">
                <section className="footer-modal__section">
                  <ul className="footer-modal__list">
                    {contactItems.map((item) => (
                      <li key={item.label}>
                        <strong>{item.label} :</strong>{" "}
                        {item.href ? (
                          <a
                            href={item.href}
                            className="footer-modal__link"
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          >
                            {item.value}
                          </a>
                        ) : (
                          item.value
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            ),
          }
        : null;

  return (
    <footer className="site-footer">
      <div className="footer__outer">
        <div className="footer__inner">
          {/* Partners */}
          <div className="footer__partners">
            <h3 className="footer__partners-title">Nos partenaires</h3>
            <div className="footer__partner-list">
              {partners.map((partner) => (
                <div
                  key={partner}
                  className="footer__partner"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>

          <div className="footer__grid">
            {/* Links */}
            <div>
              <ul className="footer__links">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    {link.modal ? (
                      <button 
                        type="button"
                        className="footer__link footer__link--button"
                        aria-label={link.label}
                        onClick={(event: MouseEvent<HTMLButtonElement>) => {
                          openModal(link.modal ?? "legal", event.currentTarget);
                        }}
                        aria-expanded={activeModal === link.modal}
                        aria-haspopup="dialog"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href ?? "#"}
                        target={link.newTab ? "_blank" : "_self"}
                        rel={link.newTab ? "noopener noreferrer" : undefined}
                        className="footer__link"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div className="footer__social">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="footer__social-link"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="footer__social-icon" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>


          {modalContent ? (
            <div
              className={`footer-modal${isModalClosing ? " is-closing" : " is-open"}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby={modalContent.titleId}
            >
              <button
                type="button"
                className="footer-modal__overlay"
                onClick={closeModal}
                aria-label="Fermer la fenetre"
              />
              <div className="footer-modal__content" role="document" ref={dialogRef}>
                <div className="footer-modal__header">
                  <h2 className="footer-modal__title" id={modalContent.titleId}>
                    <Image
                      src="/asset/logo-transparent.png"
                      alt=""
                      className="footer-modal__logo"
                      aria-hidden="true"
                      width={44}
                      height={44}
                      sizes="2.75rem"
                      loading="lazy"
                    />
                    {modalContent.title}
                  </h2>
                  <button
                    type="button"
                    className="footer-modal__close"
                    onClick={closeModal}
                    ref={closeButtonRef}
                  >
                    Fermer
                  </button>
                </div>
                {modalContent.body}
              </div>
            </div>
          ) : null}

          {/* Copyright */}
          <div className="footer__copyright">
            {new Date().getFullYear()} LGC jeunesse. Tous droits reserves.
          </div>
        </div>
      </div>
    </footer>
  );
}

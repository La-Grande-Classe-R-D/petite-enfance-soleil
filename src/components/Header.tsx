"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface HeaderProps {
  isVisible?: boolean;
  onContactOpen?: () => void;
}

export function Header({ isVisible = true, onContactOpen }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { label: "Petite Enfance", href: "/#menu-nav", matchPath: "/" },
    { label: "Formation", href: "/formation", matchPath: "/formation" },
    { label: "Réglementation", href: "/reglementation", matchPath: "/reglementation" },
    {
      label: "Pratiques professionnelles",
      href: "/pratiques-professionnelles",
      matchPath: "/pratiques-professionnelles",
    },
    { label: "Pédagogie", href: "/pedagogie", matchPath: "/pedagogie" },
    { label: "Aides Financières ", href: "/aide_finance", matchPath: "/aide_finance" },
  ];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className={`site-header${isVisible ? " site-header--visible" : " site-header--hidden"}`}>
      <div className="header-main">
        <div className="header-main__inner">
          <Link href="/" className="header-logo" aria-label="Retour à l'accueil">
            <Image
              src="/asset/logo-transparent.png"
              alt="Logo La Petite Enfance"
              className="header-logo__icon"
              width={88}
              height={88}
              priority
              sizes="5.5rem"
            />
          </Link>
          <button
            type="button"
            className={`header-menu-button${isMenuOpen ? " header-menu-button--open" : ""}`}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="header-menu-button__line" />
            <span className="header-menu-button__line" />
            <span className="header-menu-button__line" />
          </button>
        </div>
      </div>

      <nav
        id="primary-navigation"
        className={`header-nav${isMenuOpen ? " header-nav--open" : ""}`}
        aria-label="Navigation principale"
      >
        <div className="header-nav__inner">
          <ul className="header-nav__list">
            {navLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`header-nav__link${item.matchPath && pathname === item.matchPath ? " header-nav__link--active" : ""}`}
                  aria-current={item.matchPath && pathname === item.matchPath ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="header-nav__link header-nav__link--contact"
                onClick={() => {
                  setIsMenuOpen(false);
                  onContactOpen?.();
                }}
              >
                Nous contacter
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

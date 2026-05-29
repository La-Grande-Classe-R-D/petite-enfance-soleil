"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { useFocusTrap } from "@/lib/useFocusTrap";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const firstInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const formOpenTime = useRef<number>(0);

  useFocusTrap(isOpen, dialogRef);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      formOpenTime.current = Date.now();
      document.body.style.overflow = "hidden";
      setTimeout(() => firstInputRef.current?.focus(), 300);
    } else {
      document.body.style.overflow = "";
      const t = setTimeout(() => {
        setIsVisible(false);
        setStatus("idle");
        setErrorMsg("");
        setNom("");
        setEmail("");
        setTelephone("");
        setMessage("");
        setHoneypot("");
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, handleClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          email,
          telephone,
          message,
          _hp: honeypot,
          _t: Date.now() - formOpenTime.current,
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? "Une erreur est survenue.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Impossible de contacter le serveur. Veuillez réessayer.");
    }
  };

  if (!isVisible && !isOpen) return null;

  return (
    <div
      className={`contact-modal${isOpen ? " contact-modal--open" : ""}`}
      role="presentation"
    >
      <div
        className="contact-modal__overlay"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        className={`contact-modal__content${isOpen ? " contact-modal__content--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <div className="contact-modal__header">
          <h2 id="contact-modal-title" className="contact-modal__title">Nous contacter</h2>
          <button
            type="button"
            className="contact-modal__close"
            onClick={handleClose}
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        {status === "success" ? (
          <div className="contact-modal__success">
            <span className="contact-modal__success-icon">✅</span>
            <p className="contact-modal__success-text">
              Message envoyé !
            </p>
            <p className="contact-modal__success-sub">
              Nous vous répondrons dans les plus brefs délais.
            </p>
            <button
              type="button"
              className="contact-modal__btn"
              onClick={handleClose}
            >
              Fermer
            </button>
          </div>
        ) : (
          <div className="contact-modal__body">
            <form className="contact-modal__form" onSubmit={handleSubmit} noValidate>
              {/* honeypot: invisible pour les humains, les bots le remplissent */}
              <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
                <label htmlFor="contact-website">Ne pas remplir</label>
                <input
                  id="contact-website"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="contact-modal__field">
                <label className="contact-modal__label" htmlFor="contact-nom">
                  Nom complet <span aria-hidden="true">*</span>
                </label>
                <input
                  ref={firstInputRef}
                  id="contact-nom"
                  type="text"
                  className="contact-modal__input"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                  disabled={status === "loading"}
                  autoComplete="name"
                />
              </div>

              <div className="contact-modal__field">
                <label className="contact-modal__label" htmlFor="contact-email">
                  Email <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="contact-modal__input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === "loading"}
                  autoComplete="email"
                />
              </div>

              <div className="contact-modal__field">
                <label className="contact-modal__label" htmlFor="contact-message">
                  Message <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  className="contact-modal__textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  minLength={10}
                  rows={4}
                  disabled={status === "loading"}
                />
              </div>

              {status === "error" && (
                <p className="contact-modal__error" role="alert">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className="contact-modal__btn"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Envoi en cours…" : "Envoyer le message"}
              </button>
            </form>

            <div className="contact-modal__divider">
              <span className="contact-modal__divider-text">ou</span>
            </div>

            <div className="contact-modal__phone">
              <p className="contact-modal__phone-label">Nous appeler directement</p>
              <a
                href="tel:+33140102722"
                className="contact-modal__phone-link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6 6l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                01 40 10 27 22
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

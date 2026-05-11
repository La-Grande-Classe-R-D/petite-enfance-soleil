"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) {
      setVisible(true);
    }
  }, []);

  const dismiss = (choice: "accepted" | "refused") => {
    localStorage.setItem(CONSENT_KEY, choice);
    setClosing(true);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <div
      className={`cookie-banner${closing ? " is-closing" : ""}`}
      role="region"
      aria-label="Consentement aux cookies"
    >
      <p className="cookie-banner__text">
        Ce site utilise des cookies fonctionnels pour améliorer votre expérience.
        Consultez nos{" "}
        <button
          type="button"
          className="cookie-banner__link"
          onClick={() =>
            document
              .querySelector<HTMLButtonElement>(".footer__link--button")
              ?.click()
          }
        >
          mentions légales
        </button>{" "}
        pour en savoir plus.
      </p>
      <div className="cookie-banner__actions">
        <button
          type="button"
          className="cookie-banner__btn cookie-banner__btn--refuse"
          onClick={() => dismiss("refused")}
        >
          Refuser
        </button>
        <button
          type="button"
          className="cookie-banner__btn cookie-banner__btn--accept"
          onClick={() => dismiss("accepted")}
        >
          Accepter
        </button>
      </div>
    </div>
  );
}

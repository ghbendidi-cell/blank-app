import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const links: { to: string; label: string }[] = [
    { to: "/", label: t.nav.home },
    { to: "/services", label: t.nav.services },
    { to: "/tarifs", label: t.nav.pricing },
    { to: "/a-propos", label: t.nav.about },
    { to: "/contact", label: t.nav.contact },
  ];

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.nav.menuOpen}
      className={`fixed inset-0 z-[60] flex flex-col bg-cream transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-end px-6">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="rounded-soft p-2 text-2xl leading-none text-ink transition-colors hover:text-olive focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
        >
          <span aria-hidden="true">&times;</span>
          <span className="sr-only">{t.nav.menuClose}</span>
        </button>
      </div>

      <nav
        className="flex flex-1 flex-col items-center justify-center gap-8 px-6"
        aria-label={t.nav.menuOpen}
      >
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={onClose}
            className="font-serif text-3xl text-ink transition-colors hover:text-olive focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive sm:text-4xl"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex justify-center pb-10">
        <LanguageSwitcher />
      </div>
    </div>,
    document.body
  );
}

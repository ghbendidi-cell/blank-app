import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelection } from "../context/SelectionContext";
import { useLanguage } from "../i18n/LanguageContext";
import { formatTemplate } from "../lib/format";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const { t } = useLanguage();
  const { count } = useSelection();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function handleCtaClick() {
    if (location.pathname === "/") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/contact");
    }
  }

  const selectionLabel =
    count === 0
      ? null
      : count === 1
        ? t.selection.countOne
        : formatTemplate(t.selection.countOther, { n: count });

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/5 bg-cream/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            className="flex items-center gap-2 rounded-soft p-1.5 text-ink transition-colors hover:text-olive focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
            </svg>
            <span className="sr-only">{t.nav.menuOpen}</span>
          </button>
          {selectionLabel && (
            <span className="hidden text-xs tracking-wide text-ink-light sm:inline">
              {selectionLabel}
            </span>
          )}
        </div>

        <Link
          to="/"
          className="font-serif text-sm tracking-widest2 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          {t.nav.brand}
        </Link>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleCtaClick}
            className="hidden rounded-soft bg-olive px-4 py-2 text-xs tracking-wide text-cream transition-colors hover:bg-olive-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive sm:inline-block"
          >
            {t.hero.cta}
          </button>
          <LanguageSwitcher />
        </div>
      </div>

      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </header>
  );
}

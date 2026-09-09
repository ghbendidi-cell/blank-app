import { useLanguage } from "../i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/5 bg-cream/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <nav className="hidden gap-6 text-sm text-ink-light md:flex" aria-label="Primary">
          <button
            type="button"
            onClick={() => scrollToId("services")}
            className="tracking-wide transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
          >
            {t.nav.services}
          </button>
          <button
            type="button"
            onClick={() => scrollToId("contact")}
            className="tracking-wide transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
          >
            {t.nav.contact}
          </button>
        </nav>

        <button
          type="button"
          onClick={() => scrollToId("top")}
          className="font-serif text-sm tracking-widest2 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          {t.nav.brand}
        </button>

        <LanguageSwitcher />
      </div>
    </header>
  );
}

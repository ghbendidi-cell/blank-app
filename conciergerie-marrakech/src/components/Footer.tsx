import { BRAND_NAME, CONTACT_EMAIL } from "../config";
import { useLanguage } from "../i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <div>
          <p className="font-serif text-sm tracking-widest2 text-ink">
            {BRAND_NAME}
          </p>
          <p className="mt-1 text-sm text-ink-light">{t.footer.tagline}</p>
        </div>

        <div className="text-sm text-ink-light">
          <p className="uppercase tracking-wide text-xs text-ink-light/80">
            {t.footer.contactLabel}
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-1 block transition-colors hover:text-ink"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <div className="flex flex-col items-center gap-3 sm:items-end">
          <LanguageSwitcher />
          <div className="flex gap-4 text-xs text-ink-light">
            {t.footer.legalLinks.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-ink-light/70">
        © {year} {BRAND_NAME}. {t.footer.rights}
      </p>
    </footer>
  );
}

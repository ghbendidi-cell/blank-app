import { useLanguage } from "../i18n/LanguageContext";
import { languages } from "../i18n/translations";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 text-sm tracking-wide" role="group" aria-label="Language">
      {languages.map((lang, index) => (
        <span key={lang} className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setLanguage(lang)}
            aria-pressed={language === lang}
            className={`rounded-soft px-1.5 py-1 uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive ${
              language === lang
                ? "text-ink font-medium"
                : "text-ink-light hover:text-ink"
            }`}
          >
            {lang}
          </button>
          {index < languages.length - 1 && (
            <span className="text-ink-light" aria-hidden="true">
              /
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

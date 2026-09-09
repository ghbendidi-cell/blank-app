import { useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { asset } from "../lib/asset";

export function About() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = `${t.about.heading} — ${t.nav.brand}`;
  }, [t]);

  return (
    <section className="px-6 py-28 sm:py-32">
      <div className="mx-auto grid max-w-5xl items-center gap-12 sm:grid-cols-[minmax(0,280px)_1fr]">
        <img
          src={asset("images/about-portrait-placeholder.svg")}
          alt={t.about.photoAlt}
          className="aspect-[4/5] w-full max-w-xs rounded-soft object-cover sm:max-w-none"
        />

        <div>
          <h1 className="font-serif text-3xl text-ink sm:text-4xl">
            {t.about.heading}
          </h1>
          <div className="mt-6 space-y-4">
            {t.about.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-prose text-base leading-relaxed text-ink-light"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

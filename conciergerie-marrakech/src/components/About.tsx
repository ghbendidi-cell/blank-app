import { useLanguage } from "../i18n/LanguageContext";

export function About() {
  const { t } = useLanguage();

  return (
    <section className="px-6 py-24 sm:py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-12 sm:grid-cols-[minmax(0,280px)_1fr]">
        <img
          src="images/about-portrait-placeholder.svg"
          alt={t.about.photoAlt}
          className="aspect-[4/5] w-full max-w-xs rounded-soft object-cover sm:max-w-none"
        />

        <div>
          <h2 className="font-serif text-3xl text-ink sm:text-4xl">
            {t.about.heading}
          </h2>
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

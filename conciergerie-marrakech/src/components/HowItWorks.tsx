import { useLanguage } from "../i18n/LanguageContext";

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section className="bg-cream-soft px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-serif text-3xl text-ink sm:text-4xl">
          {t.howItWorks.heading}
        </h2>

        <ol className="mt-14 grid gap-12 sm:grid-cols-3">
          {t.howItWorks.steps.map((step, index) => (
            <li key={step.title}>
              <span className="font-serif text-3xl text-terracotta">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-serif text-lg text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-light">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

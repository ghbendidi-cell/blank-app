import { useLanguage } from "../i18n/LanguageContext";

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="bg-cream-soft px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-serif text-3xl text-ink sm:text-4xl">
          {t.services.heading}
        </h2>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((item) => (
            <div key={item.title}>
              <h3 className="font-serif text-lg text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

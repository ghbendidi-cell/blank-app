import { useEffect } from "react";
import { ServiceCard } from "../components/ServiceCard";
import { SERVICE_SLUGS } from "../data/services";
import { useLanguage } from "../i18n/LanguageContext";

export function ServicesList() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = `${t.servicesPage.heading} — ${t.nav.brand}`;
  }, [t]);

  return (
    <section className="px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-3xl text-ink sm:text-4xl">
            {t.servicesPage.heading}
          </h1>
          <p className="mt-3 text-ink-light">{t.servicesPage.subheading}</p>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_SLUGS.map((slug) => (
            <ServiceCard key={slug} slug={slug} />
          ))}
        </div>
      </div>
    </section>
  );
}

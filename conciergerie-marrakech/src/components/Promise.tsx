import { useLanguage } from "../i18n/LanguageContext";

export function Promise() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
      <p className="max-w-prose mx-auto font-serif text-xl leading-relaxed text-ink sm:text-2xl">
        {t.promise.paragraph}
      </p>
    </section>
  );
}

import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { agency } from "@/data/agency";
import { whatsappLink } from "@/lib/locale-content";
import Breadcrumb from "@/components/Breadcrumb";
import ContactRequestForm from "@/components/ContactRequestForm";
import StickyContactBar from "@/components/StickyContactBar";

export default async function GroupTravelPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("groupes");
  const tHome = await getTranslations("home");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");

  const waMessage =
    locale === "ar"
      ? "مرحبا، أرغب في طلب عرض سعر لرحلة جماعية."
      : "Bonjour, je souhaite un devis pour un voyage de groupe.";

  const groupTypes = [1, 2, 3, 4] as const;
  const processSteps = [1, 2, 3] as const;

  return (
    <div className="bg-ivory pb-24">
      <Breadcrumb items={[{ label: tCommon("seeAll"), href: "/" }, { label: tNav("groupes") }]} />

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t("eyebrow")}</p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl text-ink sm:text-5xl">
          {t.rich("richTitle", { i: (chunks) => <em className="italic">{chunks}</em> })}
        </h1>
        <p className="mt-4 max-w-xl font-sans text-base text-ink/60">{t("subtitle")}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {groupTypes.map((n) => {
            const card = (
              <div className="h-full rounded-[20px] border border-ink/10 bg-white p-6 transition-colors hover:border-accent/40">
                <p className="font-display text-lg italic text-ink">{t(`type${n}Title` as "type1Title")}</p>
                <p className="mt-2 font-sans text-sm text-ink/60">{t(`type${n}Text` as "type1Text")}</p>
              </div>
            );
            return n === 4 ? (
              <Link key={n} href="/omra-hajj" className="block">
                {card}
              </Link>
            ) : (
              <div key={n}>{card}</div>
            );
          })}
        </div>

        <section className="mt-16 border-t border-ink/10 pt-16">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t("processEyebrow")}</p>
          <h2 className="mt-3 max-w-xl font-display text-2xl italic text-ink sm:text-3xl">{t("processTitle")}</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {processSteps.map((n) => (
              <div key={n}>
                <p className="font-display text-3xl italic text-accent/50">0{n}</p>
                <p className="mt-3 font-display text-lg italic text-ink">{tHome(`process${n}Title` as "process1Title")}</p>
                <p className="mt-2 font-sans text-sm text-ink/60">{tHome(`process${n}Text` as "process1Text")}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-[20px] bg-ivory-dark p-8 lg:p-10">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t("advantagesEyebrow")}</p>
          <h2 className="mt-3 font-display text-2xl italic text-ink sm:text-3xl">{t("advantagesTitle")}</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="border-t border-ink/15 pt-4">
                <p className="font-display text-base italic text-ink">{t(`advantage${n}Title` as "advantage1Title")}</p>
                <p className="mt-1 font-sans text-sm text-ink/60">{t(`advantage${n}Text` as "advantage1Text")}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-10 border-t border-ink/10 pt-16 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t("conversionEyebrow")}</p>
            <h2 className="mt-3 font-display text-2xl italic text-ink sm:text-3xl">{t("conversionTitle")}</h2>
            <p className="mt-3 max-w-md font-sans text-sm text-ink/60">{t("conversionSubtitle")}</p>
            <a
              href={whatsappLink(agency.whatsapp, waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-salmon px-8 py-4 font-sans text-sm font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-salmon-dark"
            >
              {t("whatsappCta")} →
            </a>
          </div>
          <ContactRequestForm />
        </section>
      </div>

      <StickyContactBar />
    </div>
  );
}

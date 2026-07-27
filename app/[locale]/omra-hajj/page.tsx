import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { packs } from "@/data/packs";
import { agency } from "@/data/agency";
import { pick, formatMad, whatsappLink } from "@/lib/locale-content";
import Breadcrumb from "@/components/Breadcrumb";
import ParallaxImage from "@/components/animations/ParallaxImage";
import OmraContactForm from "@/components/OmraContactForm";
import StickyContactBar from "@/components/StickyContactBar";

export default async function OmraHajjPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("omra");
  const tHome = await getTranslations("home");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");
  const tPackDetail = await getTranslations("packDetail");

  const hajjPack = packs.find((p) => p.tripType === "hajj");
  const trustBandeau = t.raw("trustBandeau") as string[];
  const packTitle = hajjPack ? pick(hajjPack.titleFr, hajjPack.titleAr, locale) : undefined;

  const waMessage =
    locale === "ar"
      ? "مرحبا، أرغب في الحصول على معلومات حول برنامج العمرة والحج."
      : "Bonjour, je souhaite avoir des informations sur le programme Omra/Hajj.";

  return (
    <div className="bg-ivory pb-24">
      <Breadcrumb items={[{ label: tCommon("seeAll"), href: "/" }, { label: tNav("omra") }]} />

      <div className="relative min-h-[420px] overflow-hidden lg:min-h-[560px]">
        <ParallaxImage
          src="/images/mecque-omra.jpg"
          alt={locale === "ar" ? "المسجد الحرام والكعبة المشرفة، مكة المكرمة" : "La Mosquée Al-Haram et la Kaaba, La Mecque"}
          className="absolute inset-0 h-full w-full"
          strength={35}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-10">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">{t("eyebrow")}</p>
            <h1 className="mt-3 font-display text-3xl italic text-ivory drop-shadow-lg sm:text-5xl">{tHome("omraTitle")}</h1>
            <p className="mt-3 max-w-xl font-sans text-sm text-ivory/85 sm:text-base">{tHome("omraSubtitle")}</p>
          </div>
        </div>
      </div>

      <div className="border-b border-ink/10 bg-ivory-dark">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-4 sm:px-6 lg:px-10">
          {trustBandeau.map((label) => (
            <span key={label} className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/60">
              {label}
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-[20px] lg:order-1">
            <Image
              src="/images/mecque-grande-mosquee.jpg"
              alt={locale === "ar" ? "المسجد الكبير" : "Grande mosquée"}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t("whyEyebrow")}</p>
            <h2 className="mt-3 font-display text-2xl italic text-ink sm:text-3xl">{t("whyTitle")}</h2>
            <ul className="mt-6 space-y-5">
              {[1, 2, 3, 4].map((n) => (
                <li key={n} className="border-t border-ink/10 pt-4">
                  <p className="font-display text-base italic text-ink">{t(`why${n}Title` as "why1Title")}</p>
                  <p className="mt-1 font-sans text-sm text-ink/60">{t(`why${n}Text` as "why1Text")}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {hajjPack && (
        <section className="border-t border-ink/10 bg-ivory-dark">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t("programEyebrow")}</p>
            <h2 className="mt-3 font-display text-2xl italic text-ink sm:text-3xl">{t("programTitle")}</h2>
            <p className="mt-2 font-sans text-sm text-ink/60">{t("programSubtitle")}</p>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {hajjPack.itinerary.map((step) => (
                <div key={step.dayNumber} className="rounded-[20px] bg-ivory p-6">
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-accent">
                    {tPackDetail("day", { number: step.dayNumber })}
                  </p>
                  <p className="mt-2 font-display text-lg italic text-ink">{pick(step.titleFr, step.titleAr, locale)}</p>
                  <p className="mt-2 font-sans text-sm text-ink/60">{pick(step.descriptionFr, step.descriptionAr, locale)}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink/50">{tPackDetail("inclusions")}</h3>
                <ul className="mt-3 space-y-2">
                  {(locale === "ar" ? hajjPack.inclusionsAr : hajjPack.inclusionsFr).map((item) => (
                    <li key={item} className="flex gap-2 font-sans text-sm text-ink/70">
                      <span className="text-accent" aria-hidden>
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink/50">{tPackDetail("exclusions")}</h3>
                <ul className="mt-3 space-y-2">
                  {(locale === "ar" ? hajjPack.exclusionsAr : hajjPack.exclusionsFr).map((item) => (
                    <li key={item} className="flex gap-2 font-sans text-sm text-ink/50">
                      <span aria-hidden>–</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink/50">{tPackDetail("priceVariants")}</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {hajjPack.priceVariants.map((variant) => (
                  <div key={variant.labelFr} className="rounded-[20px] border border-ink/10 bg-ivory p-5">
                    <p className="font-sans text-sm text-ink/60">{pick(variant.labelFr, variant.labelAr, locale)}</p>
                    <p className="mt-1 font-display text-xl text-ink">{formatMad(variant.price, locale)}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-8 max-w-xl font-sans text-sm text-ink/50">{t("inclusionsNote")}</p>
            <Link
              href={`/packs/${hajjPack.slug}`}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-ivory"
            >
              {t("seeFullProgram")} →
            </Link>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
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
          <OmraContactForm packId={hajjPack?.id} packTitle={packTitle} />
        </div>
      </section>

      <StickyContactBar />
    </div>
  );
}

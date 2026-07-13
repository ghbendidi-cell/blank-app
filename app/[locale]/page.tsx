import { getTranslations, getLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { destinations } from "@/data/destinations";
import { packs } from "@/data/packs";
import { reviews } from "@/data/reviews";
import { pick, formatMad } from "@/lib/locale-content";
import SearchBar from "@/components/SearchBar";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import BentoPackGrid from "@/components/BentoPackGrid";
import StickyNarrative from "@/components/StickyNarrative";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import AgencyLocationCard from "@/components/AgencyLocationCard";
import ContactRequestForm from "@/components/ContactRequestForm";
import StatsStrip from "@/components/StatsStrip";
import HeroBackground from "@/components/HeroBackground";
import DestinationRouteMap from "@/components/DestinationRouteMap";
import TravelQuiz from "@/components/TravelQuiz";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";

const HERO_IMAGE =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3FzLTlt28p4tBZh58xHOYeBE65G/hf_20260713_021157_1e1d06a4-5d7d-44c4-bebc-10531068b70c.png";
const OMRA_IMAGE =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3FzLTlt28p4tBZh58xHOYeBE65G/hf_20260713_021203_c259a2f2-4b7d-495f-abfc-fe3cd296c467.png";
const AGENCY_IMAGE =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3FzLTlt28p4tBZh58xHOYeBE65G/hf_20260713_021208_d53af3a7-bd04-40ac-8375-e0d7af7469d1.png";

const DESTINATION_IMAGES: Record<string, string> = {
  "dest-egypte": "https://d8j0ntlcm91z4.cloudfront.net/user_3FzLTlt28p4tBZh58xHOYeBE65G/hf_20260713_023854_769aba17-c3fe-4934-907b-90e16e3e1c8e.png",
  "dest-vietnam": "https://d8j0ntlcm91z4.cloudfront.net/user_3FzLTlt28p4tBZh58xHOYeBE65G/hf_20260713_023858_c3303bb7-5de9-444c-82d2-3bbd1133502c.png",
  "dest-turquie": "https://d8j0ntlcm91z4.cloudfront.net/user_3FzLTlt28p4tBZh58xHOYeBE65G/hf_20260713_023903_3640f9a5-208d-45ed-8f9e-91442378492a.png",
  "dest-arabie-saoudite": "https://d8j0ntlcm91z4.cloudfront.net/user_3FzLTlt28p4tBZh58xHOYeBE65G/hf_20260713_023911_5d00e8b4-34a6-4230-9118-ac6a616dffe9.png",
};

export default async function HomePage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");
  const tQuiz = await getTranslations("quiz");

  const featuredDestinations = destinations.filter((d) => d.featured).slice(0, 4);
  const featuredPacks = packs.filter((p) => p.isFeatured).slice(0, 6);
  const omraPack = packs.find((p) => p.tripType === "omra" || p.tripType === "hajj");
  const featuredReviews = reviews.slice(0, 6);

  const destinationsWithPrice = featuredDestinations.map((destination) => {
    const destPacks = packs.filter((p) => p.destinationId === destination.id);
    const minPrice = destPacks.length > 0 ? Math.min(...destPacks.map((p) => p.priceFrom)) : null;
    return { destination, minPrice };
  });

  const omraHighlights = omraPack ? (locale === "ar" ? omraPack.highlightsAr : omraPack.highlightsFr) : [];

  return (
    <div className="relative overflow-x-clip">
      {/* Hero */}
      <section className="relative min-h-[620px] overflow-hidden lg:min-h-[760px]">
        <HeroBackground src={HERO_IMAGE} alt="" />
        <div className="relative mx-auto flex h-full min-h-[620px] max-w-7xl flex-col justify-end gap-6 px-6 pb-16 pt-32 lg:min-h-[760px] lg:px-10 lg:pb-20">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-ivory/85">{t("heroEyebrow")}</span>
          <h1 className="max-w-2xl font-display text-5xl italic leading-[1.05] text-ivory sm:text-7xl">{t("heroTitle")}</h1>
          <p className="max-w-md font-sans text-sm font-light text-ivory/85 sm:text-base">{t("heroSubtitle")}</p>
          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-start">
            <SearchBar />
            <Button href="/contact" tone="light" className="shrink-0">
              {t("heroCta")}
            </Button>
          </div>
        </div>
      </section>

      {/* Manifeste */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-10">
        <Eyebrow className="justify-center">{t("manifestoEyebrow")}</Eyebrow>
        <p className="mt-6 font-display text-2xl italic leading-relaxed text-ink sm:text-3xl">{t("manifestoText")}</p>
      </section>

      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <StatsStrip destinationsCount={destinations.length} packsCount={packs.length} />
      </div>

      {/* Destinations signature */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>{t("destinationsEyebrow")}</Eyebrow>
            <h2 className="mt-3 font-display text-4xl italic text-ink sm:text-5xl">{t("popularDestinations")}</h2>
          </div>
          <Button href="/destinations" tone="dark">
            {tCommon("seeAll")}
          </Button>
        </div>
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {destinationsWithPrice.map(({ destination, minPrice }, index) => (
            <Link key={destination.id} href={`/destinations/${destination.slug}`} className="group block">
              <div className="overflow-hidden">
                <ImagePlaceholder
                  image={{ ...destination.heroImage, url: DESTINATION_IMAGES[destination.id] ?? destination.heroImage.url }}
                  locale={locale}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4 border-t border-ink/15 pt-4">
                <div>
                  <span className="font-sans text-xs text-ink/40">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-1 font-display text-2xl italic text-ink group-hover:underline">
                    {pick(destination.nameFr, destination.nameAr, locale)}
                  </h3>
                  <p className="mt-1 max-w-sm font-sans text-sm font-light text-ink/60">
                    {pick(destination.descriptionFr, destination.descriptionAr, locale)}
                  </p>
                </div>
                {minPrice !== null && (
                  <span className="shrink-0 whitespace-nowrap font-sans text-sm text-ink/70">
                    {tCommon("from")} {formatMad(minPrice, locale)}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Route map */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-10 text-center">
          <Eyebrow className="justify-center">{t("routeMapEyebrow")}</Eyebrow>
          <h2 className="mt-3 font-display text-4xl italic text-ink sm:text-5xl">{t("routeMapTitle")}</h2>
          <p className="mx-auto mt-3 max-w-xl font-sans text-sm font-light text-ink/60">{t("routeMapSubtitle")}</p>
        </div>
        <DestinationRouteMap />
      </section>

      {/* Packs à la une */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>{t("packsEyebrow")}</Eyebrow>
            <h2 className="mt-3 font-display text-4xl italic text-ink sm:text-5xl">{t("featuredPacks")}</h2>
          </div>
          <Button href="/packs" tone="dark">
            {tCommon("seeAllPacks")}
          </Button>
        </div>
        <BentoPackGrid packs={featuredPacks} locale={locale} />
      </section>

      {/* Omra Premium */}
      {omraPack && (
        <section className="relative overflow-hidden bg-ink px-6 py-28 text-center text-ivory lg:px-10">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={OMRA_IMAGE} alt="" className="h-full w-full object-cover opacity-45" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/50" />
          </div>
          <div className="relative mx-auto max-w-2xl">
            <Eyebrow tone="ivory" className="justify-center">
              {t("omraEyebrow")}
            </Eyebrow>
            <h2 className="mt-4 font-display text-4xl italic text-gold sm:text-5xl">{t("omraTitle")}</h2>
            <p className="mx-auto mt-4 max-w-xl font-sans font-light text-ivory/85">{t("omraSubtitle")}</p>
            {omraHighlights.length > 0 && (
              <ul className="mx-auto mt-8 flex max-w-lg flex-col gap-2 font-sans text-sm text-ivory/80 sm:flex-row sm:justify-center sm:gap-8">
                {omraHighlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
            <p className="mt-8 font-display text-2xl italic text-gold">
              {tCommon("from")} {formatMad(omraPack.priceFrom, locale)}
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/omra-hajj" tone="light">
                {t("omraCta")}
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Processus sur-mesure */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-12 max-w-xl">
          <Eyebrow>{t("processEyebrow")}</Eyebrow>
          <h2 className="mt-3 font-display text-4xl italic text-ink sm:text-5xl">{t("processTitle")}</h2>
        </div>
        <div className="grid gap-10 border-t border-ink/15 pt-10 sm:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n}>
              <span className="font-display text-3xl italic text-accent">{String(n).padStart(2, "0")}</span>
              <h3 className="mt-3 font-sans text-sm font-semibold uppercase tracking-[0.1em] text-ink">
                {t(`process${n}Title` as "process1Title")}
              </h3>
              <p className="mt-2 font-sans text-sm font-light text-ink/60">{t(`process${n}Text` as "process1Text")}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pourquoi nous : narration au scroll */}
      <StickyNarrative
        image={AGENCY_IMAGE}
        eyebrow={t("narrativeEyebrow")}
        steps={[
          { title: t("whyUs1Title"), text: t("whyUs1Text") },
          { title: t("whyUs2Title"), text: t("whyUs2Text") },
          { title: t("whyUs3Title"), text: t("whyUs3Text") },
        ]}
      />

      {/* Le Journal — repères pratiques réels */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-12 max-w-xl">
          <Eyebrow>{t("journalEyebrow")}</Eyebrow>
          <h2 className="mt-3 font-display text-4xl italic text-ink sm:text-5xl">{t("journalTitle")}</h2>
          <p className="mt-3 font-sans text-sm font-light text-ink/60">{t("journalSubtitle")}</p>
        </div>
        <div className="grid gap-8 border-t border-ink/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <div key={destination.id}>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-accent">
                {pick(destination.nameFr, destination.nameAr, locale)}
              </p>
              <p className="mt-3 font-display text-lg italic text-ink">
                {pick(destination.bestPeriodFr, destination.bestPeriodAr, locale)}
              </p>
              {destination.visaInfoFr && (
                <p className="mt-2 font-sans text-sm font-light text-ink/60">
                  {pick(destination.visaInfoFr, destination.visaInfoAr, locale)}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Quiz */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Eyebrow className="justify-center">{t("quizEyebrow")}</Eyebrow>
          <h2 className="mt-3 font-display text-4xl italic text-ink sm:text-5xl">{tQuiz("teaser")}</h2>
          <p className="mt-3 font-sans text-sm font-light text-ink/60">{tQuiz("cta")}</p>
        </div>
        <TravelQuiz />
      </section>

      {/* Preuve sociale */}
      {featuredReviews.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mb-10 text-center">
            <Eyebrow className="justify-center">{t("testimonialsEyebrow")}</Eyebrow>
            <h2 className="mt-3 font-display text-4xl italic text-ink sm:text-5xl">{t("testimonialsTitle")}</h2>
          </div>
          <TestimonialCarousel reviews={featuredReviews} />
        </section>
      )}

      {/* Contact / lead capture */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-12 max-w-xl">
          <Eyebrow>{t("visitEyebrow")}</Eyebrow>
          <h2 className="mt-3 font-display text-4xl italic text-ink sm:text-5xl">{t("visitTitle")}</h2>
          <p className="mt-3 font-sans text-sm font-light text-ink/60">{t("visitSubtitle")}</p>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <AgencyLocationCard />
          <ContactRequestForm />
        </div>
      </section>
    </div>
  );
}

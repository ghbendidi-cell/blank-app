import { getTranslations, getLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { destinations } from "@/data/destinations";
import { packs } from "@/data/packs";
import { reviews } from "@/data/reviews";
import SearchBar from "@/components/SearchBar";
import DestinationCard from "@/components/DestinationCard";
import BentoPackGrid from "@/components/BentoPackGrid";
import StickyNarrative from "@/components/StickyNarrative";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import AgencyLocationCard from "@/components/AgencyLocationCard";
import StatsStrip from "@/components/StatsStrip";
import HeroBackground from "@/components/HeroBackground";
import DestinationRouteMap from "@/components/DestinationRouteMap";
import TravelQuiz from "@/components/TravelQuiz";
import Eyebrow from "@/components/ui/Eyebrow";
import PillButton from "@/components/ui/PillButton";

export default async function HomePage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");
  const tQuiz = await getTranslations("quiz");

  const featuredDestinations = destinations.filter((d) => d.featured).slice(0, 4);
  const featuredPacks = packs.filter((p) => p.isFeatured).slice(0, 6);
  const omraPack = packs.find((p) => p.tripType === "omra" || p.tripType === "hajj");
  const featuredReviews = reviews.slice(0, 6);
  const heroTitle = t("heroTitle");
  const [heroTitleBefore, heroTitleAfter] = heroTitle.split("Millenium Travel");

  return (
    <div className="relative overflow-x-clip">
      <section className="relative min-h-[480px] overflow-hidden lg:min-h-[600px]">
        <HeroBackground />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,28,26,0.6),transparent_70%)] lg:bg-[radial-gradient(ellipse_at_center,rgba(20,28,26,0.45),transparent_65%)]" />
        <div className="relative mx-auto flex h-full min-h-[480px] max-w-7xl flex-col items-center justify-center gap-5 px-4 pb-24 pt-24 text-center lg:min-h-[600px]">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/80">{t("heroEyebrow")}</span>
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl">
            {heroTitleBefore}
            <span className="text-accent">Millenium Travel</span>
            {heroTitleAfter}
          </h1>
          <p className="max-w-xl text-white/90">{t("heroSubtitle")}</p>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-12 flex max-w-2xl flex-col items-center gap-6 px-4 sm:-mt-16">
        <SearchBar />
        <div className="w-full max-w-md">
          <StatsStrip destinationsCount={destinations.length} packsCount={packs.length} />
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-28">
        <div className="mb-10 text-center">
          <Eyebrow>{t("routeMapEyebrow")}</Eyebrow>
          <h2 className="mt-2 text-3xl font-display font-extrabold tracking-tight text-slate-900 sm:text-4xl">{t("routeMapTitle")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600">{t("routeMapSubtitle")}</p>
        </div>
        <DestinationRouteMap />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-28">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>{t("destinationsEyebrow")}</Eyebrow>
            <h2 className="mt-2 text-3xl font-display font-extrabold tracking-tight text-slate-900 sm:text-4xl">{t("popularDestinations")}</h2>
          </div>
          <PillButton href="/destinations" tone="brand" variant="outline">
            {tCommon("seeAll")}
          </PillButton>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} locale={locale} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-28">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>{t("packsEyebrow")}</Eyebrow>
            <h2 className="mt-2 text-3xl font-display font-extrabold tracking-tight text-slate-900 sm:text-4xl">{t("featuredPacks")}</h2>
          </div>
          <PillButton href="/packs" tone="accent" variant="outline">
            {tCommon("seeAllPacks")}
          </PillButton>
        </div>
        <BentoPackGrid packs={featuredPacks} locale={locale} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-28">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <Eyebrow>{t("quizEyebrow")}</Eyebrow>
          <h2 className="mt-2 text-3xl font-display font-extrabold tracking-tight text-slate-900 sm:text-4xl">{tQuiz("teaser")}</h2>
          <p className="mt-3 text-sm text-slate-600">{tQuiz("cta")}</p>
        </div>
        <TravelQuiz />
      </section>

      {omraPack && (
        <section className="relative overflow-hidden bg-hajj px-4 py-16 text-center">
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-40"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_3FzLTlt28p4tBZh58xHOYeBE65G/hf_20260704_114707_0de6c178-692d-4188-be84-30e1e577077b.mp4"
            poster="/images/mecque-omra.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-hajj/90 to-hajj-dark/95" />
          <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-4">
            <h2 className="text-3xl font-display font-extrabold tracking-tight text-gold sm:text-4xl">{t("omraTitle")}</h2>
            <p className="max-w-xl text-sm text-white/90">{t("omraSubtitle")}</p>
            <PillButton href="/omra-hajj" tone="gold">
              {t("omraCta")}
            </PillButton>
          </div>
        </section>
      )}

      <StickyNarrative
        image="/images/turquie-oludeniz-aerien.jpg"
        eyebrow={t("whyUsTitle")}
        steps={[
          { title: t("whyUs1Title"), text: t("whyUs1Text") },
          { title: t("whyUs2Title"), text: t("whyUs2Text") },
          { title: t("whyUs3Title"), text: t("whyUs3Text") },
        ]}
      />

      {featuredReviews.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-28">
          <div className="mb-8 text-center">
            <Eyebrow>{t("testimonialsEyebrow")}</Eyebrow>
            <h2 className="mt-2 text-3xl font-display font-extrabold tracking-tight text-slate-900 sm:text-4xl">{t("testimonialsTitle")}</h2>
          </div>
          <TestimonialCarousel reviews={featuredReviews} />
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-28">
        <Eyebrow>{t("visitEyebrow")}</Eyebrow>
        <h2 className="mt-2 text-3xl font-display font-extrabold tracking-tight text-slate-900 sm:text-4xl">{t("visitTitle")}</h2>
        <p className="mb-8 mt-3 text-sm text-slate-600">{t("visitSubtitle")}</p>
        <div className="max-w-lg">
          <AgencyLocationCard />
        </div>
      </section>
    </div>
  );
}

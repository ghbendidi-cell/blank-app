import { getTranslations, getLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { destinations } from "@/data/destinations";
import { packs } from "@/data/packs";
import { reviews } from "@/data/reviews";
import SearchBar from "@/components/SearchBar";
import DestinationCard from "@/components/DestinationCard";
import BentoPackGrid from "@/components/BentoPackGrid";
import TrustBadges from "@/components/TrustBadges";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import AgencyLocationCard from "@/components/AgencyLocationCard";
import StatsStrip from "@/components/StatsStrip";
import HeroBackground from "@/components/HeroBackground";
import DestinationRouteMap from "@/components/DestinationRouteMap";
import TravelQuiz from "@/components/TravelQuiz";

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
    <div className="relative overflow-x-hidden">
      <section className="relative min-h-[480px] overflow-hidden bg-brand-dark lg:min-h-[680px]">
        <HeroBackground />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,28,26,0.6),transparent_70%)] lg:bg-[radial-gradient(ellipse_at_center,rgba(20,28,26,0.45),transparent_65%)]" />
        <div className="relative mx-auto flex h-full min-h-[480px] max-w-7xl flex-col items-center justify-center gap-6 px-4 py-24 text-center lg:min-h-[680px]">
          <span className="rounded-full border border-white/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
            {t("heroEyebrow")}
          </span>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl">
            {heroTitleBefore}
            <span className="text-accent">Millenium Travel</span>
            {heroTitleAfter}
          </h1>
          <p className="max-w-xl text-white/90">{t("heroSubtitle")}</p>
          <SearchBar />
          <div className="mt-4 w-full max-w-md">
            <StatsStrip destinationsCount={destinations.length} packsCount={packs.length} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-28">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900">{t("routeMapTitle")}</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">{t("routeMapSubtitle")}</p>
        </div>
        <DestinationRouteMap />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-28">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">{t("popularDestinations")}</h2>
          <Link href="/destinations" className="text-sm font-medium text-brand hover:underline">
            {tCommon("seeAll")}
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} locale={locale} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-28">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">{t("featuredPacks")}</h2>
          <Link href="/packs" className="text-sm font-medium text-brand hover:underline">
            {tCommon("seeAllPacks")}
          </Link>
        </div>
        <BentoPackGrid packs={featuredPacks} locale={locale} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-28">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-slate-900">{tQuiz("teaser")}</h2>
          <p className="mt-2 text-sm text-slate-600">{tQuiz("cta")}</p>
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
            <h2 className="text-2xl font-bold text-gold">{t("omraTitle")}</h2>
            <p className="max-w-xl text-sm text-white/90">{t("omraSubtitle")}</p>
            <Link href="/omra-hajj" className="inline-block rounded-full bg-gold px-6 py-3 text-sm font-semibold text-hajj-dark transition hover:bg-gold-dark hover:text-white">
              {t("omraCta")}
            </Link>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-28">
        <h2 className="mb-8 text-2xl font-bold text-slate-900">{t("whyUsTitle")}</h2>
        <TrustBadges />
      </section>

      {featuredReviews.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-28">
          <h2 className="mb-8 text-2xl font-bold text-slate-900">{t("testimonialsTitle")}</h2>
          <TestimonialCarousel reviews={featuredReviews} />
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-28">
        <h2 className="mb-2 text-2xl font-bold text-slate-900">{t("visitTitle")}</h2>
        <p className="mb-8 text-sm text-slate-600">{t("visitSubtitle")}</p>
        <div className="max-w-lg">
          <AgencyLocationCard />
        </div>
      </section>
    </div>
  );
}

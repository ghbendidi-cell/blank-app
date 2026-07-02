import { getTranslations, getLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { destinations } from "@/data/destinations";
import { packs } from "@/data/packs";
import { reviews } from "@/data/reviews";
import SearchBar from "@/components/SearchBar";
import DestinationCard from "@/components/DestinationCard";
import PackCard from "@/components/PackCard";
import TrustBadges from "@/components/TrustBadges";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import AgencyLocationCard from "@/components/AgencyLocationCard";
import StatsStrip from "@/components/StatsStrip";
import ParallaxImage from "@/components/animations/ParallaxImage";
import FlyingPlane from "@/components/animations/FlyingPlane";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";

export default async function HomePage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");

  const featuredDestinations = destinations.filter((d) => d.featured).slice(0, 4);
  const featuredPacks = packs.filter((p) => p.isFeatured).slice(0, 6);
  const omraPack = packs.find((p) => p.tripType === "omra" || p.tripType === "hajj");
  const featuredReviews = reviews.slice(0, 6);

  return (
    <div className="overflow-x-hidden">
      <section className="relative overflow-hidden bg-brand-dark">
        <ParallaxImage
          src="/images/chefchaouen-maroc.jpg"
          alt="Ruelle de Chefchaouen, Maroc"
          className="absolute inset-0 h-full w-full"
          strength={60}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/60 to-brand-dark/90" />
        <FlyingPlane />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-24 text-center">
          <h1 className="max-w-2xl text-3xl font-bold text-white drop-shadow-lg sm:text-5xl">{t("heroTitle")}</h1>
          <p className="max-w-xl text-white/90">{t("heroSubtitle")}</p>
          <SearchBar />
          <div className="mt-4 w-full max-w-md">
            <StatsStrip destinationsCount={destinations.length} packsCount={packs.length} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <ScrollReveal>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">{t("popularDestinations")}</h2>
            <Link href="/destinations" className="text-sm font-medium text-brand hover:underline">
              {tCommon("seeAll")}
            </Link>
          </div>
        </ScrollReveal>
        <StaggerGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredDestinations.map((destination) => (
            <StaggerItem key={destination.id}>
              <DestinationCard destination={destination} locale={locale} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <ScrollReveal>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">{t("featuredPacks")}</h2>
            <Link href="/packs" className="text-sm font-medium text-brand hover:underline">
              {tCommon("seeAllPacks")}
            </Link>
          </div>
        </ScrollReveal>
        <StaggerGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPacks.map((pack) => (
            <StaggerItem key={pack.id}>
              <PackCard pack={pack} locale={locale} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {omraPack && (
        <section className="relative overflow-hidden bg-hajj px-4 py-16 text-center">
          <ParallaxImage
            src="/images/mecque-omra.jpg"
            alt="La Mecque"
            className="absolute inset-0 h-full w-full opacity-30"
            strength={30}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-hajj/90 to-hajj-dark/95" />
          <ScrollReveal className="relative mx-auto flex max-w-7xl flex-col items-center gap-4">
            <h2 className="text-2xl font-bold text-gold">{t("omraTitle")}</h2>
            <p className="max-w-xl text-sm text-white/90">{t("omraSubtitle")}</p>
            <Link href="/omra-hajj" className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-hajj-dark transition hover:bg-gold-dark hover:text-white">
              {t("omraCta")}
            </Link>
          </ScrollReveal>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-16">
        <ScrollReveal>
          <h2 className="mb-6 text-2xl font-bold text-slate-900">{t("whyUsTitle")}</h2>
        </ScrollReveal>
        <TrustBadges />
      </section>

      {featuredReviews.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16">
          <ScrollReveal>
            <h2 className="mb-6 text-2xl font-bold text-slate-900">{t("testimonialsTitle")}</h2>
          </ScrollReveal>
          <TestimonialCarousel reviews={featuredReviews} />
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-16">
        <ScrollReveal>
          <h2 className="mb-2 text-2xl font-bold text-slate-900">{t("visitTitle")}</h2>
          <p className="mb-6 text-sm text-slate-600">{t("visitSubtitle")}</p>
          <div className="max-w-lg">
            <AgencyLocationCard />
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

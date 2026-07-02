import { getTranslations, getLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { destinations } from "@/data/destinations";
import { packs } from "@/data/packs";
import { reviews } from "@/data/reviews";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import SearchBar from "@/components/SearchBar";
import DestinationCard from "@/components/DestinationCard";
import PackCard from "@/components/PackCard";
import TrustBadges from "@/components/TrustBadges";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import AgencyLocationCard from "@/components/AgencyLocationCard";

export default async function HomePage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");

  const featuredDestinations = destinations.filter((d) => d.featured).slice(0, 4);
  const featuredPacks = packs.filter((p) => p.isFeatured).slice(0, 6);
  const omraPack = packs.find((p) => p.tripType === "omra" || p.tripType === "hajj");
  const featuredReviews = reviews.slice(0, 6);

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 opacity-30">
          <ImagePlaceholder
            image={{ url: null, altFr: "Voyage Millenium Travel", altAr: "سفر مع Millenium Travel", isPlaceholder: true, aspectRatio: "16:9" }}
            locale={locale}
            className="h-full"
          />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-20 text-center">
          <h1 className="max-w-2xl text-3xl font-bold text-white sm:text-4xl">{t("heroTitle")}</h1>
          <p className="max-w-xl text-white/90">{t("heroSubtitle")}</p>
          <SearchBar />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">{t("popularDestinations")}</h2>
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

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">{t("featuredPacks")}</h2>
          <Link href="/packs" className="text-sm font-medium text-brand hover:underline">
            {tCommon("seeAllPacks")}
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPacks.map((pack) => (
            <PackCard key={pack.id} pack={pack} locale={locale} />
          ))}
        </div>
      </section>

      {omraPack && (
        <section className="bg-brand-light px-4 py-12">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center">
            <h2 className="text-xl font-bold text-brand-dark">{t("omraTitle")}</h2>
            <p className="max-w-xl text-sm text-slate-600">{t("omraSubtitle")}</p>
            <Link href="/omra-hajj" className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white">
              {t("omraCta")}
            </Link>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-6 text-xl font-bold text-slate-900">{t("whyUsTitle")}</h2>
        <TrustBadges />
      </section>

      {featuredReviews.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="mb-6 text-xl font-bold text-slate-900">{t("testimonialsTitle")}</h2>
          <TestimonialCarousel reviews={featuredReviews} />
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-2 text-xl font-bold text-slate-900">{t("visitTitle")}</h2>
        <p className="mb-6 text-sm text-slate-600">{t("visitSubtitle")}</p>
        <div className="max-w-lg">
          <AgencyLocationCard />
        </div>
      </section>
    </div>
  );
}

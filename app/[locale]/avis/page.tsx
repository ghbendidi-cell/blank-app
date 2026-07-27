"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { destinations } from "@/data/destinations";
import { reviews } from "@/data/reviews";
import { packs } from "@/data/packs";
import { pick } from "@/lib/locale-content";
import Breadcrumb from "@/components/Breadcrumb";
import RatingSummary from "@/components/RatingSummary";
import ReviewCard from "@/components/ReviewCard";
import ReviewForm from "@/components/ReviewForm";
import AgencyLocationCard from "@/components/AgencyLocationCard";
import StickyContactBar from "@/components/StickyContactBar";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";

export default function AvisPage() {
  const locale = useLocale() as Locale;
  const t = useTranslations("avis");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");

  const [destinationFilter, setDestinationFilter] = useState("");

  const filteredReviews = useMemo(() => {
    if (!destinationFilter) return reviews;
    const packIdsForDestination = packs.filter((p) => p.destinationId === destinationFilter).map((p) => p.id);
    return reviews.filter((r) => r.packId && packIdsForDestination.includes(r.packId));
  }, [destinationFilter]);

  function packTitleFor(packId?: string) {
    if (!packId) return undefined;
    const pack = packs.find((p) => p.id === packId);
    return pack ? pick(pack.titleFr, pack.titleAr, locale) : undefined;
  }

  return (
    <div className="bg-ivory pb-24">
      <Breadcrumb items={[{ label: tCommon("seeAll"), href: "/" }, { label: tNav("avis") }]} />

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t("eyebrow")}</p>
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
          {t.rich("richTitle", { i: (chunks) => <em className="italic">{chunks}</em> })}
        </h1>
        <p className="mt-4 max-w-md font-sans text-base text-ink/60">{t("subtitle")}</p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="w-full max-w-md sm:w-auto">
            <RatingSummary reviews={filteredReviews} />
          </div>
          <label className="flex items-center gap-2 font-sans text-sm text-ink/60">
            <span>{t("filterByDestination")}</span>
            <select
              value={destinationFilter}
              onChange={(e) => setDestinationFilter(e.target.value)}
              className="border border-ink/20 bg-white px-3 py-2 font-sans text-sm text-ink outline-none focus:border-ink"
            >
              <option value="">{tCommon("seeAll")}</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {pick(d.nameFr, d.nameAr, locale)}
                </option>
              ))}
            </select>
          </label>
        </div>

        {filteredReviews.length > 0 ? (
          <StaggerGrid className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredReviews.map((review) => (
              <StaggerItem key={review.id}>
                <ReviewCard review={review} />
                {packTitleFor(review.packId) && (
                  <p className="mt-1 font-sans text-xs text-ink/40">{packTitleFor(review.packId)}</p>
                )}
              </StaggerItem>
            ))}
          </StaggerGrid>
        ) : (
          <p className="mt-10 rounded-[20px] border border-dashed border-ink/20 p-10 text-center font-sans text-sm text-ink/50">
            {locale === "ar"
              ? "لا توجد آراء بعد. كونوا أول من يشارك تجربته مع Millenium Travel."
              : "Aucun avis pour le moment. Soyez le premier à partager votre expérience avec Millenium Travel."}
          </p>
        )}

        <div className="mt-16 grid gap-8 border-t border-ink/10 pt-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-xl italic text-ink">{t("leaveReviewTitle")}</h2>
            <div className="mt-4">
              <ReviewForm />
            </div>
          </div>
          <div>
            <h2 className="font-display text-xl italic text-ink">{t("visitCta")}</h2>
            <div className="mt-4">
              <AgencyLocationCard />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 border-t border-ink/10 pt-16 text-center">
          <p className="font-display text-2xl italic text-ink">{t("ctaTitle")}</p>
          <Link
            href="/contact"
            className="rounded-full bg-accent px-8 py-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-accent-dark"
          >
            {t("cta")}
          </Link>
        </div>
      </div>

      <StickyContactBar />
    </div>
  );
}

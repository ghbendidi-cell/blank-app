"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { destinations } from "@/data/destinations";
import { reviews } from "@/data/reviews";
import { packs } from "@/data/packs";
import { pick } from "@/lib/locale-content";
import Breadcrumb from "@/components/Breadcrumb";
import RatingSummary from "@/components/RatingSummary";
import ReviewCard from "@/components/ReviewCard";
import ReviewForm from "@/components/ReviewForm";
import AgencyLocationCard from "@/components/AgencyLocationCard";

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
    <div>
      <Breadcrumb items={[{ label: tCommon("seeAll"), href: "/" }, { label: tNav("avis") }]} />

      <div className="mx-auto max-w-7xl px-4 pb-16">
        <h1 className="text-2xl font-bold text-slate-900">{t("title")}</h1>
        <p className="mt-1 text-sm text-slate-600">{t("subtitle")}</p>

        <div className="mt-6 max-w-md">
          <RatingSummary reviews={filteredReviews} />
        </div>

        <div className="mt-6 flex items-center gap-2">
          <label className="text-sm text-slate-600">{t("filterByDestination")}</label>
          <select
            value={destinationFilter}
            onChange={(e) => setDestinationFilter(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
          >
            <option value="">{tCommon("seeAll")}</option>
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>
                {pick(d.nameFr, d.nameAr, locale)}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredReviews.map((review) => (
            <div key={review.id}>
              <ReviewCard review={review} />
              {packTitleFor(review.packId) && (
                <p className="mt-1 text-xs text-slate-400">{packTitleFor(review.packId)}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">{t("leaveReviewTitle")}</h2>
            <ReviewForm />
          </div>
          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">{t("visitCta")}</h2>
            <AgencyLocationCard />
          </div>
        </div>
      </div>
    </div>
  );
}

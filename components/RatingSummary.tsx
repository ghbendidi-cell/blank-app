import { useTranslations } from "next-intl";
import Stars from "./Stars";
import { getRatingSummary } from "@/data/reviews";
import type { Review } from "@/lib/types";

export default function RatingSummary({ reviews }: { reviews: Review[] }) {
  const t = useTranslations("avis");
  const { count, avg, distribution } = getRatingSummary(reviews);

  return (
    <div className="rounded-xl border border-slate-200 p-6">
      <div className="flex items-center gap-4">
        <div>
          <p className="text-4xl font-bold text-brand">{avg || "—"}</p>
          <Stars rating={avg} size={18} />
          <p className="mt-1 text-sm text-slate-500">
            {t("basedOn", { count })}
          </p>
        </div>
        <div className="flex-1 space-y-1">
          {distribution.map(({ stars, count: starCount }) => (
            <div key={stars} className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-3">{stars}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full bg-accent"
                  style={{ width: count ? `${(starCount / count) * 100}%` : "0%" }}
                />
              </div>
              <span className="w-6 text-end">{starCount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useTranslations } from "next-intl";
import Stars from "./Stars";
import { getRatingSummary } from "@/data/reviews";
import type { Review } from "@/lib/types";

export default function RatingSummary({ reviews }: { reviews: Review[] }) {
  const t = useTranslations("avis");
  const { count, avg, distribution } = getRatingSummary(reviews);

  return (
    <div className="rounded-[20px] border border-ink/10 bg-white p-6">
      <div className="flex items-center gap-4">
        <div>
          <p className="font-display text-4xl italic text-accent">{avg || "—"}</p>
          <Stars rating={avg} size={18} />
          <p className="mt-1 font-sans text-sm text-ink/50">
            {t("basedOn", { count })}
          </p>
        </div>
        <div className="flex-1 space-y-1">
          {distribution.map(({ stars, count: starCount }) => (
            <div key={stars} className="flex items-center gap-2 font-sans text-xs text-ink/50">
              <span className="w-3">{stars}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ivory-dark">
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

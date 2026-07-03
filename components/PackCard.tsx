import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Pack } from "@/lib/types";
import { pick } from "@/lib/locale-content";
import { destinations } from "@/data/destinations";
import { destinationTheme } from "@/lib/theme";
import ImagePlaceholder from "./ImagePlaceholder";
import PriceBadge from "./PriceBadge";
import Stars from "./Stars";
import TiltCard from "./animations/TiltCard";

export interface PackCompareControl {
  selected: boolean;
  disabled?: boolean;
  onToggle: () => void;
}

export default function PackCard({
  pack,
  locale,
  compare,
}: {
  pack: Pack;
  locale: Locale;
  compare?: PackCompareControl;
}) {
  const t = useTranslations("common");
  const tPacks = useTranslations("packs");
  const tTypes = useTranslations("packs.types");
  const title = pick(pack.titleFr, pack.titleAr, locale);
  const destination = destinations.find((d) => d.id === pack.destinationId);
  const theme = destinationTheme[destination?.accentColor ?? "egypt"];

  return (
    <TiltCard>
      <Link
        href={`/packs/${pack.slug}`}
        className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-xl"
      >
        <div className="relative overflow-hidden">
          <div className="transition-transform duration-500 group-hover:scale-110">
            <ImagePlaceholder image={pack.images[0]} locale={locale} />
          </div>
          <span className={`absolute start-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${theme.badge}`}>
            {tTypes(pack.tripType)}
          </span>
          {compare && (
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                compare.onToggle();
              }}
              disabled={compare.disabled && !compare.selected}
              className={`absolute end-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm transition ${
                compare.selected
                  ? "bg-brand text-white"
                  : "bg-white/90 text-slate-600 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              }`}
            >
              <span
                className={`flex h-3.5 w-3.5 items-center justify-center rounded border ${
                  compare.selected ? "border-white bg-white/20" : "border-slate-400"
                }`}
              >
                {compare.selected && (
                  <svg width="10" height="10" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M4 10l4 4 8-8" />
                  </svg>
                )}
              </span>
              {tPacks("compare")}
            </button>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="font-semibold text-slate-900 group-hover:text-brand">{title}</h3>
          {pack.durationDays > 0 && (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>{t("days", { count: pack.durationDays })}</span>
              <span aria-hidden>·</span>
              <span>{t("nights", { count: pack.durationNights })}</span>
            </div>
          )}
          {pack.ratingCount > 0 && (
            <div className="flex items-center gap-1.5">
              <Stars rating={pack.ratingAvg} size={14} />
              <span className="text-xs text-slate-500">
                {pack.ratingAvg} ({t("reviews", { count: pack.ratingCount })})
              </span>
            </div>
          )}
          <div className="mt-auto pt-2">
            <PriceBadge amount={pack.priceFrom} locale={locale} />
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}

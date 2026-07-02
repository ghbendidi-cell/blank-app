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

export default function PackCard({ pack, locale }: { pack: Pack; locale: Locale }) {
  const t = useTranslations("common");
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

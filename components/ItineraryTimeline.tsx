import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { ItineraryDay } from "@/lib/types";
import { pick } from "@/lib/locale-content";

export default function ItineraryTimeline({ days }: { days: ItineraryDay[] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("packDetail");

  return (
    <ol className="space-y-6 border-s-2 border-slate-200 ps-5">
      {days.map((day) => (
        <li key={day.dayNumber} className="relative">
          <span className="absolute -start-[27px] flex h-4 w-4 items-center justify-center rounded-full bg-brand" />
          <p className="text-xs font-semibold uppercase tracking-wide text-brand">
            {t("day", { number: day.dayNumber })}
          </p>
          <p className="mt-0.5 font-semibold text-slate-900">{pick(day.titleFr, day.titleAr, locale)}</p>
          <p className="mt-1 text-sm text-slate-600">{pick(day.descriptionFr, day.descriptionAr, locale)}</p>
        </li>
      ))}
    </ol>
  );
}

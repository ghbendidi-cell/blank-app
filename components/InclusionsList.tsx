import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/locale-content";

export default function InclusionsList({
  inclusionsFr,
  inclusionsAr,
  exclusionsFr,
  exclusionsAr,
}: {
  inclusionsFr: string[];
  inclusionsAr: string[];
  exclusionsFr: string[];
  exclusionsAr: string[];
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("packDetail");

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <p className="mb-2 font-semibold text-slate-900">{t("inclusions")}</p>
        <ul className="space-y-1.5 text-sm text-slate-600">
          {inclusionsFr.map((_, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-0.5 text-green-600">✓</span>
              <span>{pick(inclusionsFr[index], inclusionsAr[index], locale)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="mb-2 font-semibold text-slate-900">{t("exclusions")}</p>
        <ul className="space-y-1.5 text-sm text-slate-600">
          {exclusionsFr.map((_, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-0.5 text-red-500">✕</span>
              <span>{pick(exclusionsFr[index], exclusionsAr[index], locale)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

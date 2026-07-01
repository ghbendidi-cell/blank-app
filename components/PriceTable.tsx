import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { PriceVariant } from "@/lib/types";
import { pick, formatMad } from "@/lib/locale-content";

export default function PriceTable({ variants }: { variants: PriceVariant[] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("packDetail");

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <p className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-900">
        {t("priceVariants")}
      </p>
      <ul className="divide-y divide-slate-100">
        {variants.map((variant, index) => (
          <li key={index} className="flex items-center justify-between px-4 py-3 text-sm">
            <span className="text-slate-600">{pick(variant.labelFr, variant.labelAr, locale)}</span>
            <span className="font-semibold text-brand">{formatMad(variant.price, locale)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

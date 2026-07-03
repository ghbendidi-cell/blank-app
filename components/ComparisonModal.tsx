"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { Pack } from "@/lib/types";
import { Link } from "@/i18n/navigation";
import { pick, formatMad } from "@/lib/locale-content";
import ImagePlaceholder from "./ImagePlaceholder";
import Stars from "./Stars";

export default function ComparisonModal({ packs, onClose }: { packs: Pack[]; onClose: () => void }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("packs");
  const tCommon = useTranslations("common");
  const tDetail = useTranslations("packDetail");
  const tTypes = useTranslations("packs.types");
  const tNav = useTranslations("nav");

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-t-2xl bg-white sm:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">{t("compareBarTitle")}</h2>
          <button type="button" onClick={onClose} aria-label="Fermer" className="text-2xl leading-none text-slate-400 hover:text-slate-700">
            ×
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <tbody>
              <tr>
                <td className="w-32 shrink-0 p-3 text-xs font-medium text-slate-400" />
                {packs.map((pack) => (
                  <td key={pack.id} className="p-3 align-top">
                    <div className="w-40 overflow-hidden rounded-xl">
                      <ImagePlaceholder image={pack.images[0]} locale={locale} className="aspect-[4/3]" />
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-slate-100">
                <td className="p-3 text-xs font-medium text-slate-400">{locale === "ar" ? "الاسم" : "Nom"}</td>
                {packs.map((pack) => (
                  <td key={pack.id} className="p-3 align-top font-semibold text-slate-900">
                    {pick(pack.titleFr, pack.titleAr, locale)}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-slate-100 bg-slate-50">
                <td className="p-3 text-xs font-medium text-slate-400">{t("filters.type")}</td>
                {packs.map((pack) => (
                  <td key={pack.id} className="p-3">
                    {tTypes(pack.tripType)}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-slate-100">
                <td className="p-3 text-xs font-medium text-slate-400">{t("filters.duration")}</td>
                {packs.map((pack) => (
                  <td key={pack.id} className="p-3">
                    {pack.durationDays > 0
                      ? `${tCommon("days", { count: pack.durationDays })} · ${tCommon("nights", { count: pack.durationNights })}`
                      : "—"}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-slate-100 bg-slate-50">
                <td className="p-3 text-xs font-medium text-slate-400">{tDetail("priceVariants")}</td>
                {packs.map((pack) => (
                  <td key={pack.id} className="p-3 font-bold text-brand">
                    {formatMad(pack.priceFrom, locale)}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-slate-100">
                <td className="p-3 text-xs font-medium text-slate-400">{tNav("avis")}</td>
                {packs.map((pack) => (
                  <td key={pack.id} className="p-3">
                    {pack.ratingCount > 0 ? <Stars rating={pack.ratingAvg} size={13} /> : "—"}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-slate-100 bg-slate-50">
                <td className="p-3 align-top text-xs font-medium text-slate-400">{tDetail("inclusions")}</td>
                {packs.map((pack) => (
                  <td key={pack.id} className="p-3 align-top">
                    <ul className="space-y-1">
                      {pack.inclusionsFr.slice(0, 4).map((_, index) => (
                        <li key={index} className="flex gap-1.5 text-xs text-slate-600">
                          <span className="text-green-600">✓</span>
                          {pick(pack.inclusionsFr[index], pack.inclusionsAr[index], locale)}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-slate-100">
                <td className="p-3" />
                {packs.map((pack) => (
                  <td key={pack.id} className="p-3">
                    <Link
                      href={`/packs/${pack.slug}`}
                      className="block rounded-lg bg-brand px-3 py-2 text-center text-xs font-semibold text-white hover:bg-brand-dark"
                    >
                      {tCommon("requestQuote")}
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

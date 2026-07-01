"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Destination, TripType } from "@/lib/types";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/locale-content";

export interface PackFiltersState {
  destination: string;
  budgetMax: string;
  duration: string;
  type: string;
}

const TRIP_TYPES: TripType[] = ["maroc", "international", "omra", "hajj", "groupe", "sur-mesure"];

export default function FilterPanel({
  destinations,
  filters,
  onChange,
  onReset,
}: {
  destinations: Destination[];
  filters: PackFiltersState;
  onChange: (next: Partial<PackFiltersState>) => void;
  onReset: () => void;
}) {
  const t = useTranslations("packs.filters");
  const tTypes = useTranslations("packs.types");
  const locale = useLocale() as Locale;

  return (
    <div className="space-y-5 rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-slate-900">{t("title")}</p>
        <button type="button" onClick={onReset} className="text-xs text-brand hover:underline">
          {t("reset")}
        </button>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">{t("destination")}</span>
        <select
          value={filters.destination}
          onChange={(e) => onChange({ destination: e.target.value })}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">{t("allDestinations")}</option>
          {destinations.map((d) => (
            <option key={d.id} value={d.id}>
              {pick(d.nameFr, d.nameAr, locale)}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">
          {t("budget")}: {filters.budgetMax ? `≤ ${filters.budgetMax}` : "—"}
        </span>
        <input
          type="range"
          min={1000}
          max={25000}
          step={500}
          value={filters.budgetMax || 25000}
          onChange={(e) => onChange({ budgetMax: e.target.value })}
          className="w-full accent-brand"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">{t("duration")}</span>
        <select
          value={filters.duration}
          onChange={(e) => onChange({ duration: e.target.value })}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">{t("allDurations")}</option>
          <option value="1-3">1-3</option>
          <option value="4-6">4-6</option>
          <option value="7-10">7-10</option>
          <option value="11+">11+</option>
        </select>
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">{t("type")}</span>
        <select
          value={filters.type}
          onChange={(e) => onChange({ type: e.target.value })}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">{t("allTypes")}</option>
          {TRIP_TYPES.map((type) => (
            <option key={type} value={type}>
              {tTypes(type)}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

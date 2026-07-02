"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { useRouter } from "@/i18n/navigation";
import { destinations } from "@/data/destinations";
import { packs } from "@/data/packs";
import { pick } from "@/lib/locale-content";
import PackCard from "@/components/PackCard";
import FilterPanel, { type PackFiltersState } from "@/components/FilterPanel";
import Breadcrumb from "@/components/Breadcrumb";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";

function matchesDuration(days: number, range: string) {
  if (!range) return true;
  if (range === "11+") return days >= 11;
  const [min, max] = range.split("-").map(Number);
  return days >= min && days <= max;
}

export default function PacksPage() {
  return (
    <Suspense fallback={null}>
      <PacksPageContent />
    </Suspense>
  );
}

function PacksPageContent() {
  const locale = useLocale() as Locale;
  const t = useTranslations("packs");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState<PackFiltersState>({
    destination: searchParams.get("destination") ?? "",
    budgetMax: searchParams.get("budget_max") ?? "",
    duration: searchParams.get("duration") ?? "",
    type: searchParams.get("type") ?? "",
  });
  const [sort, setSort] = useState(searchParams.get("sort") ?? "popularity");
  const query = searchParams.get("q") ?? "";

  const filteredPacks = useMemo(() => {
    let result = packs.filter((pack) => {
      if (filters.destination && pack.destinationId !== filters.destination) return false;
      if (filters.budgetMax && pack.priceFrom > Number(filters.budgetMax)) return false;
      if (filters.duration && !matchesDuration(pack.durationDays, filters.duration)) return false;
      if (filters.type && pack.tripType !== filters.type) return false;
      if (query) {
        const title = pick(pack.titleFr, pack.titleAr, locale).toLowerCase();
        if (!title.includes(query.toLowerCase())) return false;
      }
      return true;
    });

    if (sort === "priceAsc") result = [...result].sort((a, b) => a.priceFrom - b.priceFrom);
    if (sort === "priceDesc") result = [...result].sort((a, b) => b.priceFrom - a.priceFrom);
    if (sort === "popularity") result = [...result].sort((a, b) => b.ratingCount - a.ratingCount);

    return result;
  }, [filters, sort, query, locale]);

  function handleFilterChange(next: Partial<PackFiltersState>) {
    setFilters((prev) => ({ ...prev, ...next }));
  }

  function handleReset() {
    setFilters({ destination: "", budgetMax: "", duration: "", type: "" });
    router.replace({ pathname: "/packs" });
  }

  return (
    <div>
      <Breadcrumb items={[{ label: tCommon("seeAll"), href: "/" }, { label: tNav("packs") }]} />

      <div className="mx-auto max-w-7xl px-4 pb-16">
        <h1 className="text-2xl font-bold text-slate-900">{t("title")}</h1>
        <p className="mt-1 text-sm text-slate-600">{t("subtitle")}</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside>
            <FilterPanel
              destinations={destinations}
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleReset}
            />
          </aside>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-500">{t("resultsCount", { count: filteredPacks.length })}</p>
              <label className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">{t("sort.label")}</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
                >
                  <option value="popularity">{t("sort.popularity")}</option>
                  <option value="priceAsc">{t("sort.priceAsc")}</option>
                  <option value="priceDesc">{t("sort.priceDesc")}</option>
                </select>
              </label>
            </div>

            {filteredPacks.length === 0 ? (
              <p className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">
                {tCommon("noResults")}
              </p>
            ) : (
              <StaggerGrid className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredPacks.map((pack) => (
                  <StaggerItem key={pack.id}>
                    <PackCard pack={pack} locale={locale} />
                  </StaggerItem>
                ))}
              </StaggerGrid>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

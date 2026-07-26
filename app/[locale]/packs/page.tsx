"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { packs } from "@/data/packs";
import PackCard from "@/components/PackCard";
import Breadcrumb from "@/components/Breadcrumb";
import StickyContactBar from "@/components/StickyContactBar";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";

type QuickFilter = "all" | "maroc" | "international" | "omraHajj";

function matchesFilter(tripType: string, filter: QuickFilter) {
  if (filter === "all") return true;
  if (filter === "omraHajj") return tripType === "omra" || tripType === "hajj";
  return tripType === filter;
}

export default function PacksPage() {
  const locale = useLocale() as Locale;
  const t = useTranslations("packs");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");

  const [filter, setFilter] = useState<QuickFilter>("all");

  const filteredPacks = useMemo(() => packs.filter((pack) => matchesFilter(pack.tripType, filter)), [filter]);

  const filters: QuickFilter[] = ["all", "maroc", "international", "omraHajj"];

  return (
    <div className="bg-ivory pb-24">
      <Breadcrumb items={[{ label: tCommon("seeAll"), href: "/" }, { label: tNav("packs") }]} />

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t("eyebrow")}</p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl text-ink sm:text-5xl">
          {t.rich("richTitle", { i: (chunks) => <em className="italic">{chunks}</em> })}
        </h1>
        <p className="mt-4 max-w-md font-sans text-base text-ink/60">{t("subtitle")}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full border px-5 py-2 font-sans text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                filter === f
                  ? "border-accent bg-accent text-ivory"
                  : "border-ink/15 bg-transparent text-ink/70 hover:border-ink/40"
              }`}
            >
              {t(`quickFilter.${f}`)}
            </button>
          ))}
        </div>

        {filteredPacks.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-ink/20 p-10 text-center font-sans text-sm text-ink/50">
            {tCommon("noResults")}
          </p>
        ) : (
          <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPacks.map((pack, index) => (
              <StaggerItem key={pack.id} className={index === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}>
                <PackCard pack={pack} locale={locale} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}
      </div>

      <section className="border-t border-ink/10 bg-ivory-dark">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-10">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
            <Image
              src="/images/istanbul-bosphore.jpg"
              alt="Conseiller Millenium Travel préparant un voyage"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="rounded-[20px] bg-ivory p-8 lg:p-10">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t("whyUsEyebrow")}</p>
            <h2 className="mt-3 font-display text-2xl italic text-ink sm:text-3xl">{t("whyUsTitle")}</h2>
            <WhyUsList />
          </div>
        </div>
      </section>

      <StickyContactBar />
    </div>
  );
}

function WhyUsList() {
  const tHome = useTranslations("home");
  const items = [
    { title: tHome("whyUs1Title"), text: tHome("whyUs1Text") },
    { title: tHome("whyUs2Title"), text: tHome("whyUs2Text") },
    { title: tHome("whyUs3Title"), text: tHome("whyUs3Text") },
  ];

  return (
    <ul className="mt-6 space-y-5">
      {items.map((item) => (
        <li key={item.title} className="border-t border-ink/10 pt-4">
          <p className="font-display text-base italic text-ink">{item.title}</p>
          <p className="mt-1 font-sans text-sm text-ink/60">{item.text}</p>
        </li>
      ))}
    </ul>
  );
}

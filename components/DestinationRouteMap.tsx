"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { destinations } from "@/data/destinations";
import { getPacksByDestination } from "@/data/packs";
import { pick, formatMad } from "@/lib/locale-content";
import { destinationTheme } from "@/lib/theme";
import ImagePlaceholder from "./ImagePlaceholder";
import Stars from "./Stars";

const MAP_VIEWBOX = { width: 1010, height: 666 };

const ORIGIN = { x: 447, y: 340 };

const PIN_COORDS: Record<string, { x: number; y: number }> = {
  egypte: { x: 600, y: 365 },
  "arabie-saoudite": { x: 635, y: 390 },
  turquie: { x: 592, y: 313 },
  vietnam: { x: 795, y: 400 },
};

function toPercent(x: number, y: number) {
  return { left: `${(x / MAP_VIEWBOX.width) * 100}%`, top: `${(y / MAP_VIEWBOX.height) * 100}%` };
}

function routePath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const midX = (from.x + to.x) / 2;
  const midY = Math.min(from.y, to.y) - 55;
  return `M${from.x},${from.y} Q${midX},${midY} ${to.x},${to.y}`;
}

export default function DestinationRouteMap() {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");
  const tDest = useTranslations("destinations");
  const tTypes = useTranslations("packs.types");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const activeDestination = destinations.find((d) => d.slug === activeSlug) ?? null;
  const activePacks = activeDestination ? getPacksByDestination(activeDestination.id) : [];

  return (
    <div>
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-3xl border border-brand/10 bg-[#eaf1ee] shadow-sm">
        <div className="relative aspect-[1010/666] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/map/world.svg" alt="" className="absolute inset-0 h-full w-full object-contain" aria-hidden />

          <svg viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`} className="absolute inset-0 h-full w-full">
            <defs>
              <marker id="rm-plane" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" />
            </defs>
            {Object.entries(PIN_COORDS).map(([slug, coords]) => {
              const path = routePath(ORIGIN, coords);
              return (
                <g key={slug}>
                  <path
                    d={path}
                    fill="none"
                    stroke="#76575D"
                    strokeOpacity={0.4}
                    strokeWidth={1.6}
                    strokeDasharray="1.5 8"
                    strokeLinecap="round"
                  />
                  <path id={`rm-path-${slug}`} d={path} fill="none" stroke="none" />
                  <path d="M-6 -3 L6 0 L-6 3 L-2 0 Z" fill="#F69F83">
                    <animateMotion dur="6s" begin={`${Object.keys(PIN_COORDS).indexOf(slug) * 1.4}s`} repeatCount="indefinite" rotate="auto">
                      <mpath href={`#rm-path-${slug}`} />
                    </animateMotion>
                  </path>
                </g>
              );
            })}
            <circle cx={ORIGIN.x} cy={ORIGIN.y} r={5} fill="#4e6d68" />
            <circle cx={ORIGIN.x} cy={ORIGIN.y} r={10} fill="none" stroke="#4e6d68" strokeOpacity={0.4} strokeWidth={1.5} />
          </svg>

          <div
            className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center pb-2"
            style={toPercent(ORIGIN.x, ORIGIN.y)}
          >
            <span className="whitespace-nowrap rounded-full bg-brand-dark px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
              Casablanca
            </span>
          </div>

          {Object.entries(PIN_COORDS).map(([slug, coords]) => {
            const destination = destinations.find((d) => d.slug === slug);
            if (!destination) return null;
            const isActive = activeSlug === slug;
            return (
              <button
                key={slug}
                type="button"
                onClick={() => setActiveSlug(isActive ? null : slug)}
                className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                style={toPercent(coords.x, coords.y)}
                aria-pressed={isActive}
              >
                <span className="relative flex h-4 w-4 items-center justify-center">
                  {isActive && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />}
                  <span
                    className={`relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white shadow-md transition ${
                      isActive ? "bg-accent scale-125" : "bg-brand hover:scale-110"
                    }`}
                  />
                </span>
                <span
                  className={`absolute start-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold shadow-sm transition ${
                    isActive ? "flex bg-accent text-white" : "hidden sm:flex sm:bg-white sm:text-brand-dark"
                  }`}
                >
                  {pick(destination.nameFr, destination.nameAr, locale)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-1 max-w-7xl text-end">
        <a
          href="https://github.com/VictorCazanave/svg-maps"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-slate-400 hover:text-slate-500"
        >
          Fond de carte : svg-maps.com (CC BY 4.0)
        </a>
      </div>

      <AnimatePresence>
        {activeDestination && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-6 max-w-7xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {tDest("packsIn", { destination: pick(activeDestination.nameFr, activeDestination.nameAr, locale) })}
              </h3>
              <button
                type="button"
                onClick={() => setActiveSlug(null)}
                aria-label="Fermer"
                className="text-2xl leading-none text-slate-400 hover:text-slate-700"
              >
                ×
              </button>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {activePacks.map((pack) => {
                const theme = destinationTheme[activeDestination.accentColor];
                return (
                  <Link
                    key={pack.id}
                    href={`/packs/${pack.slug}`}
                    className="group flex gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md"
                  >
                    <div className="w-28 shrink-0 overflow-hidden rounded-xl">
                      <ImagePlaceholder image={pack.images[0]} locale={locale} className="aspect-square" />
                    </div>
                    <div className="flex flex-1 flex-col gap-1 py-0.5">
                      <span className={`w-fit rounded-full px-2 py-0.5 text-[11px] font-semibold ${theme.badge}`}>
                        {tTypes(pack.tripType)}
                      </span>
                      <h4 className="font-semibold text-slate-900 group-hover:text-brand">
                        {pick(pack.titleFr, pack.titleAr, locale)}
                      </h4>
                      {pack.ratingCount > 0 && <Stars rating={pack.ratingAvg} size={13} />}
                      <div className="mt-auto text-sm font-bold text-brand">
                        <span className="me-1 text-xs font-normal text-slate-500">{t("from")}</span>
                        {formatMad(pack.priceFrom, locale)}
                      </div>
                    </div>
                  </Link>
                );
              })}
              {activePacks.length === 0 && (
                <p className="col-span-2 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                  {t("noResults")}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

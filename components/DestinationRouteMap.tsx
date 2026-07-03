"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { destinations } from "@/data/destinations";
import { pick } from "@/lib/locale-content";

interface RouteNode {
  slug: string;
  x: number;
  y: number;
  path: string;
}

const ORIGIN = { x: 110, y: 260 };

const ROUTES: RouteNode[] = [
  { slug: "egypte", x: 400, y: 70, path: "M110,260 Q260,100 400,70" },
  { slug: "arabie-saoudite", x: 700, y: 70, path: "M110,260 Q380,20 700,70" },
  { slug: "vietnam", x: 900, y: 280, path: "M110,260 Q500,120 900,280" },
  { slug: "turquie", x: 400, y: 460, path: "M110,260 Q260,420 400,460" },
];

export default function DestinationRouteMap() {
  const locale = useLocale() as Locale;
  const tNav = useTranslations("nav");

  return (
    <div className="relative mx-auto aspect-[1000/520] w-full max-w-4xl">
      <svg viewBox="0 0 1000 520" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <marker id="plane-marker" markerWidth="14" markerHeight="14" refX="7" refY="7" orient="auto">
            <path d="M2 7 L12 4 L2 10 L5 7 Z" fill="#F69F83" />
          </marker>
        </defs>

        {ROUTES.map((r) => (
          <path
            key={r.slug}
            d={r.path}
            fill="none"
            stroke="#76575D"
            strokeOpacity={0.35}
            strokeWidth={2}
            strokeDasharray="2 10"
            strokeLinecap="round"
          />
        ))}

        {ROUTES.map((r, index) => (
          <g key={`plane-${r.slug}`}>
            <path id={`route-${r.slug}`} d={r.path} fill="none" stroke="none" />
            <path d="M-8 -4 L8 0 L-8 4 L-3 0 Z" fill="#F69F83">
              <animateMotion dur="7s" begin={`${index * 1.6}s`} repeatCount="indefinite" rotate="auto">
                <mpath href={`#route-${r.slug}`} />
              </animateMotion>
            </path>
          </g>
        ))}

        <circle cx={ORIGIN.x} cy={ORIGIN.y} r={8} fill="#F69F83" />
        <circle cx={ORIGIN.x} cy={ORIGIN.y} r={14} fill="none" stroke="#F69F83" strokeOpacity={0.4} strokeWidth={2} />
        {ROUTES.map((r) => (
          <circle key={`dot-${r.slug}`} cx={r.x} cy={r.y} r={6} fill="#4e6d68" />
        ))}
      </svg>

      <div
        className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center gap-1"
        style={{ left: `${(ORIGIN.x / 1000) * 100}%`, top: `${(ORIGIN.y / 520) * 100}%` }}
      >
        <span className="whitespace-nowrap rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white shadow-sm">
          Casablanca
        </span>
      </div>

      {ROUTES.map((r) => {
        const destination = destinations.find((d) => d.slug === r.slug);
        if (!destination) return null;
        const isTop = r.y < 260;
        return (
          <Link
            key={r.slug}
            href={`/destinations/${r.slug}`}
            className={`group absolute -translate-x-1/2 flex flex-col items-center gap-1.5 ${isTop ? "-translate-y-full pb-3" : "pt-3"}`}
            style={{ left: `${(r.x / 1000) * 100}%`, top: `${(r.y / 520) * 100}%` }}
          >
            <span className="whitespace-nowrap rounded-full border border-brand/30 bg-white px-3 py-1.5 text-xs font-semibold text-brand-dark shadow-sm transition group-hover:border-brand group-hover:bg-brand group-hover:text-white sm:text-sm">
              {pick(destination.nameFr, destination.nameAr, locale)}
            </span>
          </Link>
        );
      })}

      <span className="sr-only">{tNav("destinations")}</span>
    </div>
  );
}

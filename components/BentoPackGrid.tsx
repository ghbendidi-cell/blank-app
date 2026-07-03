"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Pack } from "@/lib/types";
import { pick } from "@/lib/locale-content";
import { destinations } from "@/data/destinations";
import { destinationTheme } from "@/lib/theme";
import { formatMad } from "@/lib/locale-content";
import Stars from "./Stars";
import TiltCard from "./animations/TiltCard";

function BentoCard({ pack, locale, className = "" }: { pack: Pack; locale: Locale; className?: string }) {
  const t = useTranslations("common");
  const tTypes = useTranslations("packs.types");
  const title = pick(pack.titleFr, pack.titleAr, locale);
  const destination = destinations.find((d) => d.id === pack.destinationId);
  const theme = destinationTheme[destination?.accentColor ?? "egypt"];
  const image = pack.images[1] ?? pack.images[0];
  const alt = pick(image.altFr, image.altAr, locale);

  return (
    <TiltCard className={className}>
      <Link
        href={`/packs/${pack.slug}`}
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl shadow-sm transition duration-300 hover:shadow-xl"
      >
        <div className="absolute inset-0">
          {image.url ? (
            <Image
              src={image.url}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center border-2 border-dashed border-slate-300 bg-slate-100 text-xs text-slate-400">
              {alt}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        </div>
        <span className={`relative m-3 w-fit rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${theme.badge}`}>
          {tTypes(pack.tripType)}
        </span>
        <div className="relative mt-auto flex flex-col gap-1.5 p-4 text-white">
          <h3 className="font-semibold drop-shadow-sm">{title}</h3>
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/85">
            {pack.durationDays > 0 && (
              <span>
                {t("days", { count: pack.durationDays })} · {t("nights", { count: pack.durationNights })}
              </span>
            )}
            {pack.ratingCount > 0 && (
              <span className="flex items-center gap-1">
                <Stars rating={pack.ratingAvg} size={12} />
                {pack.ratingAvg}
              </span>
            )}
          </div>
          <span className="text-lg font-bold text-white drop-shadow-sm">
            <span className="me-1 text-xs font-normal text-white/75">{t("from")}</span>
            {formatMad(pack.priceFrom, locale)}
          </span>
        </div>
      </Link>
    </TiltCard>
  );
}

export default function BentoPackGrid({ packs, locale }: { packs: Pack[]; locale: Locale }) {
  const [first, second, third, fourth] = packs;

  return (
    <div
      className="grid grid-cols-1 gap-5 md:grid-cols-4 md:[grid-auto-rows:220px]"
    >
      {first && <BentoCard pack={first} locale={locale} className="md:col-span-2 md:row-span-2" />}
      {second && <BentoCard pack={second} locale={locale} className="md:col-span-2 md:row-span-1" />}
      {third && <BentoCard pack={third} locale={locale} className="md:col-span-2 md:row-span-1" />}
      {fourth && <BentoCard pack={fourth} locale={locale} className="md:col-span-4 md:row-span-1" />}
    </div>
  );
}

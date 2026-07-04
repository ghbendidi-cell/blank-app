import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { agency } from "@/data/agency";
import { pick, telLink, whatsappLink } from "@/lib/locale-content";
import TiltCard from "./animations/TiltCard";

export default function AgencyLocationCard() {
  const locale = useLocale() as Locale;
  const t = useTranslations("contact");
  const address = pick(agency.addressFr, agency.addressAr, locale);
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${agency.name} ${agency.addressFr}`)}`;

  return (
    <TiltCard>
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
      <div className="flex aspect-video w-full items-center justify-center border-b border-slate-200 bg-slate-100 text-slate-400">
        <span className="text-sm">Google Maps — {agency.neighborhood}, {agency.city}</span>
      </div>
      <div className="space-y-4 p-5">
        <div>
          <p className="text-sm font-semibold text-slate-900">{t("address")}</p>
          <p className="text-sm text-slate-600">{address}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{t("hours")}</p>
          <ul className="mt-1 space-y-0.5 text-sm text-slate-600">
            {agency.openingHours.map((oh) => (
              <li key={oh.dayFr} className="flex justify-between gap-4">
                <span>{pick(oh.dayFr, oh.dayAr, locale)}</span>
                <span>{oh.hours}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          <a href={telLink(agency.phone)} className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">
            {agency.phone}
          </a>
          <a
            href={whatsappLink(agency.whatsapp, "")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white"
          >
            WhatsApp
          </a>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand"
          >
            {t("directions")}
          </a>
        </div>
      </div>
    </div>
    </TiltCard>
  );
}

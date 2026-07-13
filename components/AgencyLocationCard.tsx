import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { agency } from "@/data/agency";
import { pick, telLink, whatsappLink } from "@/lib/locale-content";

export default function AgencyLocationCard() {
  const locale = useLocale() as Locale;
  const t = useTranslations("contact");
  const address = pick(agency.addressFr, agency.addressAr, locale);
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${agency.name} ${agency.addressFr}`)}`;

  return (
    <div className="overflow-hidden border border-ink/15 bg-white">
      <div className="flex aspect-video w-full items-center justify-center border-b border-ink/15 bg-ivory-dark text-ink/40">
        <span className="font-sans text-sm">Google Maps — {agency.neighborhood}, {agency.city}</span>
      </div>
      <div className="space-y-4 p-6">
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-ink/50">{t("address")}</p>
          <p className="mt-1 font-sans text-sm text-ink/80">{address}</p>
        </div>
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-ink/50">{t("hours")}</p>
          <ul className="mt-1 space-y-0.5 font-sans text-sm text-ink/80">
            {agency.openingHours.map((oh) => (
              <li key={oh.dayFr} className="flex justify-between gap-4">
                <span>{pick(oh.dayFr, oh.dayAr, locale)}</span>
                <span>{oh.hours}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <a href={telLink(agency.phone)} className="border border-ink px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-ink hover:text-ivory">
            {agency.phone}
          </a>
          <a
            href={whatsappLink(agency.whatsapp, "")}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#25D366] px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.1em] text-[#128C7E] transition-colors hover:bg-[#25D366] hover:text-white"
          >
            WhatsApp
          </a>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-ink/30 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.1em] text-ink/70 transition-colors hover:border-ink hover:text-ink"
          >
            {t("directions")}
          </a>
        </div>
      </div>
    </div>
  );
}

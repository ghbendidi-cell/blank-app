"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { agency } from "@/data/agency";
import { telLink, whatsappLink } from "@/lib/locale-content";

export default function StickyContactBar() {
  const t = useTranslations("contactBar");
  const locale = useLocale() as Locale;

  const waMessage =
    locale === "ar"
      ? "مرحبا، أرغب في الحصول على معلومات حول عروض السفر."
      : "Bonjour, je souhaite avoir des informations sur vos voyages.";

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-center justify-between gap-3 border-t border-ink/10 bg-ivory-dark/95 px-4 backdrop-blur-sm sm:px-6 lg:px-10">
      <div className="min-w-0">
        <p className="hidden font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/55 sm:block">
          {t("label")}
        </p>
        <a
          href={telLink(agency.phone)}
          className="font-display text-sm italic text-ink transition-colors hover:text-accent sm:text-base"
        >
          {agency.phone}
        </a>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Link
          href="/contact"
          className="whitespace-nowrap rounded-full bg-accent px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-ivory transition-colors hover:bg-accent-dark sm:px-5 sm:py-2.5"
        >
          {t("cta")}
        </Link>
        <a
          href={whatsappLink(agency.whatsapp, waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap rounded-full bg-salmon px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-salmon-dark sm:px-5 sm:py-2.5"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}

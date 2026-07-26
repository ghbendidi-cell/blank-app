"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { usePathname } from "@/i18n/navigation";
import { agency } from "@/data/agency";
import { whatsappLink } from "@/lib/locale-content";
import { getAgencyOpenStatus, type AgencyOpenStatus } from "@/lib/agency-status";

const PAGES_WITH_CONTACT_BAR = ["/packs", "/omra-hajj", "/voyages-groupes", "/avis"];

export default function WhatsAppButton({ message }: { message?: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations("nav");
  const tw = useTranslations("whatsapp");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<AgencyOpenStatus | null>(null);
  const liftedForContactBar = PAGES_WITH_CONTACT_BAR.includes(pathname);

  useEffect(() => {
    setStatus(getAgencyOpenStatus());
    const interval = setInterval(() => setStatus(getAgencyOpenStatus()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const defaultMessage =
    locale === "ar"
      ? "مرحبا، أرغب في الحصول على معلومات حول عروض السفر."
      : "Bonjour, je souhaite avoir des informations sur vos packs voyage.";

  const quickMessages = [
    {
      label: tw("quickPrices"),
      text:
        locale === "ar"
          ? "مرحبا، أرغب في معرفة أسعار العروض المتوفرة حاليا."
          : "Bonjour, je souhaite connaître les prix des packs disponibles actuellement.",
    },
    {
      label: tw("quickAdvisor"),
      text:
        locale === "ar"
          ? "مرحبا، أرغب في التحدث مع أحد المستشارين."
          : "Bonjour, je souhaite parler à un conseiller.",
    },
  ];

  return (
    <div
      className={`fixed end-4 z-50 flex flex-col items-end gap-3 ${
        liftedForContactBar ? "bottom-[9rem] lg:bottom-[5.5rem]" : "bottom-20 lg:bottom-6"
      }`}
    >
      {open && (
        <div className="w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center gap-2 bg-[#25D366] px-4 py-3 text-white">
            <span className={`h-2 w-2 rounded-full ${status?.isOpen ? "bg-white" : "bg-white/50"}`} />
            <span className="text-xs font-medium">
              {status?.isOpen
                ? tw("onlineNow")
                : tw("closedUntil", { time: locale === "ar" ? status?.nextOpeningAr ?? "" : status?.nextOpeningFr ?? "" })}
            </span>
          </div>
          <ul className="divide-y divide-slate-100">
            {quickMessages.map((item) => (
              <li key={item.label}>
                <a
                  href={whatsappLink(agency.whatsapp, item.text)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={whatsappLink(agency.whatsapp, message ?? defaultMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 text-sm font-semibold text-[#128C7E] hover:bg-slate-50"
              >
                {tw("openChat")} →
              </a>
            </li>
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
        aria-label={t("whatsappCta")}
        aria-expanded={open}
      >
        {status?.isOpen && (
          <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400" />
        )}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.06-1.33A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18a7.9 7.9 0 01-4.03-1.1l-.29-.17-2.99.79.8-2.92-.19-.3A7.93 7.93 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.36-5.86c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.42-1.33-1.66-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
        </svg>
      </button>
    </div>
  );
}

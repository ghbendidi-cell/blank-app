import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { agency } from "@/data/agency";
import { whatsappLink, formatMad } from "@/lib/locale-content";

export default function WhatsAppQuoteShortcut({
  packTitle,
  priceFrom,
}: {
  packTitle: string;
  priceFrom: number;
}) {
  const locale = useLocale() as Locale;
  const tw = useTranslations("whatsapp");

  const message =
    locale === "ar"
      ? `مرحبا، أرغب في الحصول على عرض سعر لـ "${packTitle}" (ابتداء من ${formatMad(priceFrom, locale)}).`
      : `Bonjour, je souhaite recevoir un devis pour "${packTitle}" (dès ${formatMad(priceFrom, locale)}).`;

  return (
    <a
      href={whatsappLink(agency.whatsapp, message)}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#25D366] bg-[#25D366]/10 px-4 py-3 text-sm font-semibold text-[#128C7E] transition hover:bg-[#25D366]/20"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.06-1.33A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
      </svg>
      {tw("quickQuote")}
    </a>
  );
}

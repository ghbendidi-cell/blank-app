import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { formatMad } from "@/lib/locale-content";

export default function PriceBadge({
  amount,
  locale,
  size = "md",
}: {
  amount: number;
  locale: Locale;
  size?: "sm" | "md" | "lg";
}) {
  const t = useTranslations("common");
  const sizeClass = { sm: "text-sm", md: "text-lg", lg: "text-2xl" }[size];

  return (
    <span className={`font-bold text-brand ${sizeClass}`}>
      <span className="me-1 text-xs font-normal text-slate-500">{t("from")}</span>
      {formatMad(amount, locale)}
    </span>
  );
}

import { useTranslations } from "next-intl";
import { agency } from "@/data/agency";
import { telLink } from "@/lib/locale-content";

export default function StickyCTA({ quoteHref }: { quoteHref: string }) {
  const t = useTranslations("sticky");

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t border-slate-200 bg-white p-3 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] lg:hidden">
      <a
        href={quoteHref}
        className="flex-1 rounded-lg bg-brand py-3 text-center text-sm font-semibold text-white"
      >
        {t("quote")}
      </a>
      <a
        href={telLink(agency.phone)}
        className="flex-1 rounded-lg border border-brand py-3 text-center text-sm font-semibold text-brand"
      >
        {t("call")}
      </a>
    </div>
  );
}

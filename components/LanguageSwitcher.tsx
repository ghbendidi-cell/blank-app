"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-200 p-0.5 text-sm">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          className={`rounded-full px-2.5 py-1 transition ${
            locale === loc ? "bg-brand text-white" : "text-slate-600 hover:bg-slate-100"
          }`}
          aria-current={locale === loc}
        >
          {loc === "fr" ? "FR" : "AR"}
        </button>
      ))}
    </div>
  );
}

"use client";

import { useTranslations, useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { Pack } from "@/lib/types";
import { pick } from "@/lib/locale-content";

export default function CompareBar({
  packs,
  onRemove,
  onClear,
  onOpen,
}: {
  packs: Pack[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onOpen: () => void;
}) {
  const t = useTranslations("packs");
  const locale = useLocale() as Locale;

  if (packs.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {packs.map((pack) => (
            <span
              key={pack.id}
              className="flex items-center gap-1.5 rounded-full bg-brand-light py-1 ps-3 pe-1.5 text-xs font-medium text-brand"
            >
              {pick(pack.titleFr, pack.titleAr, locale)}
              <button
                type="button"
                onClick={() => onRemove(pack.id)}
                aria-label="Retirer"
                className="flex h-4 w-4 items-center justify-center rounded-full hover:bg-brand/20"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={onClear} className="text-xs font-medium text-slate-500 hover:underline">
            {t("compareClear")}
          </button>
          <button
            type="button"
            onClick={onOpen}
            disabled={packs.length < 2}
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t("compare")} ({packs.length})
          </button>
        </div>
      </div>
    </div>
  );
}

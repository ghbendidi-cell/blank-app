"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import type { TripType } from "@/lib/types";

const QUICK_TYPES: TripType[] = ["maroc", "international", "omra", "groupe"];

export default function SearchBar() {
  const t = useTranslations("home");
  const tTypes = useTranslations("packs.types");
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    router.push({ pathname: "/packs", query: query ? { q: query } : {} });
  }

  return (
    <div className="w-full max-w-xl">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-full border border-ivory/40 bg-ivory/95 py-1.5 pl-5 pr-1.5 shadow-sm">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="min-w-0 flex-1 bg-transparent font-sans text-sm text-ink outline-none placeholder:text-ink/45"
        />
        <button
          type="submit"
          aria-label={t("searchButton")}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-ivory transition-colors duration-300 hover:bg-brand"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
          </svg>
        </button>
      </form>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 font-sans text-xs uppercase tracking-[0.12em] text-ivory/80">
        {QUICK_TYPES.map((type) => (
          <Link
            key={type}
            href={{ pathname: "/packs", query: { type } }}
            className="border-b border-transparent pb-0.5 transition-colors duration-300 hover:border-ivory/70 hover:text-ivory"
          >
            {tTypes(type)}
          </Link>
        ))}
      </div>
    </div>
  );
}

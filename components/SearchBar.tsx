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
    <div className="w-full max-w-2xl rounded-3xl bg-white p-2 shadow-xl shadow-brand-dark/10">
      <div className="flex flex-wrap gap-1 px-2 pb-1.5 pt-1">
        {QUICK_TYPES.map((type) => (
          <Link
            key={type}
            href={{ pathname: "/packs", query: { type } }}
            className="rounded-full px-3 py-1 text-xs font-semibold text-slate-500 transition hover:bg-brand-light hover:text-brand-dark"
          >
            {tTypes(type)}
          </Link>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-2xl bg-gold-light/60 p-1.5">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
        <button
          type="submit"
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
        >
          {t("searchButton")}
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
            className="transition-transform group-hover:translate-x-0.5"
          >
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </form>
    </div>
  );
}

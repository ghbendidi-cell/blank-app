"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export default function SearchBar() {
  const t = useTranslations("home");
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    router.push({ pathname: "/packs", query: query ? { q: query } : {} });
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl overflow-hidden rounded-full bg-white shadow-lg">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("searchPlaceholder")}
        className="flex-1 px-5 py-3.5 text-sm text-slate-900 outline-none"
      />
      <button type="submit" className="bg-accent px-6 py-3.5 text-sm font-semibold text-white hover:bg-accent-dark">
        {t("searchButton")}
      </button>
    </form>
  );
}

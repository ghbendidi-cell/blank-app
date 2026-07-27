"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";

export default function ReviewForm() {
  const locale = useLocale();
  const t = useTranslations("avis.form");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const formData = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorName: formData.get("authorName"),
          rating: Number(formData.get("rating")),
          comment: formData.get("comment"),
          locale,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[20px] border border-accent/30 bg-accent-light p-6 text-center font-sans text-sm text-accent-dark">
        {t("success")}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-[20px] border border-ink/15 bg-white p-6">
      <label className="block">
        <span className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.1em] text-ink/60">{t("name")}</span>
        <input name="authorName" required className="w-full border border-ink/20 bg-ivory px-3 py-2.5 font-sans text-sm text-ink outline-none transition-colors focus:border-ink" />
      </label>

      <label className="block">
        <span className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.1em] text-ink/60">{t("rating")}</span>
        <select name="rating" defaultValue="5" className="w-full border border-ink/20 bg-ivory px-3 py-2.5 font-sans text-sm text-ink outline-none transition-colors focus:border-ink">
          {[5, 4, 3, 2, 1].map((value) => (
            <option key={value} value={value}>
              {"★".repeat(value)}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.1em] text-ink/60">{t("comment")}</span>
        <textarea name="comment" rows={4} required className="w-full border border-ink/20 bg-ivory px-3 py-2.5 font-sans text-sm text-ink outline-none transition-colors focus:border-ink" />
      </label>

      {status === "error" && <p className="font-sans text-sm text-red-700">Erreur, réessayez.</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-accent py-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-accent-dark disabled:opacity-60"
      >
        {t("submit")}
      </button>
    </form>
  );
}

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
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center text-sm text-green-800">
        {t("success")}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 p-6">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">{t("name")}</span>
        <input name="authorName" required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">{t("rating")}</span>
        <select name="rating" defaultValue="5" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
          {[5, 4, 3, 2, 1].map((value) => (
            <option key={value} value={value}>
              {"★".repeat(value)}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">{t("comment")}</span>
        <textarea name="comment" rows={4} required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </label>

      {status === "error" && <p className="text-sm text-red-600">Erreur, réessayez.</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-brand py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {t("submit")}
      </button>
    </form>
  );
}

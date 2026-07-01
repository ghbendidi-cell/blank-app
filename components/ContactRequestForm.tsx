"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";

export default function ContactRequestForm({
  packId,
  packTitle,
}: {
  packId?: string;
  packTitle?: string;
}) {
  const locale = useLocale();
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const formData = new FormData(event.currentTarget);
    const payload = {
      type: formData.get("type"),
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      email: formData.get("email") || undefined,
      preferredContact: formData.get("preferredContact"),
      message: formData.get("message") || undefined,
      budgetRange: formData.get("budgetRange") || undefined,
      travelDatesHint: formData.get("travelDatesHint") || undefined,
      packId,
      locale,
      sourcePage: typeof window !== "undefined" ? window.location.pathname : "",
    };

    try {
      const res = await fetch("/api/contact-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      {packTitle && (
        <p className="rounded-lg bg-brand-light px-3 py-2 text-sm text-brand">{packTitle}</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">{t("name")}</span>
          <input name="fullName" required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">{t("phone")}</span>
          <input name="phone" type="tel" required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">{t("email")}</span>
        <input name="email" type="email" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">{t("type")}</span>
          <select name="type" defaultValue="devis" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="devis">{t("typeDevis")}</option>
            <option value="rappel">{t("typeRappel")}</option>
            <option value="info_generale">{t("typeInfo")}</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">{t("preferredContact")}</span>
          <select name="preferredContact" defaultValue="telephone" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="telephone">{t("contactPhone")}</option>
            <option value="whatsapp">{t("contactWhatsapp")}</option>
            <option value="email">{t("contactEmail")}</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">{t("budget")}</span>
          <input name="budgetRange" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">{t("dates")}</span>
          <input name="travelDatesHint" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">{t("message")}</span>
        <textarea name="message" rows={4} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </label>

      {status === "error" && <p className="text-sm text-red-600">{t("error")}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-brand py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}

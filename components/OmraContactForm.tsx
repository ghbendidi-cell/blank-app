"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";

const fieldClass = "w-full border border-ink/20 bg-ivory px-3 py-2.5 font-sans text-sm text-ink outline-none transition-colors focus:border-ink";
const labelClass = "mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.1em] text-ink/60";

export default function OmraContactForm({
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
      preferredContact: "whatsapp",
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
      <div className="rounded-[20px] border border-accent/30 bg-accent-light p-6 text-center font-sans text-sm text-accent-dark">
        {t("success")}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-[20px] border border-ink/15 bg-ivory p-6 lg:p-8">
      {packTitle && <p className="border border-ink/15 px-3 py-2 font-sans text-sm text-ink/70">{packTitle}</p>}

      <label className="block">
        <span className={labelClass}>{t("name")}</span>
        <input name="fullName" required className={fieldClass} />
      </label>

      <label className="block">
        <span className={labelClass}>{t("phone")}</span>
        <input name="phone" type="tel" required className={fieldClass} />
      </label>

      <label className="block">
        <span className={labelClass}>{t("type")}</span>
        <select name="type" defaultValue="devis" className={fieldClass}>
          <option value="devis">{t("typeDevis")}</option>
          <option value="rappel">{t("typeRappel")}</option>
          <option value="info_generale">{t("typeInfo")}</option>
        </select>
      </label>

      {status === "error" && <p className="font-sans text-sm text-red-700">{t("error")}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-accent py-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-accent-dark disabled:opacity-60"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}

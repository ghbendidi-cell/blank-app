"use client";

import { useTranslations } from "next-intl";

const ICONS = [
  // Shield / certified badge
  <svg key="shield" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
    <path d="M9 12l2 2 4-4" />
  </svg>,
  // Clock
  <svg key="clock" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>,
  // People / handshake at agency
  <svg key="people" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="8.5" cy="8" r="2.8" />
    <circle cx="16" cy="9" r="2.2" />
    <path d="M3 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
    <path d="M14.5 14.5c2.3.2 4 1.9 4 4.5" />
  </svg>,
];

export default function TrustBadges() {
  const t = useTranslations("home");
  const items = [
    { title: t("whyUs1Title"), text: t("whyUs1Text") },
    { title: t("whyUs2Title"), text: t("whyUs2Text") },
    { title: t("whyUs3Title"), text: t("whyUs3Text") },
  ];

  return (
    <div className="grid gap-10 sm:grid-cols-3">
      {items.map((item, index) => (
        <div key={item.title} className="border-t border-ink/15 pt-5">
          <span className="text-accent">{ICONS[index]}</span>
          <p className="mt-4 font-display text-lg italic text-ink">{item.title}</p>
          <p className="mt-2 font-sans text-sm font-light text-ink/60">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { StaggerGrid, StaggerItem } from "./animations/StaggerGrid";
import TiltCard from "./animations/TiltCard";

const ICONS = [
  // Shield / certified badge
  <svg key="shield" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
    <path d="M9 12l2 2 4-4" />
  </svg>,
  // Clock
  <svg key="clock" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>,
  // People / handshake at agency
  <svg key="people" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
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
    <StaggerGrid className="grid gap-6 sm:grid-cols-3">
      {items.map((item, index) => (
        <StaggerItem key={item.title}>
          <TiltCard className="h-full">
            <div className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 p-6 text-center shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-light text-brand transition group-hover:bg-brand group-hover:text-white">
                {ICONS[index]}
              </span>
              <p className="font-semibold text-slate-900">{item.title}</p>
              <p className="text-sm text-slate-600">{item.text}</p>
            </div>
          </TiltCard>
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}

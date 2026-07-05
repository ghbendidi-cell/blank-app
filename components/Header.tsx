"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { agency } from "@/data/agency";
import { telLink } from "@/lib/locale-content";
import LanguageSwitcher from "./LanguageSwitcher";
import MagneticButton from "./animations/MagneticButton";

export default function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/destinations", label: t("destinations") },
    { href: "/packs", label: t("packs") },
    { href: "/omra-hajj", label: t("omra") },
    { href: "/voyages-groupes", label: t("groupes") },
    { href: "/avis", label: t("avis") },
    { href: "/a-propos", label: t("aPropos") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo-millenium-travel.png"
            alt="Millenium Travel"
            width={680}
            height={280}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-700 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <MagneticButton>
            <a href={telLink(agency.phone)} className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark">
              {t("callCta")}
            </a>
          </MagneticButton>
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-md border border-slate-200 p-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-md lg:hidden">
          <ul className="flex flex-col gap-3 text-sm font-medium text-slate-700">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between">
            <a href={telLink(agency.phone)} className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">
              {t("callCta")}
            </a>
            <LanguageSwitcher />
          </div>
        </nav>
      )}
    </header>
  );
}

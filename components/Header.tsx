"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { agency } from "@/data/agency";
import { telLink, whatsappLink } from "@/lib/locale-content";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
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

  const waMessage =
    locale === "ar" ? "مرحبا، أرغب في الحصول على معلومات حول عروض السفر." : "Bonjour, je souhaite avoir des informations sur vos voyages.";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      <div className="border-b border-ink/10 bg-ivory/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 lg:px-10">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo-millenium-travel.png"
              alt="Millenium Travel"
              width={680}
              height={280}
              priority
              className="h-9 w-auto"
            />
          </Link>

          <div className="flex items-center gap-5">
            <a
              href={whatsappLink(agency.whatsapp, waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hidden text-ink/60 transition-colors duration-300 hover:text-brand sm:block"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.06-1.33A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18a7.9 7.9 0 01-4.03-1.1l-.29-.17-2.99.79.8-2.92-.19-.3A7.93 7.93 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.36-5.86c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.42-1.33-1.66-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
              </svg>
            </a>

            <button
              type="button"
              className="flex items-center gap-3 text-ink"
              onClick={() => setOpen(true)}
              aria-label={t("menu")}
              aria-expanded={open}
            >
              <span className="hidden font-sans text-[11px] font-semibold uppercase tracking-[0.14em] sm:inline">{t("menu")}</span>
              <span className="flex flex-col items-end gap-[5px]">
                <span className="block h-px w-6 bg-ink" />
                <span className="block h-px w-6 bg-ink" />
                <span className="block h-px w-4 bg-ink" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-ink/40"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              key="panel"
              initial={{ x: locale === "ar" ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: locale === "ar" ? "-100%" : "100%" }}
              transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
              className="fixed inset-y-0 end-0 z-50 flex w-full max-w-sm flex-col justify-between border-s border-ink/10 bg-ivory px-8 py-8"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg italic text-ink">Millenium Travel</span>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label={t("close")}
                    className="flex h-9 w-9 items-center justify-center border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-ivory"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 6l12 12M6 18L18 6" />
                    </svg>
                  </button>
                </div>

                <ul className="mt-12 flex flex-col gap-6">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="font-display text-3xl italic text-ink transition-colors hover:text-brand"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-ink/10 pt-6">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={telLink(agency.phone)}
                    className="border border-ink px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:bg-ink hover:text-ivory"
                  >
                    {t("callCta")}
                  </a>
                  <a
                    href={whatsappLink(agency.whatsapp, waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#25D366] px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#128C7E] transition-colors duration-300 hover:bg-[#25D366] hover:text-white"
                  >
                    WhatsApp
                  </a>
                </div>
                <div className="mt-5">
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

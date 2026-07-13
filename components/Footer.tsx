import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="border-t border-ink/10 bg-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div>
          <p className="font-display text-xl italic text-ink">Millenium Travel</p>
          <p className="mt-3 max-w-[22ch] font-sans text-sm font-light text-ink/60">{t("tagline")}</p>
        </div>

        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">{t("quickLinks")}</p>
          <ul className="mt-4 space-y-2 font-sans text-sm text-ink/70">
            <li><Link href="/packs" className="transition-colors hover:text-ink">{tNav("packs")}</Link></li>
            <li><Link href="/destinations" className="transition-colors hover:text-ink">{tNav("destinations")}</Link></li>
            <li><Link href="/avis" className="transition-colors hover:text-ink">{tNav("avis")}</Link></li>
            <li><Link href="/contact" className="transition-colors hover:text-ink">{tNav("contact")}</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">{t("legal")}</p>
          <ul className="mt-4 space-y-2 font-sans text-sm text-ink/70">
            <li><Link href="/mentions-legales" className="transition-colors hover:text-ink">{t("legalNotice")}</Link></li>
            <li><Link href="/politique-confidentialite" className="transition-colors hover:text-ink">{t("privacy")}</Link></li>
            <li><Link href="/cgu" className="transition-colors hover:text-ink">{t("terms")}</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">{t("followUs")}</p>
          <div className="mt-4 flex gap-4 font-sans text-sm text-ink/70">
            <a href="#" className="transition-colors hover:text-ink">Facebook</a>
            <a href="#" className="transition-colors hover:text-ink">Instagram</a>
          </div>
        </div>
      </div>
      <div className="border-t border-ink/10 py-5 text-center font-sans text-xs text-ink/50">
        Millenium Travel — Maarif, Casablanca. © {new Date().getFullYear()} {t("rights")}
      </div>
    </footer>
  );
}

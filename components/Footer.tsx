import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-brand">Millenium Travel</p>
          <p className="mt-2 text-sm text-slate-600">{t("tagline")}</p>
        </div>

        <div>
          <p className="font-semibold text-slate-900">{t("quickLinks")}</p>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
            <li><Link href="/packs" className="hover:text-brand">{tNav("packs")}</Link></li>
            <li><Link href="/destinations" className="hover:text-brand">{tNav("destinations")}</Link></li>
            <li><Link href="/avis" className="hover:text-brand">{tNav("avis")}</Link></li>
            <li><Link href="/contact" className="hover:text-brand">{tNav("contact")}</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-slate-900">{t("legal")}</p>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
            <li><Link href="/mentions-legales" className="hover:text-brand">{t("legalNotice")}</Link></li>
            <li><Link href="/politique-confidentialite" className="hover:text-brand">{t("privacy")}</Link></li>
            <li><Link href="/cgu" className="hover:text-brand">{t("terms")}</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-slate-900">{t("followUs")}</p>
          <div className="mt-2 flex gap-3 text-sm text-slate-600">
            <a href="#" className="hover:text-brand">Facebook</a>
            <a href="#" className="hover:text-brand">Instagram</a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        Millenium Travel — Maarif, Casablanca. © {new Date().getFullYear()} {t("rights")}
      </div>
    </footer>
  );
}

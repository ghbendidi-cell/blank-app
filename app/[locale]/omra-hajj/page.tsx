import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { packs } from "@/data/packs";
import Breadcrumb from "@/components/Breadcrumb";
import PackCard from "@/components/PackCard";
import ContactRequestForm from "@/components/ContactRequestForm";

export default async function OmraHajjPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");

  const omraPacks = packs.filter((p) => p.tripType === "omra" || p.tripType === "hajj");

  return (
    <div>
      <Breadcrumb items={[{ label: tCommon("seeAll"), href: "/" }, { label: tNav("omra") }]} />

      <div className="mx-auto max-w-7xl px-4 pb-16">
        <h1 className="text-2xl font-bold text-slate-900">{t("omraTitle")}</h1>
        <p className="mt-1 max-w-xl text-sm text-slate-600">{t("omraSubtitle")}</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="grid gap-5 sm:grid-cols-2">
            {omraPacks.map((pack) => (
              <PackCard key={pack.id} pack={pack} locale={locale} />
            ))}
          </div>
          <aside>
            <div className="sticky top-24">
              <ContactRequestForm />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

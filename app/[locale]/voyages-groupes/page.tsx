import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { packs } from "@/data/packs";
import Breadcrumb from "@/components/Breadcrumb";
import PackCard from "@/components/PackCard";
import ContactRequestForm from "@/components/ContactRequestForm";

export default async function GroupTravelPage() {
  const locale = (await getLocale()) as Locale;
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");

  const groupPacks = packs.filter((p) => p.tripType === "groupe");

  return (
    <div>
      <Breadcrumb items={[{ label: tCommon("seeAll"), href: "/" }, { label: tNav("groupes") }]} />

      <div className="mx-auto max-w-7xl px-4 pb-16">
        <h1 className="text-2xl font-bold text-slate-900">{tNav("groupes")}</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="grid gap-5 sm:grid-cols-2">
            {groupPacks.map((pack) => (
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

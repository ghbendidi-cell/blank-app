import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { packs } from "@/data/packs";
import Breadcrumb from "@/components/Breadcrumb";
import PackCard from "@/components/PackCard";
import ContactRequestForm from "@/components/ContactRequestForm";
import ParallaxImage from "@/components/animations/ParallaxImage";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";

export default async function OmraHajjPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");

  const omraPacks = packs.filter((p) => p.tripType === "omra" || p.tripType === "hajj");

  return (
    <div>
      <Breadcrumb items={[{ label: tCommon("seeAll"), href: "/" }, { label: tNav("omra") }]} />

      <div className="relative h-[32vh] min-h-[220px] overflow-hidden">
        <ParallaxImage src="/images/mecque-tour-horloge.jpg" alt="La Mecque" className="absolute inset-0 h-full w-full" strength={35} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-6">
            <h1 className="font-display text-2xl italic text-gold drop-shadow-lg sm:text-3xl">{t("omraTitle")}</h1>
            <p className="mt-1 max-w-xl text-sm text-white/90">{t("omraSubtitle")}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 pb-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <StaggerGrid className="grid gap-5 sm:grid-cols-2">
            {omraPacks.map((pack) => (
              <StaggerItem key={pack.id}>
                <PackCard pack={pack} locale={locale} />
              </StaggerItem>
            ))}
          </StaggerGrid>
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

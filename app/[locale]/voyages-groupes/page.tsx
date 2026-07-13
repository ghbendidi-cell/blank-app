import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import Breadcrumb from "@/components/Breadcrumb";
import ContactRequestForm from "@/components/ContactRequestForm";

export default async function GroupTravelPage() {
  const locale = (await getLocale()) as Locale;
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");

  return (
    <div>
      <Breadcrumb items={[{ label: tCommon("seeAll"), href: "/" }, { label: tNav("groupes") }]} />

      <div className="mx-auto max-w-7xl px-4 pb-16">
        <h1 className="font-display text-4xl italic text-ink sm:text-5xl">{tNav("groupes")}</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          {locale === "ar"
            ? "ننظم رحلات جماعية على المقاس (عائلات، أصدقاء، شركات) بناء على طلبكم. تواصلوا معنا لعرض سعر مخصص حسب الوجهة والعدد والميزانية."
            : "Nous organisons des voyages de groupe sur mesure (familles, amis, entreprises) selon vos besoins. Contactez-nous pour un devis personnalisé selon la destination, le nombre de personnes et le budget."}
        </p>

        <div className="mt-8 max-w-lg">
          <ContactRequestForm />
        </div>
      </div>
    </div>
  );
}

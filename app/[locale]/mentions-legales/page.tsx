import { getTranslations } from "next-intl/server";
import Breadcrumb from "@/components/Breadcrumb";

export default async function LegalNoticePage() {
  const tCommon = await getTranslations("common");
  const tFooter = await getTranslations("footer");

  return (
    <div>
      <Breadcrumb items={[{ label: tCommon("seeAll"), href: "/" }, { label: tFooter("legalNotice") }]} />
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <h1 className="text-2xl font-bold text-slate-900">{tFooter("legalNotice")}</h1>
        <p className="mt-4 text-sm text-slate-600">
          Millenium Travel — Maarif, Casablanca, Maroc. Contenu à compléter avec la raison sociale, le numéro RC,
          l&apos;IF, la patente et l&apos;agrément agence de voyage de l&apos;entreprise.
        </p>
      </div>
    </div>
  );
}

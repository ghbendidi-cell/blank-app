import { getTranslations } from "next-intl/server";
import Breadcrumb from "@/components/Breadcrumb";

export default async function PrivacyPolicyPage() {
  const tCommon = await getTranslations("common");
  const tFooter = await getTranslations("footer");

  return (
    <div>
      <Breadcrumb items={[{ label: tCommon("seeAll"), href: "/" }, { label: tFooter("privacy") }]} />
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <h1 className="text-2xl font-bold text-slate-900">{tFooter("privacy")}</h1>
        <p className="mt-4 text-sm text-slate-600">
          Les données collectées via les formulaires de contact et d&apos;avis sont utilisées uniquement pour le
          traitement de vos demandes par Millenium Travel, conformément à la loi 09-08 relative à la protection des
          données à caractère personnel. Contenu à finaliser avec un conseil juridique avant mise en production.
        </p>
      </div>
    </div>
  );
}

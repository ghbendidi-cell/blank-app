import { getTranslations } from "next-intl/server";
import Breadcrumb from "@/components/Breadcrumb";

export default async function TermsPage() {
  const tCommon = await getTranslations("common");
  const tFooter = await getTranslations("footer");

  return (
    <div>
      <Breadcrumb items={[{ label: tCommon("seeAll"), href: "/" }, { label: tFooter("terms") }]} />
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <h1 className="text-2xl font-bold text-slate-900">{tFooter("terms")}</h1>
        <p className="mt-4 text-sm text-slate-600">
          L&apos;utilisation de ce site n&apos;implique aucun engagement d&apos;achat. Les réservations et paiements
          sont finalisés exclusivement en agence, à l&apos;adresse Millenium Travel — Maarif, Casablanca. Contenu à
          finaliser avec un conseil juridique avant mise en production.
        </p>
      </div>
    </div>
  );
}

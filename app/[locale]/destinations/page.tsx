import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { destinations } from "@/data/destinations";
import Breadcrumb from "@/components/Breadcrumb";
import DestinationCard from "@/components/DestinationCard";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("destinations");
  return { title: t("title"), description: t("subtitle") };
}

export default async function DestinationsPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("destinations");
  const tCommon = await getTranslations("common");

  return (
    <div>
      <Breadcrumb items={[{ label: tCommon("seeAll"), href: "/" }, { label: t("title") }]} />
      <div className="mx-auto max-w-7xl px-4 pb-16">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{t("title")}</h1>
        <p className="mt-2 text-sm text-slate-600">{t("subtitle")}</p>

        <StaggerGrid className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <StaggerItem key={destination.id}>
              <DestinationCard destination={destination} locale={locale} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </div>
  );
}

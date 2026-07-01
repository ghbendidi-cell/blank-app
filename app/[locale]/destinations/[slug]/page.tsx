import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { destinations, getDestinationBySlug } from "@/data/destinations";
import { getPacksByDestination } from "@/data/packs";
import { getReviewsByPack } from "@/data/reviews";
import { pick } from "@/lib/locale-content";
import Breadcrumb from "@/components/Breadcrumb";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import PackCard from "@/components/PackCard";
import ReviewCard from "@/components/ReviewCard";
import ContactRequestForm from "@/components/ContactRequestForm";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) return {};
  const name = pick(destination.nameFr, destination.nameAr, locale as Locale);
  return {
    title: `Voyage ${name} pas cher au départ du Maroc`,
    description: pick(destination.descriptionFr, destination.descriptionAr, locale as Locale),
  };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("destinations");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");

  const destinationPacks = getPacksByDestination(destination.id);
  const destinationReviews = destinationPacks.flatMap((p) => getReviewsByPack(p.id));
  const name = pick(destination.nameFr, destination.nameAr, locale);

  return (
    <div>
      <Breadcrumb
        items={[
          { label: tCommon("seeAll"), href: "/" },
          { label: tNav("destinations"), href: "/destinations" },
          { label: name },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 pb-16">
        <ImagePlaceholder image={destination.heroImage} locale={locale} className="rounded-xl" />

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{name}</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {pick(destination.descriptionFr, destination.descriptionAr, locale)}
            </p>

            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-50 p-3">
                <dt className="text-xs font-medium text-slate-500">{t("bestPeriod")}</dt>
                <dd className="text-sm text-slate-800">{pick(destination.bestPeriodFr, destination.bestPeriodAr, locale)}</dd>
              </div>
              {destination.visaInfoFr && (
                <div className="rounded-lg bg-slate-50 p-3">
                  <dt className="text-xs font-medium text-slate-500">{t("visaInfo")}</dt>
                  <dd className="text-sm text-slate-800">{pick(destination.visaInfoFr, destination.visaInfoAr, locale)}</dd>
                </div>
              )}
            </dl>

            <h2 className="mb-4 mt-10 text-lg font-bold text-slate-900">
              {t("packsIn", { destination: name })}
            </h2>
            {destinationPacks.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                {destinationPacks.map((pack) => (
                  <PackCard key={pack.id} pack={pack} locale={locale} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">{tCommon("noResults")}</p>
            )}

            {destinationReviews.length > 0 && (
              <>
                <h2 className="mb-4 mt-10 text-lg font-bold text-slate-900">{tNav("avis")}</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {destinationReviews.slice(0, 4).map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </>
            )}
          </div>

          <aside>
            <div className="sticky top-24">
              <ContactRequestForm packTitle={name} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

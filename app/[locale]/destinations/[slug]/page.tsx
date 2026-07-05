import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { destinations, getDestinationBySlug } from "@/data/destinations";
import { getPacksByDestination } from "@/data/packs";
import { getReviewsByPack } from "@/data/reviews";
import { pick } from "@/lib/locale-content";
import { destinationTheme } from "@/lib/theme";
import Breadcrumb from "@/components/Breadcrumb";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import PackCard from "@/components/PackCard";
import ReviewCard from "@/components/ReviewCard";
import ContactRequestForm from "@/components/ContactRequestForm";
import ParallaxImage from "@/components/animations/ParallaxImage";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";

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
  const theme = destinationTheme[destination.accentColor];

  return (
    <div>
      <Breadcrumb
        items={[
          { label: tCommon("seeAll"), href: "/" },
          { label: tNav("destinations"), href: "/destinations" },
          { label: name },
        ]}
      />

      <div className="relative h-[45vh] min-h-[280px] overflow-hidden">
        {destination.heroImage.url && (
          <ParallaxImage src={destination.heroImage.url} alt={name} className="absolute inset-0 h-full w-full" strength={50} />
        )}
        <div className={`absolute inset-0 bg-gradient-to-t ${theme.gradient}`} />
        <div className="absolute inset-0 flex items-end">
          <h1 className="mx-auto max-w-7xl px-4 pb-6 text-3xl font-display font-extrabold tracking-tight text-white drop-shadow-lg sm:text-4xl">{name}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16">
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="text-sm leading-relaxed text-slate-600">
              {pick(destination.descriptionFr, destination.descriptionAr, locale)}
            </p>

            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className={`rounded-lg p-3 ${theme.bgLight}`}>
                <dt className="text-xs font-medium text-slate-500">{t("bestPeriod")}</dt>
                <dd className={`text-sm font-medium ${theme.text}`}>{pick(destination.bestPeriodFr, destination.bestPeriodAr, locale)}</dd>
              </div>
              {destination.visaInfoFr && (
                <div className={`rounded-lg p-3 ${theme.bgLight}`}>
                  <dt className="text-xs font-medium text-slate-500">{t("visaInfo")}</dt>
                  <dd className={`text-sm font-medium ${theme.text}`}>{pick(destination.visaInfoFr, destination.visaInfoAr, locale)}</dd>
                </div>
              )}
            </dl>

            {destination.gallery.length > 0 && (
              <StaggerGrid className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
                {destination.gallery.map((image, index) => (
                  <StaggerItem key={index} className="overflow-hidden rounded-xl">
                    <div className="transition-transform duration-500 hover:scale-110">
                      <ImagePlaceholder image={image} locale={locale} className="aspect-square" />
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGrid>
            )}

            <h2 className="mb-4 mt-10 text-lg font-bold text-slate-900">
              {t("packsIn", { destination: name })}
            </h2>
            {destinationPacks.length > 0 ? (
              <StaggerGrid className="grid gap-5 sm:grid-cols-2">
                {destinationPacks.map((pack) => (
                  <StaggerItem key={pack.id}>
                    <PackCard pack={pack} locale={locale} />
                  </StaggerItem>
                ))}
              </StaggerGrid>
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
            <ScrollReveal className="sticky top-24">
              <ContactRequestForm packTitle={name} />
            </ScrollReveal>
          </aside>
        </div>
      </div>
    </div>
  );
}

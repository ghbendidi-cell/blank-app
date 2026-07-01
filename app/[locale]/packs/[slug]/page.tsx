import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { packs, getPackBySlug, getSimilarPacks } from "@/data/packs";
import { destinations } from "@/data/destinations";
import { getReviewsByPack } from "@/data/reviews";
import { pick, formatDate } from "@/lib/locale-content";
import Breadcrumb from "@/components/Breadcrumb";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import PriceBadge from "@/components/PriceBadge";
import PriceTable from "@/components/PriceTable";
import Stars from "@/components/Stars";
import ItineraryTimeline from "@/components/ItineraryTimeline";
import InclusionsList from "@/components/InclusionsList";
import FAQAccordion from "@/components/FAQAccordion";
import ReviewCard from "@/components/ReviewCard";
import RatingSummary from "@/components/RatingSummary";
import PackCard from "@/components/PackCard";
import ContactRequestForm from "@/components/ContactRequestForm";
import StickyCTA from "@/components/StickyCTA";

export function generateStaticParams() {
  return packs.map((pack) => ({ slug: pack.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const pack = getPackBySlug(slug);
  if (!pack) return {};

  const title = pick(pack.titleFr, pack.titleAr, locale as Locale);
  const description = pick(pack.highlightsFr.join(", "), pack.highlightsAr.join("، "), locale as Locale);

  return {
    title: `${title} – ${pack.durationDays}j dès ${pack.priceFrom} MAD`,
    description,
  };
}

export default async function PackDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pack = getPackBySlug(slug);
  if (!pack) notFound();

  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("packDetail");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");
  const tTypes = await getTranslations("packs.types");

  const destination = destinations.find((d) => d.id === pack.destinationId);
  const packReviews = getReviewsByPack(pack.id);
  const similarPacks = getSimilarPacks(pack);
  const title = pick(pack.titleFr, pack.titleAr, locale);

  const faqItems = [
    {
      question: locale === "ar" ? "هل التأشيرة مشمولة؟" : "Le visa est-il inclus ?",
      answer:
        locale === "ar"
          ? "يعتمد ذلك على الوجهة، راجع قائمة \"ما لا يشمله العرض\" أعلاه أو تواصل مع مستشارينا."
          : "Cela dépend de la destination, consultez la liste \"non inclus\" ci-dessus ou contactez un conseiller.",
    },
    {
      question: locale === "ar" ? "ما هي شروط الإلغاء؟" : "Quelles sont les conditions d'annulation ?",
      answer:
        locale === "ar"
          ? "تختلف الشروط حسب العرض والمزود. يوضح مستشارونا التفاصيل عند تأكيد الحجز."
          : "Les conditions varient selon le pack et le prestataire. Nos conseillers vous les détaillent lors de la confirmation.",
    },
    {
      question: locale === "ar" ? "هل يمكن تخصيص البرنامج؟" : "Peut-on personnaliser le programme ?",
      answer:
        locale === "ar"
          ? "نعم، تواصلوا معنا لتصميم عرض حسب احتياجاتكم."
          : "Oui, contactez-nous pour adapter ce pack à vos besoins.",
    },
  ];

  return (
    <div className="pb-24 lg:pb-0">
      <Breadcrumb
        items={[
          { label: tCommon("seeAll"), href: "/" },
          { label: tNav("packs"), href: "/packs" },
          { label: title },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-3 sm:grid-cols-3">
          {pack.images.map((image, index) => (
            <ImagePlaceholder key={index} image={image} locale={locale} className={index === 0 ? "sm:col-span-2 sm:row-span-2" : ""} />
          ))}
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px]">
          <div className="space-y-10">
            <div>
              <p className="text-sm font-medium text-brand">
                {destination ? pick(destination.nameFr, destination.nameAr, locale) : ""} · {tTypes(pack.tripType)}
              </p>
              <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h1>
              <div className="mt-2 flex items-center gap-2">
                <Stars rating={pack.ratingAvg} />
                <span className="text-sm text-slate-500">
                  {pack.ratingAvg} ({tCommon("reviews", { count: pack.ratingCount })})
                </span>
              </div>

              <ul className="mt-4 flex flex-wrap gap-2">
                {pack.highlightsFr.map((_, index) => (
                  <li key={index} className="rounded-full bg-brand-light px-3 py-1 text-xs font-medium text-brand">
                    {pick(pack.highlightsFr[index], pack.highlightsAr[index], locale)}
                  </li>
                ))}
              </ul>
            </div>

            <section>
              <h2 className="mb-4 text-lg font-bold text-slate-900">{t("itinerary")}</h2>
              <ItineraryTimeline days={pack.itinerary} />
            </section>

            <section>
              <InclusionsList
                inclusionsFr={pack.inclusionsFr}
                inclusionsAr={pack.inclusionsAr}
                exclusionsFr={pack.exclusionsFr}
                exclusionsAr={pack.exclusionsAr}
              />
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold text-slate-900">{t("faq")}</h2>
              <FAQAccordion items={faqItems} />
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold text-slate-900">{t("reviews")}</h2>
              {packReviews.length > 0 ? (
                <>
                  <div className="mb-4">
                    <RatingSummary reviews={packReviews} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {packReviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-sm text-slate-500">{tCommon("noResults")}</p>
              )}
            </section>

            {similarPacks.length > 0 && (
              <section>
                <h2 className="mb-4 text-lg font-bold text-slate-900">{t("similarPacks")}</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {similarPacks.map((similar) => (
                    <PackCard key={similar.id} pack={similar} locale={locale} />
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-xl border border-slate-200 p-5">
                <PriceBadge amount={pack.priceFrom} locale={locale} size="lg" />
                <p className="mt-2 text-sm text-slate-500">
                  {t("departureDates")}: {pack.departureDates.map((d) => formatDate(d, locale)).join(" · ")}
                </p>
              </div>
              <PriceTable variants={pack.priceVariants} />
              <ContactRequestForm packId={pack.id} packTitle={title} />
            </div>
          </aside>
        </div>

        <div className="mt-10 lg:hidden">
          <PriceTable variants={pack.priceVariants} />
          <div className="mt-6">
            <h2 className="mb-4 text-lg font-bold text-slate-900" id="devis">
              {t("requestQuoteFor")}
            </h2>
            <ContactRequestForm packId={pack.id} packTitle={title} />
          </div>
        </div>
      </div>

      <StickyCTA quoteHref="#devis" />
    </div>
  );
}

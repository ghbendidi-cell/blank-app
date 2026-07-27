import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { Review } from "@/lib/types";
import { pick, formatDate } from "@/lib/locale-content";
import Stars from "./Stars";

export default function ReviewCard({ review }: { review: Review }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("avis");
  const comment = pick(review.commentFr ?? "", review.commentAr, locale);

  return (
    <div className="rounded-[20px] border border-ink/10 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display italic text-ink">{review.authorName}</p>
          <p className="font-sans text-xs text-ink/40">{formatDate(review.createdAt, locale)}</p>
        </div>
        <Stars rating={review.rating} size={14} />
      </div>
      <p className="mt-3 font-sans text-sm text-ink/65">{comment}</p>
      {review.verifiedClient && (
        <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-accent-light px-2.5 py-1 font-sans text-xs font-medium text-accent-dark">
          {t("verifiedClient")}
        </span>
      )}
    </div>
  );
}

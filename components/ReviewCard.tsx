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
    <div className="rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-slate-900">{review.authorName}</p>
          <p className="text-xs text-slate-400">{formatDate(review.createdAt, locale)}</p>
        </div>
        <Stars rating={review.rating} size={14} />
      </div>
      <p className="mt-3 text-sm text-slate-600">{comment}</p>
      {review.verifiedClient && (
        <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-brand-light px-2.5 py-1 text-xs font-medium text-brand">
          {t("verifiedClient")}
        </span>
      )}
    </div>
  );
}

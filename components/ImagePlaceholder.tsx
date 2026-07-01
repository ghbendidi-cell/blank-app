import type { Locale } from "@/i18n/routing";
import type { ImagePlaceholder as ImagePlaceholderType } from "@/lib/types";
import { pick } from "@/lib/locale-content";

const ratioClass: Record<ImagePlaceholderType["aspectRatio"], string> = {
  "16:9": "aspect-video",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
};

export default function ImagePlaceholder({
  image,
  locale,
  className = "",
}: {
  image: ImagePlaceholderType;
  locale: Locale;
  className?: string;
}) {
  const alt = pick(image.altFr, image.altAr, locale);

  if (image.url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image.url} alt={alt} className={`${ratioClass[image.aspectRatio]} w-full object-cover ${className}`} />;
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`${ratioClass[image.aspectRatio]} flex w-full flex-col items-center justify-center gap-1 border-2 border-dashed border-slate-300 bg-slate-100 text-slate-400 ${className}`}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5-9 9" />
      </svg>
      <span className="px-2 text-center text-xs">{alt}</span>
    </div>
  );
}

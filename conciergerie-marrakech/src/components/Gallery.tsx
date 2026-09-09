import { useLanguage } from "../i18n/LanguageContext";
import { VideoBackground } from "./VideoBackground";

// posterExt is "svg" for the shipped illustrative placeholders, or the real
// file extension once a photo has been dropped in for that slot.
const items = [
  { slug: "gallery-souk", posterExt: "svg" },
  { slug: "gallery-medina", posterExt: "jpg" },
  { slug: "gallery-terrace-sunset", posterExt: "svg" },
  { slug: "gallery-riad-patio", posterExt: "svg" },
  { slug: "gallery-alley", posterExt: "svg" },
  { slug: "gallery-artisan", posterExt: "webp" },
] as const;

export function Gallery() {
  const { t } = useLanguage();

  return (
    <section className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-serif text-3xl text-ink sm:text-4xl">
          {t.gallery.heading}
        </h2>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.gallery.items.map((item, index) => {
            const { slug, posterExt } = items[index];
            return (
              <div
                key={slug}
                className="relative aspect-[4/5] overflow-hidden rounded-soft"
              >
                <VideoBackground
                  videoSrc={`/videos/${slug}.mp4`}
                  poster={`/images/${slug}-poster.${posterExt}`}
                  alt={item.name}
                  stillOnMobile
                  className="h-full w-full"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/60 to-transparent px-4 pb-4 pt-10"
                  aria-hidden="true"
                />
                <p className="absolute inset-x-4 bottom-3 font-serif text-sm text-cream sm:text-base">
                  {item.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

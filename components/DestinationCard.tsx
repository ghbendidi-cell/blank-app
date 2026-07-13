import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Destination } from "@/lib/types";
import { pick } from "@/lib/locale-content";
import { destinationTheme } from "@/lib/theme";
import ImagePlaceholder from "./ImagePlaceholder";
import { packs } from "@/data/packs";

export default function DestinationCard({ destination, locale }: { destination: Destination; locale: Locale }) {
  const name = pick(destination.nameFr, destination.nameAr, locale);
  const packCount = packs.filter((p) => p.destinationId === destination.id).length;
  const theme = destinationTheme[destination.accentColor];

  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group relative flex overflow-hidden border border-ink/10 transition duration-300 hover:shadow-lg"
    >
      <div className="w-full transition-transform duration-500 group-hover:scale-105">
        <ImagePlaceholder image={destination.heroImage} locale={locale} className="aspect-[4/3]" />
      </div>
      <div className={`absolute inset-0 flex items-end bg-gradient-to-t p-5 ${theme.gradient}`} />
      <div className="absolute inset-0 flex items-end p-5">
        <div className="text-ivory">
          <h3 className="font-display text-lg italic drop-shadow group-hover:underline">{name}</h3>
          <p className="mt-0.5 font-sans text-[11px] uppercase tracking-[0.12em] text-ivory/85">{packCount} packs</p>
        </div>
      </div>
    </Link>
  );
}

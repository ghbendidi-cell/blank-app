import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Destination } from "@/lib/types";
import { pick } from "@/lib/locale-content";
import { destinationTheme } from "@/lib/theme";
import ImagePlaceholder from "./ImagePlaceholder";
import TiltCard from "./animations/TiltCard";
import { packs } from "@/data/packs";

export default function DestinationCard({ destination, locale }: { destination: Destination; locale: Locale }) {
  const name = pick(destination.nameFr, destination.nameAr, locale);
  const packCount = packs.filter((p) => p.destinationId === destination.id).length;
  const theme = destinationTheme[destination.accentColor];

  return (
    <TiltCard>
      <Link
        href={`/destinations/${destination.slug}`}
        className="group relative flex overflow-hidden rounded-2xl border border-slate-200 shadow-sm transition duration-300 hover:shadow-xl"
      >
        <div className="w-full transition-transform duration-500 group-hover:scale-110">
          <ImagePlaceholder image={destination.heroImage} locale={locale} className="aspect-[4/3]" />
        </div>
        <div className={`absolute inset-0 flex items-end bg-gradient-to-t p-4 ${theme.gradient}`} />
        <div className="absolute inset-0 flex items-end p-4">
          <div className="text-white">
            <h3 className="text-lg font-bold drop-shadow group-hover:underline">{name}</h3>
            <p className="text-xs font-medium text-white/90">{packCount} packs</p>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}

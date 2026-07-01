import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Destination } from "@/lib/types";
import { pick } from "@/lib/locale-content";
import ImagePlaceholder from "./ImagePlaceholder";
import { packs } from "@/data/packs";

export default function DestinationCard({ destination, locale }: { destination: Destination; locale: Locale }) {
  const name = pick(destination.nameFr, destination.nameAr, locale);
  const packCount = packs.filter((p) => p.destinationId === destination.id).length;

  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group relative flex overflow-hidden rounded-xl border border-slate-200 shadow-sm transition hover:shadow-md"
    >
      <ImagePlaceholder image={destination.heroImage} locale={locale} className="aspect-[4/3]" />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/0 to-transparent p-4">
        <div className="text-white">
          <h3 className="font-semibold group-hover:underline">{name}</h3>
          <p className="text-xs text-white/80">{packCount} packs</p>
        </div>
      </div>
    </Link>
  );
}

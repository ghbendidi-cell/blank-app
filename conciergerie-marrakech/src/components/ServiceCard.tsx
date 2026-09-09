import { Link } from "react-router-dom";
import type { ServiceSlug } from "../data/services";
import { useLanguage } from "../i18n/LanguageContext";
import { asset } from "../lib/asset";
import { VideoBackground } from "./VideoBackground";

export function ServiceCard({ slug }: { slug: ServiceSlug }) {
  const { t } = useLanguage();
  const detail = t.servicesDetail[slug];

  return (
    <Link to={`/services/${slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-soft">
        <VideoBackground
          videoSrc={asset(`videos/service-${slug}.mp4`)}
          poster={asset(`images/service-${slug}-poster.svg`)}
          alt={detail.heroAlt}
          stillOnMobile
          className="h-full w-full"
        />
      </div>
      <h3 className="mt-4 font-serif text-lg text-ink transition-colors group-hover:text-olive">
        {detail.name}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-ink-light">
        {detail.oneLiner}
      </p>
    </Link>
  );
}

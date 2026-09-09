import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { SelectionToggleButton } from "../components/SelectionToggleButton";
import { VideoBackground } from "../components/VideoBackground";
import { SERVICE_SLUGS, type ServiceSlug } from "../data/services";
import { useLanguage } from "../i18n/LanguageContext";
import { asset } from "../lib/asset";

function isServiceSlug(value: string | undefined): value is ServiceSlug {
  return !!value && (SERVICE_SLUGS as readonly string[]).includes(value);
}

export function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();

  const valid = isServiceSlug(slug);
  const detail = valid ? t.servicesDetail[slug] : null;

  useEffect(() => {
    if (detail) document.title = `${detail.name} — ${t.nav.brand}`;
  }, [detail, t.nav.brand]);

  if (!valid || !detail) {
    return <Navigate to="/services" replace />;
  }

  return (
    <article>
      <div className="relative flex h-[46vh] min-h-[340px] items-end text-cream">
        <VideoBackground
          videoSrc={asset(`videos/service-${slug}.mp4`)}
          poster={asset(`images/service-${slug}-poster.svg`)}
          alt=""
          priority
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-ink/55" aria-hidden="true" />
        <h1 className="relative mx-auto w-full max-w-3xl px-6 pb-10 font-serif text-3xl leading-tight sm:text-4xl">
          {detail.name}
        </h1>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
        <p className="max-w-prose font-serif text-xl leading-relaxed text-ink">
          {detail.oneLiner}
        </p>

        <div className="mt-14">
          <h2 className="font-serif text-xl text-ink">{detail.whoHeading}</h2>
          <p className="mt-3 max-w-prose text-base leading-relaxed text-ink-light">
            {detail.whoText}
          </p>
        </div>

        <div className="mt-14">
          <h2 className="font-serif text-xl text-ink">{detail.howHeading}</h2>
          <ol className="mt-5 space-y-5">
            {detail.howSteps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="font-serif text-lg text-olive">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="max-w-prose text-base leading-relaxed text-ink-light">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14">
          <h2 className="font-serif text-xl text-ink">{detail.whyHeading}</h2>
          <p className="mt-3 max-w-prose text-base leading-relaxed text-ink-light">
            {detail.whyText}
          </p>
        </div>

        <div className="mt-14">
          <SelectionToggleButton slug={slug} />
        </div>
      </div>
    </article>
  );
}

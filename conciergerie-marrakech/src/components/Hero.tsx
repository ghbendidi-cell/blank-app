import { useLanguage } from "../i18n/LanguageContext";
import { VideoBackground } from "./VideoBackground";

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative flex h-[100svh] min-h-[560px] items-center justify-center text-cream">
      <div className="absolute inset-0">
        <VideoBackground
          videoSrc="videos/hero-riad-patio.mp4"
          poster="images/hero-riad-patio-poster.jpg"
          alt=""
          priority
          className="h-full w-full"
        />
      </div>
      <div className="absolute inset-0 bg-ink/55" aria-hidden="true" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">
          {t.hero.title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-cream/90 sm:text-lg">
          {t.hero.subtitle}
        </p>
        <button
          type="button"
          onClick={scrollToContact}
          className="mt-9 inline-block rounded-soft bg-olive px-7 py-3 text-sm tracking-wide text-cream transition-colors hover:bg-olive-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
        >
          {t.hero.cta}
        </button>
      </div>
    </section>
  );
}

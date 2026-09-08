import { useState } from "react";
import { usePrefersReducedMotion, useIsMobile } from "../hooks/useMediaPreferences";
import { useInView } from "../hooks/useInView";

interface VideoBackgroundProps {
  videoSrc: string;
  poster: string;
  alt: string;
  className?: string;
  /** Load immediately instead of waiting for the element to scroll into view. */
  priority?: boolean;
  /** On mobile, show the still poster instead of loading the video at all. */
  stillOnMobile?: boolean;
}

export function VideoBackground({
  videoSrc,
  poster,
  alt,
  className = "",
  priority = false,
  stillOnMobile = false,
}: VideoBackgroundProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const shouldShowVideo =
    !prefersReducedMotion &&
    !(stillOnMobile && isMobile) &&
    !videoFailed &&
    (priority || inView);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <img
        src={poster}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {shouldShowVideo && (
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={poster}
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

const MIN_RADIUS = 60; // px, tiny porthole at the start
const MAX_RADIUS = 2200; // px, big enough to clear any hero size
const RING_FADE_END = 0.6; // ring dissolves over the first 60% of the animation

export default function HeroBackground() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }
    let raf: number;
    let start: number | null = null;
    const duration = 2600;
    function tick(ts: number) {
      if (start === null) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      setProgress(t);
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const eased = easeOutCubic(progress);
  const rx = MIN_RADIUS + eased * (MAX_RADIUS - MIN_RADIUS);
  const ry = rx * 1.3;
  const ringOpacity = Math.max(0, 1 - progress / RING_FADE_END);
  const maskImage = `radial-gradient(ellipse ${rx}px ${ry}px at 50% 55%, transparent 0%, transparent 92%, rgba(15,22,20,1) 100%)`;

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      {/* Cabin wall: opaque, with a growing porthole cut out revealing the shared cloud
          background behind it, so the sky is always the exact same video as the rest of the site. */}
      <div
        className="absolute inset-0 bg-brand-dark"
        style={{ WebkitMaskImage: maskImage, maskImage, WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" }}
      />
      <div
        className="pointer-events-none absolute rounded-full border-[6px] border-white/40 shadow-[inset_0_0_40px_rgba(255,255,255,0.25)]"
        style={{
          width: rx * 2,
          height: ry * 2,
          left: `calc(50% - ${rx}px)`,
          top: `calc(55% - ${ry}px)`,
          opacity: ringOpacity,
        }}
      />
    </div>
  );
}

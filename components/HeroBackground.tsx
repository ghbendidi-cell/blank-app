"use client";

import { useEffect, useState } from "react";

export default function HeroBackground({ src, alt }: { src: string; alt: string }) {
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSettled(true);
      return;
    }
    const t = setTimeout(() => setSettled(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-ink">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-[9000ms] ease-out"
        style={{ transform: settled ? "scale(1)" : "scale(1.08)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/5 to-ink/50" />
    </div>
  );
}

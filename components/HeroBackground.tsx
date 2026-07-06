"use client";

import { useEffect, useState } from "react";

const SKY_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3FzLTlt28p4tBZh58xHOYeBE65G/hf_20260704_115952_95d371f7-9acc-44f5-bc3d-96ba654bd9cf.mp4";

export default function HeroBackground() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpen(true);
      return;
    }
    const raf = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-brand-dark">
      <video
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2600ms] ease-out"
        style={{ transform: open ? "scale(1)" : "scale(1.9)" }}
        src={SKY_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-[2600ms] ease-out"
        style={{
          opacity: open ? 0 : 1,
          background: "radial-gradient(ellipse 32% 42% at 50% 55%, transparent 55%, rgba(15,22,20,0.75) 100%)",
        }}
      />
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useCanRenderHeavyMotion } from "./hooks/useCanRenderHeavyMotion";
import ParallaxImage from "./animations/ParallaxImage";

const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });

export default function HeroBackground() {
  const canRenderHeavyMotion = useCanRenderHeavyMotion();

  return (
    <>
      <ParallaxImage
        src="/images/chefchaouen-maroc.jpg"
        alt="Ruelle de Chefchaouen, Maroc"
        className="absolute inset-0 h-full w-full"
        strength={60}
      />
      {canRenderHeavyMotion && (
        <div className="absolute inset-0">
          <HeroScene />
        </div>
      )}
    </>
  );
}

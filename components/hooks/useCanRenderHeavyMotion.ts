"use client";

import { useEffect, useState } from "react";

export function useCanRenderHeavyMotion() {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function evaluate() {
      setCanRender(desktopQuery.matches && !reducedMotionQuery.matches);
    }

    evaluate();
    desktopQuery.addEventListener("change", evaluate);
    reducedMotionQuery.addEventListener("change", evaluate);

    return () => {
      desktopQuery.removeEventListener("change", evaluate);
      reducedMotionQuery.removeEventListener("change", evaluate);
    };
  }, []);

  return canRender;
}

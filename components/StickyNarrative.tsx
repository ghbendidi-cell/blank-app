"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Eyebrow from "./ui/Eyebrow";

export interface NarrativeStep {
  title: string;
  text: string;
}

function StepContent({
  step,
  progress,
  start,
  end,
}: {
  step: NarrativeStep;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const span = end - start;
  const fadeIn = start + span * 0.2;
  const fadeOut = end - span * 0.2;
  const opacity = useTransform(progress, [start, fadeIn, fadeOut, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, fadeIn], [24, 0]);

  return (
    <motion.div style={{ opacity, y }} className="col-start-1 row-start-1">
      <h3 className="font-display text-3xl italic leading-tight text-ivory [text-wrap:balance] sm:text-5xl">
        {step.title}
      </h3>
      <p className="mt-4 max-w-md font-sans font-light text-ivory/75 sm:text-lg">{step.text}</p>
    </motion.div>
  );
}

export default function StickyNarrative({
  image,
  eyebrow,
  steps,
}: {
  image: string;
  eyebrow: string;
  steps: NarrativeStep[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} style={{ height: `${steps.length * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/20" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 lg:px-10">
          <div className="w-full max-w-lg">
            <Eyebrow tone="ivory" className="mb-4">
              {eyebrow}
            </Eyebrow>
            <div className="grid">
              {steps.map((step, index) => (
                <StepContent
                  key={step.title}
                  step={step}
                  progress={scrollYProgress}
                  start={index / steps.length}
                  end={(index + 1) / steps.length}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

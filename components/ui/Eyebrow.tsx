import type { ReactNode } from "react";

const TONE_CLASSES = {
  ink: "text-ink/70",
  accent: "text-accent",
  ivory: "text-ivory/80",
} as const;

export default function Eyebrow({
  children,
  number,
  tone = "ink",
  className = "",
}: {
  children: ReactNode;
  number?: string;
  tone?: keyof typeof TONE_CLASSES;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.28em] ${TONE_CLASSES[tone]} ${className}`}>
      {number && <span className="tabular-nums">{number} —</span>}
      {children}
    </span>
  );
}

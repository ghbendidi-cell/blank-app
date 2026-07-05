import type { ReactNode } from "react";

const TONE_CLASSES = {
  brand: "text-brand-dark",
  accent: "text-accent-dark",
  gold: "text-gold-dark",
  white: "text-white/85",
} as const;

export default function Eyebrow({
  children,
  tone = "accent",
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof TONE_CLASSES;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] ${TONE_CLASSES[tone]} ${className}`}>
      <span className="h-2 w-2 rounded-full bg-current" />
      {children}
    </span>
  );
}

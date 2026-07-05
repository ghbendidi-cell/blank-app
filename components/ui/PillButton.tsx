"use client";

import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

const TONE_VARIANTS = {
  brand: {
    solid: "bg-brand text-white hover:bg-brand-dark",
    outline: "border border-brand/40 text-brand-dark hover:bg-brand hover:text-white hover:border-brand",
  },
  accent: {
    solid: "bg-accent text-white hover:bg-accent-dark",
    outline: "border border-accent/40 text-accent-dark hover:bg-accent hover:text-white hover:border-accent",
  },
  white: {
    solid: "bg-white text-slate-900 hover:bg-white/90",
    outline: "border border-white/60 text-white hover:bg-white/15",
  },
  gold: {
    solid: "bg-gold text-hajj-dark hover:bg-gold-dark hover:text-white",
    outline: "border border-gold/50 text-gold hover:bg-gold hover:text-hajj-dark",
  },
} as const;

type Tone = keyof typeof TONE_VARIANTS;
type Variant = keyof (typeof TONE_VARIANTS)["brand"];

interface PillButtonProps {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  tone?: Tone;
  variant?: Variant;
  icon?: boolean;
  className?: string;
  children: ReactNode;
}

export default function PillButton({
  href,
  onClick,
  type = "button",
  tone = "accent",
  variant = "solid",
  icon = true,
  className = "",
  children,
}: PillButtonProps) {
  const classes = `group inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-sm font-semibold shadow-sm transition duration-200 hover:-translate-y-0.5 hover:-rotate-1 hover:scale-[1.03] hover:shadow-md active:scale-95 active:rotate-0 ${TONE_VARIANTS[tone][variant]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          className="transition-transform group-hover:translate-x-0.5"
        >
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  );

  if (href) {
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }
    const isExternal = href.startsWith("http");
    return (
      <a href={href} className={classes} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}

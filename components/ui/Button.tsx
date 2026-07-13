"use client";

import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

const TONE_VARIANTS = {
  dark: "border border-ink text-ink hover:bg-ink hover:text-ivory",
  light: "border border-ivory/70 text-ivory hover:bg-ivory hover:text-ink",
  terracotta: "border border-accent bg-accent text-ivory hover:bg-accent-dark hover:border-accent-dark",
} as const;

type Tone = keyof typeof TONE_VARIANTS;

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  tone?: Tone;
  icon?: boolean;
  className?: string;
  children: ReactNode;
}

export default function Button({
  href,
  onClick,
  type = "button",
  tone = "dark",
  icon = true,
  className = "",
  children,
}: ButtonProps) {
  const classes = `group inline-flex items-center gap-2.5 rounded-full px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${TONE_VARIANTS[tone]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          className="transition-transform duration-300 group-hover:translate-x-1"
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

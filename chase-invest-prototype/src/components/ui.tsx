import { useState, type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const styles: Record<Variant, string> = {
    primary: 'bg-chase-accent-strong text-white hover:bg-chase-accent-hover disabled:bg-[#E7C2B1]',
    secondary: 'bg-chase-accent-soft text-chase-accent-strong hover:bg-[#F6DDD1] disabled:opacity-50',
    ghost: 'bg-transparent text-chase-accent-strong hover:bg-chase-accent-soft disabled:opacity-50',
  };
  return (
    <button
      className={`w-full rounded-full px-5 py-3.5 text-[16px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-chase-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl bg-white shadow-card ${className}`}>{children}</div>;
}

/** Small grey tag that marks a number as an estimate or an assumption. */
export function Tag({ children, tone = 'grey' }: { children: ReactNode; tone?: 'grey' | 'amber' | 'blue' }) {
  const tones = {
    grey: 'bg-chase-bg text-chase-muted',
    amber: 'bg-amber-50 text-amber-800',
    blue: 'bg-chase-accent-soft text-chase-accent-strong',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function CapitalAtRisk({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
        <WarnIcon className="h-3 w-3" /> Capital at risk
      </span>
    );
  }
  return (
    <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-[13px] leading-snug text-amber-900">
      <WarnIcon className="mt-0.5 h-4 w-4 shrink-0" />
      <p>
        <strong>Capital at risk.</strong> The value of investments can go down as well as up, and you may get back
        less than you put in. Past performance is not a reliable indicator of future results.
      </p>
    </div>
  );
}

export function Disclosure({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl border border-chase-line bg-white">
      <button
        className="flex w-full items-center justify-between px-4 py-3.5 text-left text-[15px] font-semibold text-chase-accent-strong"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {title}
        <Chevron className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="animate-fadeIn border-t border-chase-line px-4 py-3">{children}</div>}
    </div>
  );
}

export function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex gap-1.5" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={step}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className={`h-1.5 flex-1 rounded-full ${i < step ? 'bg-chase-accent' : 'bg-chase-line'}`} />
      ))}
    </div>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${checked ? 'bg-chase-accent' : 'bg-[#C9D0DA]'}`}
    >
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-[22px]' : 'translate-x-0.5'}`}
      />
    </button>
  );
}

/** Generic placeholder brand mark (deliberately NOT the official Chase octagon). */
export function PlaceholderLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-label="Bank logo placeholder">
      <rect x="2" y="2" width="28" height="28" rx="9" fill="#D0805C" />
      <circle cx="16" cy="16" r="6.5" fill="none" stroke="white" strokeWidth="3" />
    </svg>
  );
}

export function JpmWordmark({ small = false }: { small?: boolean }) {
  return (
    <div className="text-center leading-none text-jpm-brown">
      <div className={`font-serif ${small ? 'text-[15px]' : 'text-[24px]'}`}>J.P. Morgan</div>
      <div className={`mt-1 tracking-[0.18em] ${small ? 'text-[8px]' : 'text-[10px]'}`}>PERSONAL INVESTING</div>
    </div>
  );
}

/* ---------- icons ---------- */

type IconProps = { className?: string };

export const WarnIcon = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);

export const Chevron = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ChevronRight = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const BackArrow = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export const CloseIcon = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const CheckIcon = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const ShieldIcon = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
  </svg>
);

export const WalletIcon = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 7H5a2 2 0 0 1 0-4h13v4M3 5v14a2 2 0 0 0 2 2h15V7" />
    <path d="M16 14h.01" />
  </svg>
);

export const GrowthIcon = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 17 6-6 4 4 8-8" />
    <path d="M14 7h7v7" />
  </svg>
);

export const UserIcon = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
  </svg>
);

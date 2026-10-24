import { useEffect, useRef, type ReactNode, type RefObject } from 'react';
import { useStore, type Screen } from '../state/store';
import { PlaceholderLogo } from './ui';

/** 390×844 phone frame on desktop; full-screen on a real phone (< 440px wide). */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto h-[100dvh] w-full overflow-hidden bg-chase-bg min-[440px]:h-[844px] min-[440px]:w-[390px] min-[440px]:rounded-[52px] min-[440px]:shadow-[0_0_0_11px_#111,0_0_0_13px_#333,0_30px_60px_rgba(0,0,0,0.35)]">
      <div className="pointer-events-none absolute left-1/2 top-[11px] z-50 hidden h-[34px] w-[120px] -translate-x-1/2 rounded-full bg-black min-[440px]:block" />
      {children}
    </div>
  );
}

export function StatusBar({ dark = false, time = '09:41' }: { dark?: boolean; time?: string }) {
  const color = dark ? 'text-white' : 'text-black';
  return (
    <div className={`flex h-[50px] shrink-0 items-end justify-between px-8 pb-1.5 text-[15px] font-semibold ${color}`}>
      <span>{time}</span>
      <span className="flex items-center gap-1.5">
        <svg width="18" height="11" viewBox="0 0 18 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="5" y="5" width="3" height="6" rx="1" /><rect x="10" y="2.5" width="3" height="8.5" rx="1" /><rect x="15" y="0" width="3" height="11" rx="1" /></svg>
        <svg width="16" height="11" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.5c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .7 10.4 10.4 0 0 0 .8 3.6L2 4.9a8.6 8.6 0 0 1 6-2.4Zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.6 6.6 0 0 0 8 4.3a6.6 6.6 0 0 0-4.6 1.8l1.2 1.3A4.9 4.9 0 0 1 8 6.1Zm0 3.5L9.9 7.7a2.8 2.8 0 0 0-3.8 0L8 9.6Z" /></svg>
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none"><rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="currentColor" opacity="0.4" /><rect x="2" y="2" width="15" height="8" rx="1.8" fill="currentColor" /><rect x="23.5" y="4" width="1.8" height="4" rx="0.9" fill="currentColor" opacity="0.4" /></svg>
      </span>
    </div>
  );
}

/** iOS-style push notification, shown over whatever screen is open. */
export function PushNotification() {
  const { state, dispatch } = useStore();
  if (!state.notificationVisible) return null;
  return (
    <div className="absolute inset-x-2 top-[54px] z-40 animate-slideDown">
      <div className="flex w-full items-start gap-3 rounded-[22px] bg-white/85 p-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl">
        <button className="flex flex-1 items-start gap-3 text-left" onClick={() => dispatch({ type: 'OPEN_NOTIFICATION' })}>
          <PlaceholderLogo size={38} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between text-[13px] text-[#666]">
              <span className="font-semibold uppercase tracking-wide">Chase</span>
              <span>now</span>
            </div>
            <div className="text-[15px] font-semibold text-black">Your monthly money check is ready</div>
            <div className="text-[14px] leading-snug text-[#333]">
              {state.monthlyPlan?.active
                ? 'Your monthly plan is ready to review. Nothing happens until you confirm.'
                : 'See how your money splits into living money, safety buffer and spare cash.'}
            </div>
          </div>
        </button>
        <button
          className="-mr-1 -mt-1 rounded-full p-1 text-[#888]"
          aria-label="Dismiss notification"
          onClick={() => dispatch({ type: 'DISMISS_NOTIFICATION' })}
        >
          ×
        </button>
      </div>
    </div>
  );
}

const TABS: { label: string; icon: ReactNode; screen?: Screen }[] = [
  {
    label: 'Home',
    screen: 'home',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8.5Z" /></svg>,
  },
  {
    label: 'Payments',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="M8 10h8l-2.5-2.5M16 14H8l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  {
    label: 'Discover',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" strokeLinejoin="round" /></svg>,
  },
  {
    label: 'Support',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 21a9 9 0 1 0-8-4.9L3 21l4.9-1A9 9 0 0 0 12 21Z" strokeLinejoin="round" /><path d="M8.5 13.5c1.8 2 5.2 2 7 0" strokeLinecap="round" /></svg>,
  },
];

export function BottomTabBar() {
  const { state, dispatch } = useStore();
  return (
    <nav className="flex shrink-0 justify-around border-t border-chase-line bg-white pb-6 pt-2">
      {TABS.map((t) => {
        const active = t.screen === 'home' && (state.screen === 'home' || state.screen === 'jpm');
        return (
          <button
            key={t.label}
            className={`flex w-20 flex-col items-center gap-0.5 text-[12px] ${active ? 'text-chase-accent-strong' : 'text-chase-muted'} `}
            onClick={() =>
              t.screen
                ? dispatch({ type: 'NAVIGATE', screen: t.screen })
                : dispatch({ type: 'SHOW_TOAST', message: `${t.label} isn’t part of this prototype` })
            }
          >
            {t.icon}
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Bottom sheet that stays inside the phone frame. Traps focus, closes on Escape and returns
 * focus to whatever opened it. `fullScreen` makes it a near-full-height sheet whose body is
 * the scroll container (exposed through `bodyRef`).
 */
export function BottomSheet({
  open,
  onClose,
  children,
  label,
  labelledBy,
  describedBy,
  fullScreen = false,
  bodyRef,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  label?: string;
  labelledBy?: string;
  describedBy?: string;
  fullScreen?: boolean;
  bodyRef?: RefObject<HTMLDivElement>;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const sheetRef = bodyRef ?? innerRef;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const sheet = sheetRef.current;
    const opener = document.activeElement as HTMLElement | null;
    (sheet?.querySelector<HTMLElement>(FOCUSABLE) ?? sheet)?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !sheet) return;
      const items = Array.from(sheet.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      opener?.focus?.({ preventScroll: true });
    };
  }, [open, sheetRef]);

  if (!open) return null;
  return (
    <div
      className="absolute inset-0 z-30 flex flex-col justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={labelledBy ? undefined : label}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
    >
      <button className="absolute inset-0 animate-fadeIn bg-black/40" aria-label="Close" tabIndex={-1} onClick={onClose} />
      <div
        ref={sheetRef}
        tabIndex={-1}
        className={`relative animate-slideUp overflow-y-auto rounded-t-[28px] bg-white outline-none ${
          fullScreen ? 'h-[calc(100%-44px)]' : 'max-h-[90%] px-5 pb-8 pt-3'
        }`}
      >
        {!fullScreen && <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-chase-line" />}
        {children}
      </div>
    </div>
  );
}

/** Small message for buttons that are outside the prototype's scope. */
export function Toast() {
  const { state, dispatch } = useStore();
  useEffect(() => {
    if (!state.toast) return;
    const t = setTimeout(() => dispatch({ type: 'HIDE_TOAST' }), 2600);
    return () => clearTimeout(t);
  }, [state.toast, dispatch]);
  if (!state.toast) return null;
  return (
    <div className="pointer-events-none absolute inset-x-6 bottom-28 z-40 flex justify-center">
      <div className="animate-fadeIn rounded-full bg-chase-ink/90 px-4 py-2.5 text-center text-[13px] text-white shadow-lg">{state.toast}</div>
    </div>
  );
}

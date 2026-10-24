import { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  END_PROGRESS,
  GROWTH_COPY,
  SCROLL_DEPTH_MILESTONES,
  SCROLL_TRACK_SCREENS,
} from '../config/growthStory';
import { track } from '../logic/analytics';
import { formatMoney, roundForDisplay } from '../logic/format';
import {
  activeCaptionIndex,
  buildCaptions,
  describeProjection,
  progressToYear,
  projectGrowth,
  valueAtYear,
  type GrowthInputs,
  type GrowthProjection,
} from '../logic/growth';
import { BottomSheet } from './PhoneChrome';
import { Button, CloseIcon } from './ui';

export interface GrowthStoryModalProps extends Omit<GrowthInputs, 'initialAmount'> {
  initialAmount: number;
  currency?: string;
  onClose: () => void;
  onLearnMore: () => void;
  /** Where the pop-up was opened from, sent with modal_viewed. */
  source?: 'app_open' | 'savings_card';
  /** Overrides the prefers-reduced-motion media query (used by tests). */
  reducedMotion?: boolean;
}

/* ---------- chart geometry (SVG user units) ---------- */
const W = 340;
const H = 210;
const PAD = { left: 10, right: 74, top: 20, bottom: 26 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;
const SAMPLES_PER_YEAR = 8;

function makeScales(projection: GrowthProjection) {
  const { points, inputs } = projection;
  const max = Math.max(1, ...points.map((p) => Math.max(p.cash, p.invested)));
  const yMax = max * 1.12; // y axis starts at 0: no truncated axis exaggerating the gap
  return {
    x: (year: number) => PAD.left + (year / inputs.years) * PLOT_W,
    y: (value: number) => PAD.top + PLOT_H * (1 - value / yMax),
  };
}

type Scales = ReturnType<typeof makeScales>;

function linePoints(projection: GrowthProjection, s: Scales, key: 'cash' | 'invested'): [number, number][] {
  const n = projection.inputs.years * SAMPLES_PER_YEAR;
  return Array.from({ length: n + 1 }, (_, k) => {
    const t = k / SAMPLES_PER_YEAR;
    return [s.x(t), s.y(valueAtYear(projection.points, key, t))];
  });
}

const toPath = (pts: [number, number][]) =>
  pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`).join('');

/** Everything the screen shows at a given scroll progress. Pure: used for first render and every frame. */
function frameAt(progress: number, projection: GrowthProjection, s: Scales, captionYears: number[]) {
  const year = progressToYear(progress, projection.inputs.years);
  const cash = valueAtYear(projection.points, 'cash', year);
  const invested = valueAtYear(projection.points, 'invested', year);
  const p = Math.max(progress, 0);
  return {
    year,
    yearLabel: GROWTH_COPY.yearLabel(Math.floor(year + 1e-9)),
    cash,
    invested,
    captionIndex: activeCaptionIndex(captionYears.map((y) => ({ year: y, text: '' })), year),
    // Reveals the lines left to right by scaling a clip rectangle about the plot's left edge.
    clip: `matrix(${p} 0 0 1 ${PAD.left * (1 - p)} 0)`,
    cashDot: `translate(${s.x(year)} ${s.y(cash)})`,
    investedDot: `translate(${s.x(year)} ${s.y(invested)})`,
    progressBar: `scaleX(${p})`,
    end: progress >= END_PROGRESS,
  };
}

function usePrefersReducedMotion(override?: boolean) {
  const [reduced, setReduced] = useState(
    () => override ?? (typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches),
  );
  useEffect(() => {
    if (override !== undefined || typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [override]);
  return override ?? reduced;
}

export function GrowthStoryModal({
  initialAmount,
  currency = 'GBP',
  monthlyContribution,
  years,
  cashAnnualRate,
  investAnnualRate,
  onClose,
  onLearnMore,
  source = 'savings_card',
  reducedMotion,
}: GrowthStoryModalProps) {
  const reduced = usePrefersReducedMotion(reducedMotion);
  const titleId = useId();
  const summaryId = useId();
  const clipId = useId().replace(/:/g, '');

  const fmt = useMemo(() => (n: number) => formatMoney(n, currency), [currency]);
  const projection = useMemo(
    () => projectGrowth({ initialAmount, monthlyContribution, years, cashAnnualRate, investAnnualRate }),
    [initialAmount, monthlyContribution, years, cashAnnualRate, investAnnualRate],
  );
  const scales = useMemo(() => makeScales(projection), [projection]);
  const captions = useMemo(() => buildCaptions(projection, fmt), [projection, fmt]);
  const captionYears = useMemo(() => captions.map((c) => c.year), [captions]);
  const paths = useMemo(() => {
    const cash = linePoints(projection, scales, 'cash');
    const invested = linePoints(projection, scales, 'invested');
    // The band between the lines: invested forwards, then cash backwards.
    return { cash: toPath(cash), invested: toPath(invested), gap: `${toPath([...invested, ...[...cash].reverse()])}Z` };
  }, [projection, scales]);
  const n = projection.inputs.years;
  const endX = scales.x(n);
  const endCashY = scales.y(projection.finalCash);
  const endInvY = scales.y(projection.finalInvested);
  const gapLabel = `${projection.gap >= 0 ? '+' : '−'}\u2060${fmt(Math.abs(roundForDisplay(projection.gap)))}`;

  const first = frameAt(reduced ? 1 : 0, projection, scales, captionYears);

  /* ---------- refs for per-frame DOM updates (no React re-render while scrolling) ---------- */
  const bodyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<SVGRectElement>(null);
  const cashDotRef = useRef<SVGGElement>(null);
  const investedDotRef = useRef<SVGGElement>(null);
  const gapRef = useRef<SVGGElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);
  const cashNumRef = useRef<HTMLSpanElement>(null);
  const investedNumRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const captionRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  // Once per opening (the ref also survives StrictMode's double-run of effects in development).
  const viewedRef = useRef(false);
  useEffect(() => {
    if (viewedRef.current) return;
    viewedRef.current = true;
    track('modal_viewed', { modal: 'what_you_could_have_earned', source, reduced_motion: reduced, initial_amount: projection.inputs.initialAmount });
  }, []);

  useEffect(() => {
    if (reduced) return;
    const body = bodyRef.current;
    const trackEl = trackRef.current;
    if (!body || !trackEl) return;

    const fired = new Set<number>();
    let hintGone = false;
    let raf = 0;
    const last = { year: '', cash: '', invested: '', caption: -1, end: false };

    const sizeTrack = () => {
      trackEl.style.height = `${body.clientHeight * SCROLL_TRACK_SCREENS}px`;
    };

    const apply = () => {
      raf = 0;
      const max = body.scrollHeight - body.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, body.scrollTop / max)) : 0;
      const f = frameAt(progress, projection, scales, captionYears);

      clipRef.current?.setAttribute('transform', f.clip);
      cashDotRef.current?.setAttribute('transform', f.cashDot);
      investedDotRef.current?.setAttribute('transform', f.investedDot);
      if (progressRef.current) progressRef.current.style.transform = f.progressBar;

      // Text: only touch the DOM when the visible string changes.
      const cash = fmt(Math.round(f.cash));
      const invested = fmt(Math.round(f.invested));
      if (cash !== last.cash && cashNumRef.current) cashNumRef.current.textContent = last.cash = cash;
      if (invested !== last.invested && investedNumRef.current) investedNumRef.current.textContent = last.invested = invested;
      if (f.yearLabel !== last.year && yearRef.current) yearRef.current.textContent = last.year = f.yearLabel;

      if (f.captionIndex !== last.caption) {
        captionRefs.current.forEach((el, i) => {
          if (!el) return;
          el.style.opacity = i === f.captionIndex ? '1' : '0';
          el.style.transform = i === f.captionIndex ? 'translateY(0)' : 'translateY(6px)';
        });
        last.caption = f.captionIndex;
      }

      if (f.end !== last.end) {
        if (gapRef.current) gapRef.current.style.opacity = f.end ? '1' : '0';
        if (footerRef.current) footerRef.current.dataset.visible = String(f.end);
        last.end = f.end;
      }

      if (!hintGone && progress > 0.01 && hintRef.current) {
        hintRef.current.style.opacity = '0';
        hintGone = true;
      }

      for (const m of SCROLL_DEPTH_MILESTONES) {
        if (!fired.has(m) && progress * 100 >= m - 0.5) {
          fired.add(m);
          track('scroll_depth', { modal: 'what_you_could_have_earned', percent: m });
        }
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onResize = () => {
      sizeTrack();
      onScroll();
    };

    sizeTrack();
    apply();
    body.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      body.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced, projection, scales, captionYears, fmt]);

  const dismiss = (method: string) => {
    track('dismissed', { modal: 'what_you_could_have_earned', method });
    onClose();
  };
  const learnMore = () => {
    track('learn_more_clicked', { modal: 'what_you_could_have_earned' });
    onLearnMore();
  };

  const legendSwatch = (dashed: boolean) => (
    <svg width="22" height="8" aria-hidden className="shrink-0">
      <line x1="1" y1="4" x2="21" y2="4" strokeWidth="3" strokeLinecap="round"
        className={dashed ? 'stroke-chase-muted' : 'stroke-growth'} strokeDasharray={dashed ? '4 4' : undefined} />
    </svg>
  );

  const chart = (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible" aria-hidden data-testid="growth-chart">
      <defs>
        <clipPath id={clipId}>
          <rect ref={clipRef} x="0" y="0" width={PAD.left + PLOT_W + 3} height={H} transform={first.clip} />
        </clipPath>
      </defs>
      {/* axis */}
      <line x1={PAD.left} x2={PAD.left + PLOT_W} y1={PAD.top + PLOT_H} y2={PAD.top + PLOT_H} className="stroke-chase-line" strokeWidth="1" />
      {[0, Math.round(n / 2), n].map((t) => (
        <text key={t} x={scales.x(t)} y={H - 6} textAnchor="middle" className="fill-chase-muted text-[10px]">
          {t === n ? `${t} yrs` : t}
        </text>
      ))}

      {/* gap highlight, shown at the end */}
      <g ref={gapRef} style={{ opacity: first.end ? 1 : 0, transition: 'opacity 300ms ease-out' }} data-testid="growth-gap">
        <path d={paths.gap} className="fill-growth" fillOpacity="0.08" />
        {Math.abs(endInvY - endCashY) > 8 && (
          <>
            <path
              d={`M${endX - 10} ${endInvY + 4} h-4 V${endCashY - 4} h4`}
              fill="none"
              className="stroke-growth"
              strokeWidth="1.5"
            />
            <text x={endX - 18} y={(endInvY + endCashY) / 2 + 4} textAnchor="end" className="fill-growth-strong text-[13px] font-semibold">
              {gapLabel}
            </text>
          </>
        )}
      </g>

      {/* lines, revealed by the clip */}
      <g clipPath={`url(#${clipId})`}>
        <path d={paths.cash} fill="none" className="stroke-chase-muted" strokeWidth="2.5" strokeDasharray="6 5" strokeLinecap="round" />
        <path d={paths.invested} fill="none" className="stroke-growth" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* markers with direct labels, so colour is not the only signal */}
      <g ref={cashDotRef} transform={first.cashDot}>
        <circle r="4.5" className="fill-white stroke-chase-muted" strokeWidth="2.5" />
        <text x="8" y="15" className="fill-chase-muted text-[11px] font-semibold">{GROWTH_COPY.cashLabel}</text>
      </g>
      <g ref={investedDotRef} transform={first.investedDot}>
        <circle r="5" className="fill-growth" />
        <text x="8" y="-9" className="fill-growth-strong text-[11px] font-semibold">{GROWTH_COPY.investedLabel}</text>
      </g>
    </svg>
  );

  const footer = (
    <div
      ref={footerRef}
      data-visible={String(first.end)}
      className={
        reduced
          ? 'space-y-3 px-5 pb-8 pt-2'
          : 'sticky bottom-0 z-10 translate-y-4 space-y-3 bg-white px-5 pb-8 pt-3 opacity-0 transition duration-300 pointer-events-none focus-within:pointer-events-auto focus-within:translate-y-0 focus-within:opacity-100 data-[visible=true]:pointer-events-auto data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100'
      }
    >
      <p className="rounded-xl bg-chase-bg p-3 text-[12px] leading-snug text-chase-muted" data-testid="growth-disclaimer">
        {GROWTH_COPY.disclaimer}
      </p>
      <Button onClick={learnMore} className="!bg-growth-strong hover:!bg-growth-hover focus-visible:!ring-growth-strong">
        {GROWTH_COPY.learnMore}
      </Button>
      <Button
        variant="ghost"
        onClick={() => dismiss('maybe_later')}
        className="!text-growth-strong hover:!bg-[#FBEFE9] focus-visible:!ring-growth-strong"
      >
        {GROWTH_COPY.maybeLater}
      </Button>
    </div>
  );

  return (
    <BottomSheet open onClose={() => dismiss('escape_or_backdrop')} labelledBy={titleId} describedBy={summaryId} fullScreen bodyRef={bodyRef}>
      <header className="sticky top-0 z-20 flex items-center justify-between bg-white px-5 pb-2 pt-4">
        <h2 id={titleId} className="text-[18px] font-semibold text-chase-ink">{GROWTH_COPY.title}</h2>
        <button
          onClick={() => dismiss('close_button')}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-chase-bg text-chase-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-growth-strong"
          aria-label={GROWTH_COPY.close}
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </header>

      <p id={summaryId} className="sr-only">
        {describeProjection(projection, fmt)} {GROWTH_COPY.disclaimer}
      </p>

      {/* The track is the scroll distance. The chart panel is pinned to its top, the footer to its bottom. */}
      <div ref={trackRef} className={`flex flex-col ${reduced ? '' : 'h-[3200px] justify-between'}`} data-testid="growth-track">
        <div className={`${reduced ? '' : 'sticky top-[64px]'} px-5 pb-4`}>
          <div className="h-1 overflow-hidden rounded-full bg-chase-line" aria-hidden>
            <div ref={progressRef} className="h-full origin-left bg-growth" style={{ transform: first.progressBar }} />
          </div>

          <div className="mt-4" aria-hidden>
            <span ref={yearRef} className="text-[40px] font-semibold leading-none tabular-nums text-chase-ink">
              {first.yearLabel}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3" aria-hidden>
            <div>
              <div className="flex items-center gap-2 text-[13px] text-chase-muted">{legendSwatch(true)}{GROWTH_COPY.cashLabel}</div>
              <span ref={cashNumRef} className="mt-0.5 block text-[26px] font-semibold tabular-nums text-chase-ink">
                {fmt(Math.round(first.cash))}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[13px] text-chase-muted">{legendSwatch(false)}{GROWTH_COPY.investedLabel}</div>
              <span ref={investedNumRef} className="mt-0.5 block text-[26px] font-semibold tabular-nums text-growth">
                {fmt(Math.round(first.invested))}
              </span>
            </div>
          </div>

          <div className="mt-3">{chart}</div>

          {reduced ? (
            <ol className="mt-3 space-y-2" data-testid="growth-captions">
              {captions.map((c) => (
                <li key={c.year} className="text-[15px] leading-snug text-chase-ink">
                  <span className="mr-2 text-[12px] font-semibold text-chase-muted">{GROWTH_COPY.yearLabel(c.year)}</span>
                  {c.text}
                </li>
              ))}
            </ol>
          ) : (
            <div className="relative mt-3 h-[52px]" aria-hidden data-testid="growth-captions">
              {captions.map((c, i) => (
                <p
                  key={c.year}
                  ref={(el) => {
                    captionRefs.current[i] = el;
                  }}
                  className="absolute inset-x-0 top-0 text-[16px] leading-snug text-chase-ink transition duration-300"
                  style={{ opacity: i === first.captionIndex ? 1 : 0, transform: i === first.captionIndex ? 'translateY(0)' : 'translateY(6px)' }}
                >
                  {c.text}
                </p>
              ))}
            </div>
          )}

          {!reduced && (
            <div ref={hintRef} className="mt-2 flex flex-col items-center text-[13px] text-chase-muted transition-opacity duration-300" aria-hidden>
              {GROWTH_COPY.scrollHint(n)}
              <svg className="mt-1 h-4 w-4 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </div>
          )}
        </div>
        {footer}
      </div>
    </BottomSheet>
  );
}

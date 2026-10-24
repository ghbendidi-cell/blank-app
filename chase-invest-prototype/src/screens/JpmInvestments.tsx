import type { ReactNode } from 'react';
import type { GuideId } from '../data/guides';
import { gbp } from '../logic/buckets';
import { totalInvested, useStore } from '../state/store';
import { StatusBar } from '../components/PhoneChrome';
import { BackArrow, CapitalAtRisk, ChevronRight, ShieldIcon, Tag } from '../components/ui';

const SAND = '#D9B999';

/** J.P. Morgan Personal Investing "Investments" page, with Safety Buffer + Invest added on top. */
export function JpmInvestments() {
  const { state, dispatch } = useStore();
  const invested = totalInvested(state);
  const openGuide = (guideId: GuideId) => dispatch({ type: 'OPEN_GUIDE', guideId });
  const openFeature = () =>
    dispatch({ type: 'NAVIGATE', screen: state.onboarded && state.monthIndex > 0 ? 'summary' : 'onboarding' });

  return (
    <div className="flex h-full flex-col bg-[#F2F3F6]">
      <div className="flex-1 overflow-y-auto">
        <div className="bg-jpm-cream">
          <StatusBar time="15:20" />
          <div className="relative px-5 pb-12 pt-4">
            <button
              onClick={() => {
                dispatch({ type: 'SET_HOME_TAB', tab: 'invest' });
                dispatch({ type: 'NAVIGATE', screen: 'home' });
              }}
              className="absolute left-5 top-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#EEEFF3]"
              aria-label="Back"
            >
              <BackArrow className="h-6 w-6 text-chase-ink" />
            </button>
            <div className="pt-10">
              <div className="text-center leading-none text-jpm-brown">
                <div className="font-serif text-[40px] tracking-tight">J.P.Morgan</div>
                <div className="mt-3 text-[15px] tracking-[0.12em]">PERSONAL INVESTING</div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-2 bg-jpm-green" />

        <div className="px-4 pb-8 pt-7">
          <h1 className="text-center text-[24px] font-medium text-chase-ink">Investments</h1>
          <p className="mx-auto mt-3 max-w-[330px] text-center text-[18px] leading-relaxed text-[#5B6675]">
            Make more informed financial decisions, with expert support and an intuitive digital experience.
          </p>

          <div className="mt-6 space-y-4">
            {invested > 0 && (
              <div className="rounded-3xl bg-white p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-chase-muted">Your investments</span>
                  <CapitalAtRisk compact />
                </div>
                <div className="mt-1 text-[26px] font-semibold text-chase-ink">{gbp(invested, 2)}</div>
              </div>
            )}

            {/* The new feature, presented like the existing product cards. */}
            <ProductCard
              icon={<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chase-accent-soft"><ShieldIcon className="h-7 w-7 text-chase-accent-strong" /></div>}
              title={<span className="flex items-center gap-2">Safety Buffer + Invest <Tag tone="blue">New</Tag></span>}
              text={
                state.onboarded
                  ? 'See this month’s money check: living money, safety buffer and spare money.'
                  : 'Keep a safety buffer in cash, then invest only your spare money. Takes a minute.'
              }
              onClick={openFeature}
              highlight
            />
            <ProductCard icon={<IsaIcon />} title="ISAs" text="A range of ISAs to invest for your long-term goals with tax-free returns." onClick={() => openGuide('isa')} />
            <ProductCard icon={<GiaIcon />} title="General Investment Account" text="Invest beyond your ISA allowance with no contribution limits, but you'll pay tax on any returns." onClick={() => openGuide('gia')} />
            <ProductCard icon={<PensionIcon />} title="Personal Pension" text="Invest tax-efficiently for your retirement, with 20% tax relief on contributions." onClick={() => openGuide('pension')} />

            <button onClick={() => openGuide('consultation')} className="block w-full rounded-3xl border border-chase-line bg-white p-5 text-left">
              <div className="flex gap-3">
                <div className="flex-1">
                  <h2 className="text-[19px] font-medium leading-snug text-chase-ink">Book your free investment consultation</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#5B6675]">
                    Speak to J.P. Morgan Personal Investing's expert team to discuss your investment strategy and options, and see if you're making the most of your money.
                  </p>
                  <span className="mt-3 block text-[15px] font-semibold text-chase-accent-strong">Book a call</span>
                </div>
                <CalendarIcon />
              </div>
            </button>
            <div className="mx-1">
              <CapitalAtRisk />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ icon, title, text, onClick, highlight = false }: { icon: ReactNode; title: ReactNode; text: string; onClick: () => void; highlight?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-3xl bg-white px-5 py-6 text-left ${highlight ? 'ring-2 ring-chase-accent' : ''}`}
    >
      <span className="w-16 shrink-0">{icon}</span>
      <span className="flex-1">
        <span className="block text-[20px] font-medium leading-tight text-chase-ink">{title}</span>
        <span className="mt-1.5 block text-[15px] leading-relaxed text-[#5B6675]">{text}</span>
      </span>
      <ChevronRight className="h-5 w-5 shrink-0 text-chase-ink" />
    </button>
  );
}

const Chart = () => (
  <>
    <rect x="2" y="12" width="38" height="24" fill={SAND} />
    <path d="M4 30 9 24 13 28 18 20 23 27 28 19 33 25 38 21" stroke="white" strokeWidth="1.6" fill="none" />
  </>
);

const IsaIcon = () => (
  <svg width="56" height="44" viewBox="0 0 56 44" aria-hidden>
    <Chart />
    <circle cx="40" cy="12" r="7" fill="white" stroke="#3B2A1A" strokeWidth="1.5" />
    <path d="M40 8v8M36 12h8" stroke="#3B2A1A" strokeWidth="1.5" />
  </svg>
);

const GiaIcon = () => (
  <svg width="56" height="44" viewBox="0 0 56 44" aria-hidden>
    <Chart />
  </svg>
);

const PensionIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden>
    <rect x="12" y="6" width="22" height="20" rx="3" fill={SAND} />
    <path d="M18 9v15M23 9v15M28 9v15" stroke="white" strokeWidth="1.6" />
    <rect x="6" y="26" width="34" height="6" rx="1.5" fill={SAND} />
    <rect x="10" y="32" width="4" height="12" fill={SAND} />
    <rect x="32" y="32" width="4" height="12" fill={SAND} />
  </svg>
);

const CalendarIcon = () => (
  <svg className="mt-10 shrink-0" width="64" height="64" viewBox="0 0 64 64" aria-hidden>
    <rect x="3" y="9" width="58" height="52" rx="4" fill="white" stroke="#3B2A1A" strokeWidth="1.5" />
    <rect x="9" y="14" width="46" height="8" fill={SAND} />
    <rect x="16" y="4" width="5" height="12" rx="1" fill="white" stroke="#3B2A1A" strokeWidth="1.5" />
    <rect x="43" y="4" width="5" height="12" rx="1" fill="white" stroke="#3B2A1A" strokeWidth="1.5" />
    <rect x="9" y="27" width="46" height="28" fill={SAND} />
    {[0, 1, 2].map((c) => [0, 1].map((r) => <rect key={`${c}${r}`} x={12 + c * 14} y={30 + r * 12} width="11" height="9" fill="white" />))}
  </svg>
);

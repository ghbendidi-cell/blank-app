import { useState } from 'react';
import { approx, gbp, type BucketAssumptions, type BucketResult } from '../logic/buckets';
import { selectBuckets } from '../state/selectors';
import { monthLabel, totalCash, totalInvested, useStore } from '../state/store';
import { StatusBar, BottomSheet } from '../components/PhoneChrome';
import { BackArrow, Button, Card, Disclosure, GrowthIcon, ShieldIcon, Tag, WalletIcon } from '../components/ui';
import { ConfirmSheet } from './ConfirmSheet';
import { RISK_OPTIONS } from './Onboarding';

export function MonthlySummary() {
  const { state, dispatch } = useStore();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [assumptionsOpen, setAssumptionsOpen] = useState(false);
  const b = selectBuckets(state);
  const home = () => dispatch({ type: 'NAVIGATE', screen: 'home' });

  if (!b) {
    return (
      <div className="flex h-full flex-col bg-white">
        <StatusBar />
        <div className="flex flex-1 flex-col justify-center px-8 text-center">
          <h1 className="text-[22px] font-semibold">Answer 6 quick questions first</h1>
          <p className="mt-2 text-chase-muted">We need them to work out your safety buffer.</p>
        </div>
        <div className="space-y-2 px-6 pb-8">
          <Button onClick={() => dispatch({ type: 'NAVIGATE', screen: 'onboarding' })}>Start</Button>
          <Button variant="ghost" onClick={home}>Not now</Button>
        </div>
      </div>
    );
  }

  const risk = RISK_OPTIONS.find((r) => r.id === state.answers.risk);
  const cash = totalCash(state);
  const canInvest = b.suggestedInvest > 0;

  return (
    <div className="relative flex h-full flex-col bg-chase-bg">
      <div className="flex-1 overflow-y-auto">
        <StatusBar />
        <div className="flex items-center gap-2 px-4 pb-2 pt-1">
          <button onClick={home} className="rounded-full p-2 hover:bg-white" aria-label="Back to home">
            <BackArrow className="h-5 w-5" />
          </button>
          <div>
            <div className="text-[13px] text-chase-muted">{monthLabel(state.monthIndex)}</div>
            <h1 className="text-[20px] font-semibold text-chase-ink">Your monthly money check</h1>
          </div>
        </div>

        <div className="space-y-3 px-4 pb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between text-[13px] text-chase-muted">
              <span>Cash across your Chase accounts</span>
              <Tag>Mock data</Tag>
            </div>
            <div className="mt-0.5 text-[24px] font-semibold text-chase-ink">{gbp(cash)}</div>
            <SplitBar b={b} cash={cash} />
            <p className="mt-2 text-[12px] text-chase-muted">All amounts below are estimates, based on your answers.</p>
          </Card>

          <BucketRow
            icon={<WalletIcon className="h-5 w-5" />}
            color="bg-[#0B2A5B]"
            title="Living money"
            sub={`About ${fmtMonths(b.livingMonthsUsed)} of spending${b.dependantsCounted ? ', adjusted for dependants' : ''}`}
            amount={b.livingMoney}
            badge="Stays in cash"
          />
          <BucketRow
            icon={<ShieldIcon className="h-5 w-5" />}
            color="bg-[#117ACA]"
            title="Safety buffer"
            sub={`${fmtMonths(b.bufferMonthsUsed)} of spending${b.dependantsCounted ? ` (${state.assumptions.bufferBaseMonths} + ${b.dependantsCounted} for dependants)` : ''}`}
            amount={b.safetyBuffer}
            badge="Stays in cash"
            action={{ label: 'Change', onClick: () => setAssumptionsOpen(true) }}
          />

          {b.aboveBuffer < 0 ? (
            <Card className="p-5">
              <h2 className="text-[17px] font-semibold text-chase-ink">Nothing to invest this month</h2>
              <p className="mt-1 text-[14px] leading-snug text-chase-muted">
                Your cash is {approx(-b.aboveBuffer)} below your living money and safety buffer. Your money stays where it is, and we'll check again next month.
              </p>
            </Card>
          ) : (
            <Card className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-chase-sky text-chase-blue">
                    <GrowthIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[16px] font-semibold text-chase-ink">Spare money</div>
                    <div className="text-[12px] text-chase-muted">{spareReason(b)}</div>
                  </div>
                </div>
                <div className="whitespace-nowrap text-right text-[16px] font-semibold text-chase-ink">{approx(b.spareMoney)}</div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-chase-sky p-3">
                  <div className="text-[12px] text-chase-navy">Invest ({state.answers.investPct}% target)</div>
                  <div className="text-[17px] font-semibold text-chase-blue">{approx(b.suggestedInvest)}</div>
                </div>
                <div className="rounded-xl bg-chase-bg p-3">
                  <div className="text-[12px] text-chase-muted">Keep in cash</div>
                  <div className="text-[17px] font-semibold text-chase-ink">{approx(b.keepInCash)}</div>
                </div>
              </div>
              {b.belowMinimum && (
                <p className="mt-2 text-[12px] text-chase-muted">
                  The amount to invest is below the {gbp(state.assumptions.minimumInvestment)} minimum, so we're not suggesting anything this month.
                </p>
              )}
              {!canInvest && !b.belowMinimum && b.spareMoney > 0 && totalInvested(state) > 0 && (
                <p className="mt-2 text-[12px] text-chase-muted">You've already invested your chosen share, so there's nothing new to invest.</p>
              )}
            </Card>
          )}

          <Disclosure title="How we worked this out">
            <HowWeWorkedItOut b={b} cash={cash} assumptions={state.assumptions} spending={state.answers.monthlySpending ?? 0}
              sparePct={state.answers.spareSavingsPct ?? 0} investPct={state.answers.investPct ?? 0} invested={totalInvested(state)} />
          </Disclosure>

          <p className="px-1 text-[11px] leading-snug text-chase-muted">
            This is a rule-based calculation from your answers, not financial advice or a personal recommendation.
          </p>
        </div>
      </div>

      <div className="space-y-2 border-t border-chase-line bg-white px-5 pb-8 pt-3">
        {canInvest ? (
          <>
            <Button onClick={() => setConfirmOpen(true)}>
              Invest {gbp(b.suggestedInvest)} in your {risk?.title} risk portfolio
            </Button>
            <Button variant="ghost" onClick={home}>Not now</Button>
          </>
        ) : (
          <Button variant="secondary" onClick={home}>Back to home</Button>
        )}
      </div>

      <ConfirmSheet open={confirmOpen} onClose={() => setConfirmOpen(false)} maxAmount={b.suggestedInvest} />
      <AssumptionsSheet open={assumptionsOpen} onClose={() => setAssumptionsOpen(false)} />
    </div>
  );
}

const fmtMonths = (m: number) => {
  const r = Math.round(m * 10) / 10;
  return `${r} ${r === 1 ? 'month' : 'months'}`;
};

function spareReason(b: BucketResult) {
  if (b.spareLimitedBy === 'your-answer') return 'Limited by your answer about spare savings';
  if (b.spareLimitedBy === 'buffer') return 'Everything above your buffer';
  return 'Your answer and your buffer agree';
}

function SplitBar({ b, cash }: { b: BucketResult; cash: number }) {
  if (cash <= 0) return null;
  const other = Math.max(0, cash - b.livingMoney - b.safetyBuffer - b.spareMoney);
  const segs = [
    { v: Math.min(b.livingMoney, cash), c: 'bg-[#0B2A5B]', l: 'Living' },
    { v: Math.min(b.safetyBuffer, Math.max(0, cash - b.livingMoney)), c: 'bg-[#117ACA]', l: 'Buffer' },
    { v: other, c: 'bg-[#C9D0DA]', l: 'Other cash' },
    { v: b.keepInCash, c: 'bg-[#9CC3F5]', l: 'Keep' },
    { v: b.suggestedInvest, c: 'bg-chase-blue', l: 'Invest' },
  ].filter((s) => s.v > 0);
  return (
    <>
      <div className="mt-3 flex h-3 overflow-hidden rounded-full">
        {segs.map((s) => (
          <div key={s.l} className={s.c} style={{ width: `${(s.v / cash) * 100}%` }} />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-chase-muted">
        {segs.map((s) => (
          <span key={s.l} className="flex items-center gap-1">
            <span className={`h-2 w-2 rounded-full ${s.c}`} />
            {s.l}
          </span>
        ))}
      </div>
    </>
  );
}

function BucketRow({ icon, color, title, sub, amount, badge, action }: {
  icon: React.ReactNode; color: string; title: string; sub: string; amount: number; badge: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <Card className="flex items-center gap-3 p-4">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white ${color}`}>{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="whitespace-nowrap text-[16px] font-semibold text-chase-ink">{title}</div>
        <div className="my-0.5"><Tag>{badge}</Tag></div>
        <div className="text-[12px] text-chase-muted">
          {sub}
          {action && (
            <button className="ml-1 font-semibold text-chase-blue" onClick={action.onClick}>
              · {action.label}
            </button>
          )}
        </div>
      </div>
      <div className="whitespace-nowrap text-right text-[15px] font-semibold text-chase-ink">{approx(amount)}</div>
    </Card>
  );
}

function HowWeWorkedItOut({ b, cash, assumptions, spending, sparePct, investPct, invested }: {
  b: BucketResult; cash: number; assumptions: BucketAssumptions; spending: number;
  sparePct: number; investPct: number; invested: number;
}) {
  const d = b.dependantsCounted;
  const rows: [string, string, string][] = [
    ['1. Living money', `${gbp(spending)} × ${fmt(b.livingMonthsUsed)}`, gbp(b.livingMoney)],
    ['2. Safety buffer', `${gbp(spending)} × (${assumptions.bufferBaseMonths} + ${assumptions.bufferMonthsPerDependant} × ${d})`, gbp(b.safetyBuffer)],
    ['3. Cash above both', `${gbp(cash)} − ${gbp(b.livingMoney)} − ${gbp(b.safetyBuffer)}`, gbp(b.aboveBuffer)],
    ['4. Your answer', `${sparePct}% × ${gbp(cash)}`, gbp(b.declaredSpare)],
    ['5. Spare money', 'lower of 3 and 4', gbp(b.spareMoney)],
    ['6. Invest', invested > 0 ? `${investPct}% × (${gbp(b.spareMoney)} + ${gbp(invested)} already invested) − ${gbp(invested)}` : `${investPct}% × ${gbp(b.spareMoney)}`, gbp(b.suggestedInvest)],
  ];
  return (
    <div className="space-y-3 text-[13px] text-chase-ink">
      <table className="w-full">
        <tbody>
          {rows.map(([label, formula, result]) => (
            <tr key={label} className="border-b border-chase-line align-top last:border-0">
              <td className="py-2 pr-2">
                <div className="font-semibold">{label}</div>
                <div className="text-[12px] text-chase-muted">{formula}</div>
              </td>
              <td className="whitespace-nowrap py-2 text-right font-medium">{result}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="rounded-xl bg-chase-bg p-3 text-[12px] leading-relaxed text-chase-muted">
        <p className="font-semibold text-chase-ink">Assumptions</p>
        <p>• Living money: {assumptions.livingMonths} month of spending, +{Math.round(assumptions.livingUpliftPerDependant * 100)}% per dependant.</p>
        <p>• Safety buffer: {assumptions.bufferBaseMonths} months, +{assumptions.bufferMonthsPerDependant} per dependant (3+ counts as 3).</p>
        <p>• Amounts to invest are rounded down to the nearest £{assumptions.roundingStep}; minimum {gbp(assumptions.minimumInvestment)} (placeholder).</p>
        <p>• Investments are counted at what you paid in, not today's value.</p>
        <p>• Spending is your own estimate. We don't look at income, debts or upcoming bills.</p>
      </div>
    </div>
  );
}

const fmt = (m: number) => `${Math.round(m * 100) / 100} month${m === 1 ? '' : 's'}`;

function AssumptionsSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { state, dispatch } = useStore();
  const a = state.assumptions;
  const set = (patch: Partial<BucketAssumptions>) => dispatch({ type: 'SET_ASSUMPTIONS', assumptions: { ...a, ...patch } });
  return (
    <BottomSheet open={open} onClose={onClose} label="Change your safety buffer">
      <h2 className="text-[20px] font-semibold text-chase-ink">Your safety buffer</h2>
      <p className="mt-1 text-[14px] text-chase-muted">
        Many people keep 3 to 6 months of spending for emergencies. Pick what feels right for you.
      </p>
      <Stepper label="Months of spending" value={a.bufferBaseMonths} min={1} max={12} onChange={(v) => set({ bufferBaseMonths: v })} />
      <Stepper label="Extra months per dependant" value={a.bufferMonthsPerDependant} min={0} max={3} onChange={(v) => set({ bufferMonthsPerDependant: v })} />
      <Button className="mt-6" onClick={onClose}>Done</Button>
    </BottomSheet>
  );
}

function Stepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  const btn = 'h-10 w-10 rounded-full bg-chase-sky text-[20px] font-semibold text-chase-blue disabled:opacity-40';
  return (
    <div className="mt-5 flex items-center justify-between">
      <span className="text-[15px] text-chase-ink">{label}</span>
      <div className="flex items-center gap-3">
        <button className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Decrease ${label}`}>−</button>
        <span className="w-6 text-center text-[18px] font-semibold">{value}</span>
        <button className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`Increase ${label}`}>+</button>
      </div>
    </div>
  );
}

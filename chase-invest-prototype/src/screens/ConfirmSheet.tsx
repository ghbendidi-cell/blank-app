import { useEffect, useState } from 'react';
import { gbp } from '../logic/buckets';
import { illustrateFees } from '../logic/fees';
import { isaAllowanceLeft } from '../state/selectors';
import { totalInvested, useStore, type Wrapper } from '../state/store';
import { BottomSheet } from '../components/PhoneChrome';
import { Button, CapitalAtRisk, CheckIcon, Toggle } from '../components/ui';
import { RISK_OPTIONS } from './Onboarding';

/** Everything the user needs to see BEFORE anything happens. Nothing is invested until "Confirm". */
export function ConfirmSheet({ open, onClose, maxAmount }: { open: boolean; onClose: () => void; maxAmount: number }) {
  const { state, dispatch } = useStore();
  const allowance = isaAllowanceLeft(state);
  const [amount, setAmount] = useState(maxAmount);
  const [wrapper, setWrapper] = useState<Wrapper>(state.monthlyPlan?.wrapper ?? 'isa');
  const [repeat, setRepeat] = useState(state.monthlyPlan?.active ?? false);
  const [understood, setUnderstood] = useState(false);

  useEffect(() => {
    if (open) {
      setAmount(maxAmount);
      setUnderstood(false);
    }
  }, [open, maxAmount]);

  const risk = state.answers.risk ?? 'medium';
  const riskInfo = RISK_OPTIONS.find((r) => r.id === risk)!;
  const amountValid = amount >= state.assumptions.minimumInvestment && amount <= maxAmount;
  const isaTooSmall = wrapper === 'isa' && amount > allowance;
  const fees = illustrateFees(amount, totalInvested(state), risk);

  return (
    <BottomSheet open={open} onClose={onClose} label="Check before you invest">
      <h2 className="text-[22px] font-semibold text-chase-ink">Check before you invest</h2>
      <p className="mt-1 text-[14px] text-chase-muted">Nothing happens until you tap Confirm.</p>

      <Section label="Amount">
        <div className="flex items-center gap-2 rounded-xl border border-chase-line px-4 py-3 focus-within:border-chase-accent">
          <span className="text-[22px] font-semibold text-chase-muted">£</span>
          <input
            type="number"
            inputMode="numeric"
            value={amount}
            min={state.assumptions.minimumInvestment}
            max={maxAmount}
            step={10}
            onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
            className="w-full text-[22px] font-semibold outline-none"
            aria-label="Amount to invest in pounds"
          />
        </div>
        <p className={`mt-1 text-[12px] ${amountValid ? 'text-chase-muted' : 'text-red-600'}`}>
          Between {gbp(state.assumptions.minimumInvestment)} and {gbp(maxAmount)} (your spare money estimate). Taken from your savings first.
        </p>
      </Section>

      <Section label="Portfolio">
        <div className="rounded-xl bg-jpm-cream p-3">
          <div className="text-[15px] font-semibold text-jpm-brown">{riskInfo.title} risk managed portfolio</div>
          <div className="text-[13px] text-jpm-brown/80">J.P. Morgan Personal Investing · {riskInfo.line}</div>
        </div>
      </Section>

      <Section label="Account type">
        <div className="grid grid-cols-2 gap-2">
          <WrapperOption
            selected={wrapper === 'isa'}
            onClick={() => setWrapper('isa')}
            title="Stocks & Shares ISA"
            sub={`No UK tax on returns. ${gbp(allowance)} allowance left this tax year.`}
          />
          <WrapperOption
            selected={wrapper === 'gia'}
            onClick={() => setWrapper('gia')}
            title="General Investment Account"
            sub="No limit, but returns may be taxed."
          />
        </div>
        {isaTooSmall && <p className="mt-1 text-[12px] text-red-600">This is more than your ISA allowance left. Lower the amount or choose the General Investment Account.</p>}
      </Section>

      <Section label="Costs (estimated, per year)">
        <table className="w-full text-[14px]">
          <tbody>
            <tr><td className="py-1 text-chase-muted">Platform fee: 0.75% up to £100k, 0.35% above</td><td className="text-right font-medium">{gbp(fees.platformFeePerYear, 2)}</td></tr>
            <tr><td className="py-1 text-chase-muted">Fund costs (approx. 0.20%)</td><td className="text-right font-medium">{gbp(fees.fundCostsPerYear, 2)}</td></tr>
            <tr className="border-t border-chase-line"><td className="py-1.5 font-semibold">Total</td><td className="text-right font-semibold">{gbp(fees.totalPerYear, 2)}</td></tr>
          </tbody>
        </table>
        <p className="mt-1 text-[11px] text-chase-muted">
          On a portfolio of {gbp(fees.portfolioAfter)}, if its value stayed the same. Placeholder fees: to be confirmed against the live tariff and Key Information Document.
        </p>
      </Section>

      <div className="mt-4">
        <CapitalAtRisk />
      </div>

      <div className="mt-4 flex items-start justify-between gap-3 rounded-xl border border-chase-line p-3">
        <div>
          <div className="text-[15px] font-semibold text-chase-ink">Repeat every month</div>
          <div className="text-[12px] leading-snug text-chase-muted">
            Each month we'll prepare the amount from your money check, ready to confirm in one tap. Nothing is invested automatically. Stop any time.
          </div>
        </div>
        <Toggle checked={repeat} onChange={setRepeat} label="Repeat every month" />
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-3 text-[14px] text-chase-ink">
        <button
          role="checkbox"
          aria-checked={understood}
          onClick={() => setUnderstood(!understood)}
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${understood ? 'border-chase-accent bg-chase-accent' : 'border-[#C9D0DA]'}`}
        >
          {understood && <CheckIcon className="h-3 w-3 text-white" />}
        </button>
        <span onClick={() => setUnderstood(!understood)}>I understand the value of my investment can fall and I may get back less than I put in.</span>
      </label>

      <div className="mt-5 space-y-2">
        <Button
          disabled={!amountValid || isaTooSmall || !understood}
          onClick={() => dispatch({ type: 'INVEST', amount, wrapper, repeat })}
        >
          Confirm and invest {gbp(amount)}
        </Button>
        <Button variant="ghost" onClick={onClose}>Not now</Button>
      </div>
    </BottomSheet>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <div className="mb-1.5 text-[12px] font-semibold uppercase tracking-wide text-chase-muted">{label}</div>
      {children}
    </div>
  );
}

function WrapperOption({ selected, onClick, title, sub }: { selected: boolean; onClick: () => void; title: string; sub: string }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border p-3 text-left ${selected ? 'border-chase-accent bg-chase-accent-soft' : 'border-chase-line'}`}
      aria-pressed={selected}
    >
      <div className="text-[14px] font-semibold leading-tight text-chase-ink">{title}</div>
      <div className="mt-1 text-[11px] leading-snug text-chase-muted">{sub}</div>
    </button>
  );
}

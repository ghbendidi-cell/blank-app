import { gbp } from '../logic/buckets';
import { monthLabel, totalCash, totalInvested, useStore } from '../state/store';

/** Demo controls that sit OUTSIDE the phone, so the app itself stays clean. */
export function PresenterPanel() {
  const { state, dispatch } = useStore();
  return (
    <aside className="w-full max-w-[390px] px-4 pb-10 lg:w-[300px] lg:px-0 lg:pt-6">
      <div className="rounded-2xl bg-white p-5 shadow-card">
        <div className="text-[11px] font-semibold uppercase tracking-widest text-chase-muted">Presenter controls</div>
        <h2 className="mt-1 text-[18px] font-semibold text-chase-ink">Safety Buffer + Invest</h2>
        <p className="mt-1 text-[13px] text-chase-muted">Clickable prototype · mock data · no real money</p>

        <button
          onClick={() => dispatch({ type: 'SIMULATE_MONTH' })}
          disabled={!state.onboarded}
          className="mt-4 w-full rounded-xl bg-chase-navy px-4 py-3 text-[15px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          📅 Simulate 1st of the month
        </button>
        {!state.onboarded && <p className="mt-1.5 text-[12px] text-chase-muted">Complete the 6 questions in the phone first.</p>}
        {state.onboarded && (
          <p className="mt-1.5 text-[12px] text-chase-muted">
            Next: {monthLabel(state.monthIndex + 1)}
            {state.monthIndex > 0 && ' · adds mock salary minus spending'}
          </p>
        )}

        <dl className="mt-4 space-y-1.5 border-t border-chase-line pt-3 text-[13px]">
          <Row k="Simulated date" v={state.monthIndex === 0 ? 'October 2026' : monthLabel(state.monthIndex)} />
          <Row k="Cash (current + savings)" v={gbp(totalCash(state))} />
          <Row k="Invested (paid in)" v={gbp(totalInvested(state))} />
          <Row k="Monthly plan" v={state.monthlyPlan?.active ? 'On' : 'Off'} />
        </dl>

        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-chase-line pt-3">
          <Jump label="Home" onClick={() => dispatch({ type: 'NAVIGATE', screen: 'home' })} />
          <Jump label="Questions" onClick={() => dispatch({ type: 'NAVIGATE', screen: 'onboarding' })} />
          <Jump label="Money check" onClick={() => dispatch({ type: 'NAVIGATE', screen: 'summary' })} disabled={!state.onboarded} />
          <Jump
            label="Reset demo"
            danger
            onClick={() => {
              if (confirm('Reset the prototype to its starting state?')) dispatch({ type: 'RESET' });
            }}
          />
        </div>
      </div>
      <p className="mt-3 px-1 text-[11px] leading-snug text-chase-muted">
        Student prototype for the UCL × JPMorgan Chase case challenge. Not a real product, not financial advice. Logos are placeholders.
      </p>
    </aside>
  );
}

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex justify-between">
    <dt className="text-chase-muted">{k}</dt>
    <dd className="font-medium text-chase-ink">{v}</dd>
  </div>
);

function Jump({ label, onClick, disabled, danger }: { label: string; onClick: () => void; disabled?: boolean; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg border px-3 py-2 text-[13px] font-medium disabled:opacity-40 ${danger ? 'border-red-200 text-red-600' : 'border-chase-line text-chase-ink'}`}
    >
      {label}
    </button>
  );
}

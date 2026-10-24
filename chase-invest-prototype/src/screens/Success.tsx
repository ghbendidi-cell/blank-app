import { gbp } from '../logic/buckets';
import { useStore } from '../state/store';
import { StatusBar } from '../components/PhoneChrome';
import { Button, CapitalAtRisk, CheckIcon } from '../components/ui';

export function Success() {
  const { state, dispatch } = useStore();
  const inv = state.lastInvestment;
  const goHome = () => {
    dispatch({ type: 'SET_HOME_TAB', tab: 'spend' });
    dispatch({ type: 'NAVIGATE', screen: 'home' });
  };
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div className="flex h-20 w-20 animate-pop items-center justify-center rounded-full bg-chase-accent">
          <CheckIcon className="h-10 w-10 text-white" />
        </div>
        <h1 className="mt-6 text-[26px] font-semibold text-chase-ink">Done</h1>
        {inv && (
          <p className="mt-2 text-[16px] leading-relaxed text-chase-muted">
            {gbp(inv.amount)} is on its way to your {inv.risk} risk {inv.wrapper === 'isa' ? 'Stocks & Shares ISA' : 'General Investment Account'}.
            It's usually invested within a few working days (placeholder).
          </p>
        )}
        {inv?.recurring && (
          <p className="mt-3 rounded-xl bg-chase-accent-soft px-4 py-2 text-[13px] text-chase-accent-strong">
            Monthly plan on: we'll prepare next month's amount for you to confirm. Stop any time from the Invest tab.
          </p>
        )}
        <div className="mt-5 w-full text-left">
          <CapitalAtRisk />
        </div>
      </div>
      <div className="px-6 pb-8">
        <Button onClick={goHome}>Back to home</Button>
      </div>
    </div>
  );
}

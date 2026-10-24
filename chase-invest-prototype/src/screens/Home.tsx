import { MOCK_USER } from '../data/mock';
import { approx, gbp } from '../logic/buckets';
import { selectBuckets } from '../state/selectors';
import { totalInvested, useStore, type HomeTab } from '../state/store';
import { BottomTabBar, StatusBar } from '../components/PhoneChrome';
import { Button, CapitalAtRisk, Card, ChevronRight, GrowthIcon, JpmWordmark, PlaceholderLogo, ShieldIcon, Tag, UserIcon } from '../components/ui';

const TABS: { id: HomeTab; label: string }[] = [
  { id: 'spend', label: 'Spend' },
  { id: 'save', label: 'Save' },
  { id: 'invest', label: 'Invest' },
  { id: 'insure', label: 'Insure' },
];

export function Home() {
  const { state, dispatch } = useStore();
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <StatusBar />
        <header className="relative flex items-center justify-center px-5 pb-1 pt-3">
          <span className="absolute left-5 text-chase-navy">
            <UserIcon className="h-7 w-7" />
          </span>
          <h1 className="text-[18px] text-chase-navy">Good morning, {MOCK_USER.firstName}</h1>
        </header>
        <nav className="flex justify-center gap-7 pb-4 pt-4">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => dispatch({ type: 'SET_HOME_TAB', tab: t.id })}
              className={`border-b-2 pb-1 text-[17px] ${state.homeTab === t.id ? 'border-chase-blue font-medium text-chase-blue' : 'border-transparent text-chase-muted'}`}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <div className="space-y-4 px-4 pb-6">
          {state.homeTab === 'spend' && <SpendTab />}
          {state.homeTab === 'save' && <SaveTab />}
          {state.homeTab === 'invest' && <InvestTab />}
          {state.homeTab === 'insure' && (
            <Card className="p-5 text-[15px] text-chase-muted">Insurance isn't part of this prototype.</Card>
          )}
        </div>
      </div>
      <BottomTabBar />
    </div>
  );
}

/** Current account + savings + investments, side by side. */
function MoneyOverview() {
  const { state, dispatch } = useStore();
  const invested = totalInvested(state);
  const rows = [
    { label: 'Current account', value: state.accounts.current, tab: 'spend' as const },
    { label: 'Savings', value: state.accounts.savings, tab: 'save' as const },
    { label: 'Investments', value: invested, tab: 'invest' as const, invest: true },
  ];
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center gap-3 bg-chase-navy px-5 py-4 text-white">
        <PlaceholderLogo size={26} />
        <span className="text-[16px]">Your money</span>
      </div>
      <ul>
        {rows.map((r) => (
          <li key={r.label}>
            <button
              onClick={() => dispatch({ type: 'SET_HOME_TAB', tab: r.tab })}
              className="flex w-full items-center justify-between border-b border-chase-line px-5 py-4 text-left last:border-0"
            >
              <span>
                <span className="block text-[16px] font-medium text-chase-ink">{r.label}</span>
                {r.invest && (
                  <span className="mt-1 flex items-center gap-1.5">
                    <span className="text-[12px] text-chase-muted">J.P. Morgan Personal Investing</span>
                  </span>
                )}
              </span>
              <span className="text-right">
                <span className="block text-[17px] font-medium text-chase-ink">{gbp(r.value, 2)}</span>
                {r.invest && invested > 0 && <CapitalAtRisk compact />}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/** The small "£X above your buffer" card, or the single set-up suggestion before onboarding. */
function BufferCard() {
  const { state, dispatch } = useStore();
  const b = selectBuckets(state);
  if (!b) {
    return (
      <Card className="p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-chase-sky">
            <ShieldIcon className="h-5 w-5 text-chase-blue" />
          </div>
          <div className="flex-1">
            <h2 className="text-[17px] font-semibold text-chase-ink">Is your cash working as hard as it could?</h2>
            <p className="mt-1 text-[14px] leading-snug text-chase-muted">
              Set a safety buffer first, then see if any spare money could be invested. Takes about a minute.
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button className="!py-2.5 !text-[15px]" onClick={() => dispatch({ type: 'NAVIGATE', screen: 'onboarding' })}>
            Set my buffer
          </Button>
          <Button variant="ghost" className="!py-2.5 !text-[15px]" onClick={() => dispatch({ type: 'SET_HOME_TAB', tab: 'save' })}>
            Not now
          </Button>
        </div>
      </Card>
    );
  }
  const above = b.aboveBuffer >= 0;
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[14px] font-medium text-chase-muted">
          <ShieldIcon className="h-4 w-4 text-chase-blue" /> Safety buffer
        </span>
        <Tag>Estimate</Tag>
      </div>
      <p className="mt-2 text-[20px] font-semibold text-chase-ink">
        {above ? `${approx(b.aboveBuffer)} above your buffer` : `${approx(-b.aboveBuffer)} below your buffer`}
      </p>
      <p className="mt-1 text-[13px] text-chase-muted">
        Buffer {approx(b.safetyBuffer)} + living money {approx(b.livingMoney)}, kept in cash.
      </p>
      {state.monthIndex > 0 && (
        <button
          className="mt-3 flex items-center gap-1 text-[14px] font-semibold text-chase-blue"
          onClick={() => dispatch({ type: 'NAVIGATE', screen: 'summary' })}
        >
          See this month's money check <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </Card>
  );
}

function SpendTab() {
  const { state } = useStore();
  return (
    <>
      <MoneyOverview />
      <BufferCard />
      <Card>
        <div className="flex items-center justify-between border-b border-chase-line px-5 py-4">
          <div>
            <div className="text-[19px] font-medium text-chase-ink">Current account</div>
            <div className="text-[13px] text-chase-muted">Mock data</div>
          </div>
          <div className="text-[17px] font-medium">{gbp(state.accounts.current, 2)}</div>
        </div>
        <div className="px-5 py-3 text-[13px] text-chase-muted">Spending from Alex's Account</div>
      </Card>
    </>
  );
}

function SaveTab() {
  const { state } = useStore();
  return (
    <>
      <Card className="p-5">
        <div className="text-[14px] text-chase-muted">Easy access saver</div>
        <div className="mt-1 text-[26px] font-semibold text-chase-ink">{gbp(state.accounts.savings, 2)}</div>
        <div className="mt-2 text-[13px] text-chase-muted">Interest rate: placeholder · Mock data</div>
      </Card>
      <BufferCard />
    </>
  );
}

function InvestTab() {
  const { state, dispatch } = useStore();
  const invested = totalInvested(state);
  return (
    <>
      <div className="overflow-hidden rounded-2xl bg-jpm-cream shadow-card">
        <div className="px-5 pb-4 pt-5">
          <JpmWordmark />
        </div>
        <div className="h-1.5 bg-jpm-green" />
        <div className="bg-white px-5 py-4">
          <div className="flex items-center justify-between">
            <span className="text-[14px] text-chase-muted">Total invested</span>
            <CapitalAtRisk compact />
          </div>
          <div className="mt-1 text-[28px] font-semibold text-chase-ink">{gbp(invested, 2)}</div>
          {invested > 0 && (
            <div className="mt-2 space-y-1 text-[13px] text-chase-muted">
              {state.invested.isa > 0 && <div className="flex justify-between"><span>Stocks & Shares ISA</span><span>{gbp(state.invested.isa, 2)}</span></div>}
              {state.invested.gia > 0 && <div className="flex justify-between"><span>General Investment Account</span><span>{gbp(state.invested.gia, 2)}</span></div>}
              <p className="pt-1 text-[11px]">Shows money paid in. The prototype doesn't simulate market movements.</p>
            </div>
          )}
        </div>
      </div>

      {!state.onboarded && <BufferCard />}

      {state.onboarded && state.monthIndex === 0 && (
        <Card className="p-5">
          <div className="flex items-center gap-2 text-[17px] font-semibold text-chase-ink">
            <GrowthIcon className="h-5 w-5 text-chase-blue" /> You're all set
          </div>
          <p className="mt-2 text-[14px] leading-snug text-chase-muted">
            On the 1st of each month we'll send you a money check. Nothing is invested unless you confirm it.
          </p>
          <button className="mt-3 text-[14px] font-semibold text-chase-blue" onClick={() => dispatch({ type: 'NAVIGATE', screen: 'onboarding' })}>
            Edit my answers
          </button>
        </Card>
      )}

      {state.onboarded && state.monthIndex > 0 && <BufferCard />}

      {state.monthlyPlan?.active && (
        <Card className="flex items-center justify-between p-5">
          <div>
            <div className="text-[15px] font-semibold text-chase-ink">Monthly plan is on</div>
            <div className="text-[13px] text-chase-muted">Prepared each month, you confirm with one tap.</div>
          </div>
          <button className="rounded-full bg-chase-sky px-4 py-2 text-[14px] font-semibold text-chase-blue" onClick={() => dispatch({ type: 'STOP_MONTHLY_PLAN' })}>
            Stop
          </button>
        </Card>
      )}

      {state.history.length > 0 && (
        <Card className="p-5">
          <div className="mb-2 text-[15px] font-semibold text-chase-ink">Activity</div>
          {state.history.map((h) => (
            <div key={h.id} className="flex justify-between border-t border-chase-line py-2.5 text-[14px]">
              <span className="text-chase-muted">
                {h.dateLabel} · {h.wrapper === 'isa' ? 'ISA' : 'GIA'} · {h.risk}
              </span>
              <span className="font-medium text-chase-ink">+{gbp(h.amount)}</span>
            </div>
          ))}
        </Card>
      )}

      {state.onboarded && state.monthIndex > 0 && (
        <button className="w-full text-center text-[14px] font-semibold text-chase-blue" onClick={() => dispatch({ type: 'NAVIGATE', screen: 'onboarding' })}>
          Edit my answers
        </button>
      )}
    </>
  );
}

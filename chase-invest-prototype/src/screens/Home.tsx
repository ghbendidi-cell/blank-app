import { useState } from 'react';
import { LINKED_ACCOUNT, MOCK_USER } from '../data/mock';
import { approx, gbp } from '../logic/buckets';
import { selectBuckets } from '../state/selectors';
import { totalInvested, useStore, type HomeTab } from '../state/store';
import { BottomTabBar, StatusBar } from '../components/PhoneChrome';
import { Button, CapitalAtRisk, Card, Chevron, ChevronRight, CloseIcon, GrowthIcon, JpmWordmark, PlaceholderLogo, ShieldIcon, Tag } from '../components/ui';

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
        <StatusBar time="15:19" />
        <header className="relative flex items-center justify-center px-5 pb-1 pt-3">
          <span className="absolute left-6 text-chase-navy">
            <ProfileIcon />
          </span>
          <h1 className="text-[19px] text-chase-navy">Good afternoon, {MOCK_USER.firstName}</h1>
        </header>
        <nav className="flex justify-center gap-7 pb-5 pt-5">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => dispatch({ type: 'SET_HOME_TAB', tab: t.id })}
              className={`border-b-2 pb-1 text-[18px] ${state.homeTab === t.id ? 'border-chase-blue text-chase-blue' : 'border-transparent text-[#5B6675]'}`}
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

function ProfileIcon() {
  return (
    <span className="relative block">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="10" cy="8" r="4" />
        <path d="M3 21c1.3-3.8 3.9-5.8 7-5.8s5.7 2 7 5.8" />
      </svg>
      <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#E5533D]" />
    </span>
  );
}

/** The blue stacked-disc mark used for account rows (generic, not a brand asset). */
function AccountIcon() {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-chase-line bg-white">
      <svg width="30" height="22" viewBox="0 0 30 22">
        <ellipse cx="15" cy="14" rx="13" ry="6" fill="#7FB2F0" />
        <ellipse cx="15" cy="9" rx="13" ry="6.5" fill="#0060F0" />
        <path d="M15 5.5 19 9l-4 3.5L11 9Z" fill="white" />
      </svg>
    </span>
  );
}

function Kebab({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="rounded-full p-1.5 text-chase-ink hover:bg-chase-bg" aria-label="More options">
      <svg width="6" height="22" viewBox="0 0 6 22" fill="currentColor"><circle cx="3" cy="3" r="2.4" /><circle cx="3" cy="11" r="2.4" /><circle cx="3" cy="19" r="2.4" /></svg>
    </button>
  );
}

function SpendTab() {
  const { state, dispatch } = useStore();
  const [cardOpen, setCardOpen] = useState(false);
  const toast = (message: string) => dispatch({ type: 'SHOW_TOAST', message });
  const balance = state.accounts.current + LINKED_ACCOUNT.balance;
  return (
    <>
      {/* Debit card + current accounts, as in the real app */}
      <div className="overflow-hidden rounded-[22px] shadow-card">
        <div className="bg-chase-navy px-5 pb-9 pt-5 text-white">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-3 text-[17px]">
              <PlaceholderLogo size={30} /> Debit
            </span>
            <button className="flex items-center gap-1.5 text-[17px]" onClick={() => setCardOpen((o) => !o)}>
              {cardOpen ? 'Hide card' : 'See card'} <Chevron className={`h-4 w-4 transition-transform ${cardOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
          {cardOpen && (
            <div className="mx-auto mt-5 aspect-[1.586] w-[85%] animate-fadeIn rounded-2xl bg-gradient-to-br from-[#1E5BD8] to-[#0B2A5B] p-4 shadow-lg">
              <div className="flex h-full flex-col justify-between">
                <PlaceholderLogo size={26} />
                <div className="font-mono text-[15px] tracking-widest">•••• •••• •••• 4821</div>
                <div className="flex justify-between text-[11px] opacity-80"><span>{MOCK_USER.firstName.toUpperCase()} (MOCK)</span><span>VISA DEBIT</span></div>
              </div>
            </div>
          )}
        </div>
        <div className="-mt-5 rounded-t-[22px] bg-white">
          <div className="flex items-center justify-between border-b border-chase-line px-5 py-5">
            <div>
              <div className="text-[21px] font-medium text-chase-ink">Current accounts</div>
              <div className="text-[15px] text-chase-muted">Balance: {gbp(balance, 2)}</div>
            </div>
            <button
              className="rounded-full bg-[#E8F2FE] px-5 py-2.5 text-[17px] font-medium text-chase-blue"
              onClick={() => toast('Adding accounts isn’t part of this prototype')}
            >
              Add account
            </button>
          </div>
          <div className="flex items-center gap-4 px-5 py-4">
            <AccountIcon />
            <div className="flex-1">
              <div className="text-[14px] text-chase-muted">Spending from</div>
              <div className="whitespace-nowrap text-[18px] font-medium text-chase-ink">{MOCK_USER.firstName}'s Account</div>
            </div>
            <span className="text-[18px] text-chase-ink">{gbp(state.accounts.current, 2)}</span>
            <Kebab onClick={() => toast('Account options aren’t part of this prototype')} />
          </div>
          <div className="flex items-center gap-4 px-5 pb-5 pt-2">
            <AccountIcon />
            <div className="flex-1 text-[18px] font-medium text-chase-ink">{LINKED_ACCOUNT.name}</div>
            <span className="text-[18px] text-chase-ink">{gbp(LINKED_ACCOUNT.balance, 2)}</span>
            <Kebab onClick={() => toast('Linked account (mock), not counted in your Chase cash')} />
          </div>
        </div>
      </div>

      {state.onboarded && (
        <>
          <MoneyOverview />
          <BufferCard />
        </>
      )}

      <Card className="overflow-hidden">
        <div className="border-b border-chase-line px-5 py-5 text-[21px] font-medium text-chase-ink">Credit card</div>
        {state.creditCardPromoDismissed ? (
          <div className="px-5 py-4 text-[14px] text-chase-muted">No credit card yet.</div>
        ) : (
          <div className="p-4">
            <div className="relative overflow-hidden rounded-2xl border border-[#D6E8FC] p-5 pr-2">
              <button
                className="absolute right-3 top-3 rounded-full p-1 text-chase-ink"
                aria-label="Dismiss"
                onClick={() => dispatch({ type: 'DISMISS_CREDIT_CARD_PROMO' })}
              >
                <CloseIcon className="h-4 w-4" />
              </button>
              <div className="flex">
                <div className="w-[62%]">
                  <h3 className="text-[18px] font-semibold leading-snug text-chase-ink">The credit card that moves with you</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-chase-muted">
                    Find out more and check if you're eligible to apply – without impacting your credit score.
                  </p>
                  <button
                    className="mt-4 rounded-full bg-[#0060C8] px-6 py-2.5 text-[17px] font-medium text-white"
                    onClick={() => toast('Credit cards aren’t part of this prototype')}
                  >
                    Let's go →
                  </button>
                </div>
                <PhoneInHand />
              </div>
            </div>
          </div>
        )}
      </Card>
    </>
  );
}

/** Simple illustration standing in for the app's artwork. */
function PhoneInHand() {
  return (
    <svg className="mt-4 w-[38%]" viewBox="0 0 120 150" aria-hidden>
      <path d="M10 10 C30 6 40 20 46 30 L40 40 Z" fill="#E8B9A0" />
      <rect x="32" y="16" width="42" height="74" rx="7" transform="rotate(18 53 53)" fill="#555" />
      <rect x="36" y="21" width="34" height="62" rx="4" transform="rotate(18 53 53)" fill="#CFE3FA" />
      <rect x="52" y="52" width="40" height="26" rx="4" transform="rotate(58 72 65)" fill="#0B5CD7" />
      <rect x="60" y="56" width="6" height="5" rx="1" transform="rotate(58 72 65)" fill="#F4C542" />
      <path d="M78 70 C90 80 96 96 100 118 L112 140 L84 146 L70 112 C66 100 70 84 78 70 Z" fill="#9C5A2E" />
      <path d="M84 132 C90 128 98 128 104 132" stroke="#F28C28" strokeWidth="4" fill="none" />
    </svg>
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
      <div className="border-b border-chase-line px-5 py-4 text-[21px] font-medium text-chase-ink">Your money</div>
      <ul>
        {rows.map((r) => (
          <li key={r.label}>
            <button
              onClick={() => dispatch({ type: 'SET_HOME_TAB', tab: r.tab })}
              className="flex w-full items-center justify-between border-b border-chase-line px-5 py-3.5 text-left last:border-0"
            >
              <span>
                <span className="block text-[16px] font-medium text-chase-ink">{r.label}</span>
                {r.invest && <span className="text-[12px] text-chase-muted">J.P. Morgan Personal Investing</span>}
              </span>
              <span className="text-right">
                <span className="block text-[17px] text-chase-ink">{gbp(r.value, 2)}</span>
                {r.invest && invested > 0 && <CapitalAtRisk compact />}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/** The single Safety Buffer suggestion before set-up, or "£X above your buffer" after. */
export function BufferCard() {
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
            <div className="flex items-center gap-2">
              <h2 className="text-[17px] font-semibold text-chase-ink">Safety Buffer + Invest</h2>
              <Tag tone="blue">New</Tag>
            </div>
            <p className="mt-1 text-[14px] leading-snug text-chase-muted">
              Keep a safety buffer in cash, then see if any spare money could be invested. Takes about a minute.
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button className="!py-2.5 !text-[15px]" onClick={() => dispatch({ type: 'NAVIGATE', screen: 'onboarding' })}>
            Set my buffer
          </Button>
          <Button variant="ghost" className="!py-2.5 !text-[15px]" onClick={() => dispatch({ type: 'SHOW_TOAST', message: 'No problem. You can set it up any time from Invest.' })}>
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

function SaveTab() {
  const { state } = useStore();
  return (
    <>
      <Card className="p-5">
        <div className="text-[14px] text-chase-muted">Easy access saver</div>
        <div className="mt-1 text-[26px] font-semibold text-chase-ink">{gbp(state.accounts.savings, 2)}</div>
        <div className="mt-2 text-[13px] text-chase-muted">Interest rate: placeholder · Mock data</div>
      </Card>
      {state.onboarded && <BufferCard />}
    </>
  );
}

function InvestTab() {
  const { state, dispatch } = useStore();
  const invested = totalInvested(state);
  return (
    <>
      <button className="block w-full overflow-hidden rounded-2xl bg-jpm-cream text-left shadow-card" onClick={() => dispatch({ type: 'NAVIGATE', screen: 'jpm' })}>
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
          <div className="mt-3 flex items-center gap-1 text-[14px] font-semibold text-chase-blue">
            Explore investments <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </button>

      {(!state.onboarded || state.monthIndex > 0) && <BufferCard />}

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

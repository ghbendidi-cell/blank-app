import { useState, type ReactNode } from 'react';
import { EMPTY_ANSWERS, totalCash, useStore, type Answers } from '../state/store';
import { averageMonthlySpending, MOCK_SPENDING, monthTotal } from '../data/mock';
import { gbp, type RiskLevel } from '../logic/buckets';
import { BackArrow, Button, CapitalAtRisk, CheckIcon, ProgressBar, ShieldIcon, Tag, WalletIcon } from '../components/ui';
import { StatusBar } from '../components/PhoneChrome';

const QUESTIONS = 6;

export const RISK_OPTIONS: { id: RiskLevel; title: string; line: string; detail: string }[] = [
  {
    id: 'low',
    title: 'Low',
    line: 'Smaller ups and downs. Growth is likely to be slower.',
    detail: 'Mostly lower-risk assets such as bonds. Your money can still fall in value.',
  },
  {
    id: 'medium',
    title: 'Medium',
    line: 'A balance of ups and downs and potential growth.',
    detail: 'A mix of shares and bonds. Expect some years where the value falls.',
  },
  {
    id: 'high',
    title: 'High',
    line: 'Bigger ups and downs, aiming for more growth over the long term.',
    detail: 'Mostly shares. You could see large falls, especially in the short term.',
  },
];

export function Onboarding() {
  const { state, dispatch } = useStore();
  // step 0 = intro, 1..6 = questions, 7 = done, -1 = under 18
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>(() =>
    state.onboarded
      ? state.answers
      : { ...EMPTY_ANSWERS, monthlySpending: averageMonthlySpending(), spareSavingsPct: 30, investPct: 50 },
  );
  const set = (patch: Partial<Answers>) => setA((prev) => ({ ...prev, ...patch }));
  const cash = totalCash(state);

  const exit = () => dispatch({ type: 'NAVIGATE', screen: 'home' });
  const back = () => (step <= 1 ? (step === 1 ? setStep(0) : exit()) : setStep(step - 1));

  const ageValid = a.age != null && a.age >= 18 && a.age <= 120;
  const canContinue: Record<number, boolean> = {
    1: a.age != null && a.age > 0 && a.age <= 120,
    2: a.dependants != null,
    3: a.monthlySpending != null && a.monthlySpending > 0,
    4: a.spareSavingsPct != null,
    5: a.investPct != null,
    6: a.risk != null,
  };

  const next = () => {
    if (step === 1 && !ageValid) return setStep(-1);
    if (step === QUESTIONS) {
      dispatch({ type: 'COMPLETE_ONBOARDING', answers: a });
      return;
    }
    setStep(step + 1);
  };

  if (step === -1) return <UnderEighteen onBack={() => setStep(1)} onExit={exit} />;
  if (step === 0) return <Intro onStart={() => setStep(1)} onExit={exit} />;

  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <div className="flex items-center gap-3 px-5 pb-3 pt-1">
        <button onClick={back} className="rounded-full p-2 hover:bg-chase-bg" aria-label="Back">
          <BackArrow className="h-5 w-5 text-chase-ink" />
        </button>
        <div className="flex-1">
          <ProgressBar step={step} total={QUESTIONS} />
        </div>
        <span className="w-12 text-right text-[13px] text-chase-muted">
          {step}/{QUESTIONS}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-4 pt-2">
        {step === 1 && (
          <Question title="How old are you?" hint="You need to be 18 or over to invest.">
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={120}
              placeholder="e.g. 27"
              value={a.age ?? ''}
              onChange={(e) => set({ age: e.target.value === '' ? null : Number(e.target.value) })}
              className="w-full rounded-xl border border-chase-line px-4 py-4 text-[22px] font-semibold outline-none focus:border-chase-blue"
              autoFocus
            />
          </Question>
        )}

        {step === 2 && (
          <Question
            title="How many people depend on you financially?"
            hint="For example children, a partner who doesn't earn, or a relative you support. We keep a bigger safety buffer for each person."
          >
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((n) => (
                <button
                  key={n}
                  onClick={() => set({ dependants: n })}
                  className={`rounded-xl border py-4 text-[20px] font-semibold ${a.dependants === n ? 'border-chase-blue bg-chase-sky text-chase-blue' : 'border-chase-line text-chase-ink'}`}
                >
                  {n === 3 ? '3+' : n}
                </button>
              ))}
            </div>
          </Question>
        )}

        {step === 3 && (
          <Question title="What do you spend in a typical month?" hint="Include rent or mortgage, bills, food, transport and anything you pay for others.">
            <div className="rounded-xl bg-chase-sky p-3 text-[13px] text-chase-navy">
              From your Chase account over the last 3 months, you spent about{' '}
              <strong>{gbp(averageMonthlySpending())}</strong> a month. Adjust it if that doesn't look right.
              <div className="mt-2 flex gap-2">
                {MOCK_SPENDING.map((m) => (
                  <span key={m.month} className="rounded-full bg-white px-2 py-0.5 text-[12px]">
                    {m.month}: {gbp(monthTotal(m))}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-chase-line px-4 py-3 focus-within:border-chase-blue">
              <span className="text-[22px] font-semibold text-chase-muted">£</span>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                step={50}
                value={a.monthlySpending ?? ''}
                onChange={(e) => set({ monthlySpending: e.target.value === '' ? null : Math.max(0, Number(e.target.value)) })}
                className="w-full text-[22px] font-semibold outline-none"
                aria-label="Monthly spending in pounds"
              />
              <span className="text-[14px] text-chase-muted">/month</span>
            </div>
            <input
              type="range"
              min={0}
              max={8000}
              step={50}
              value={Math.min(a.monthlySpending ?? 0, 8000)}
              onChange={(e) => set({ monthlySpending: Number(e.target.value) })}
              className="mt-5 w-full accent-chase-blue"
              aria-label="Monthly spending slider"
            />
            <div className="flex justify-between text-[12px] text-chase-muted">
              <span>£0</span>
              <span>£8,000+</span>
            </div>
          </Question>
        )}

        {step === 4 && (
          <Question title="How much of your savings don't you need day to day?" hint={`Think about all the cash you hold (about ${gbp(cash)} with Chase).`}>
            <div className="space-y-2 rounded-xl border border-chase-line p-3 text-[13px] text-chase-ink">
              <p className="font-semibold">Leave these out. We'll keep both in cash for you:</p>
              <p className="flex gap-2">
                <WalletIcon className="h-4 w-4 shrink-0 text-chase-blue" />
                <span><strong>Money you live on</strong>: rent, bills and everyday spending.</span>
              </p>
              <p className="flex gap-2">
                <ShieldIcon className="h-4 w-4 shrink-0 text-chase-blue" />
                <span><strong>Your safety buffer</strong>: money for emergencies, like losing your job or a big repair.</span>
              </p>
            </div>
            <PercentSlider
              value={a.spareSavingsPct ?? 0}
              onChange={(v) => set({ spareSavingsPct: v })}
              caption={`About ${gbp(Math.round(((a.spareSavingsPct ?? 0) / 100) * cash))} I don't need day to day`}
              label="Share of savings not needed day to day"
            />
            <p className="mt-3 text-[12px] text-chase-muted">
              We'll also check this against your spending. If the two give different answers, we use the lower one.
            </p>
          </Question>
        )}

        {step === 5 && (
          <Question title="Of that spare money, how much would you like to invest?" hint="The rest stays in cash. You can change this at any time.">
            <PercentSlider
              value={a.investPct ?? 0}
              onChange={(v) => set({ investPct: v })}
              caption={`${a.investPct ?? 0}% invest · ${100 - (a.investPct ?? 0)}% keep in cash`}
              label="Share of spare money to invest"
            />
            <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-chase-line">
              <div className="bg-chase-blue transition-all" style={{ width: `${a.investPct ?? 0}%` }} />
              <div className="flex-1 bg-[#9CC3F5]" />
            </div>
            <p className="mt-4 text-[12px] text-chase-muted">
              Investing is usually for money you can leave alone for at least 5 years.
            </p>
          </Question>
        )}

        {step === 6 && (
          <Question title="How much up and down are you comfortable with?" hint="There's no right answer. Higher risk doesn't mean higher returns are promised.">
            <div className="space-y-2.5">
              {RISK_OPTIONS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => set({ risk: r.id })}
                  className={`w-full rounded-xl border p-4 text-left ${a.risk === r.id ? 'border-chase-blue bg-chase-sky' : 'border-chase-line'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[17px] font-semibold text-chase-ink">{r.title} risk</span>
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${a.risk === r.id ? 'border-chase-blue bg-chase-blue' : 'border-[#C9D0DA]'}`}>
                      {a.risk === r.id && <CheckIcon className="h-3 w-3 text-white" />}
                    </span>
                  </div>
                  <p className="mt-1 text-[14px] text-chase-ink">{r.line}</p>
                  <p className="mt-1 text-[12px] text-chase-muted">{r.detail}</p>
                  <div className="mt-2">
                    <Tag tone="amber">Capital at risk</Tag>
                  </div>
                </button>
              ))}
            </div>
            <p className="mt-3 text-[12px] text-chase-muted">
              Prototype only: this is not a full suitability check. J.P. Morgan Personal Investing would ask more before you invest.
            </p>
          </Question>
        )}
      </div>

      <div className="space-y-2 border-t border-chase-line bg-white px-6 pb-8 pt-3">
        <Button onClick={next} disabled={!canContinue[step]}>
          {step === QUESTIONS ? 'Save my answers' : 'Continue'}
        </Button>
        <Button variant="ghost" onClick={exit}>
          Not now
        </Button>
      </div>
    </div>
  );
}

function Question({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <div className="animate-fadeIn">
      <h1 className="text-[24px] font-semibold leading-tight text-chase-ink">{title}</h1>
      {hint && <p className="mb-5 mt-2 text-[15px] leading-snug text-chase-muted">{hint}</p>}
      {children}
    </div>
  );
}

function PercentSlider({ value, onChange, caption, label }: { value: number; onChange: (v: number) => void; caption: string; label: string }) {
  return (
    <div className="mt-5">
      <div className="text-center text-[40px] font-semibold text-chase-blue">{value}%</div>
      <div className="mb-3 text-center text-[14px] text-chase-muted">{caption}</div>
      <input
        type="range"
        min={0}
        max={100}
        step={5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-chase-blue"
        aria-label={label}
      />
      <div className="flex justify-between text-[12px] text-chase-muted">
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
}

function Intro({ onStart, onExit }: { onStart: () => void; onExit: () => void }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <div className="flex-1 overflow-y-auto px-6 pt-6">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-chase-sky">
          <ShieldIcon className="h-8 w-8 text-chase-blue" />
        </div>
        <h1 className="text-[28px] font-semibold leading-tight text-chase-ink">Safety Buffer + Invest</h1>
        <p className="mt-3 text-[16px] leading-relaxed text-chase-muted">
          Six quick questions, about one minute. Then on the 1st of each month we'll show how your money splits into:
        </p>
        <ol className="mt-5 space-y-3 text-[15px] text-chase-ink">
          <li className="flex gap-3"><Num n={1} /> Living money, kept in cash</li>
          <li className="flex gap-3"><Num n={2} /> A safety buffer, kept in cash</li>
          <li className="flex gap-3"><Num n={3} /> Spare money you could invest, if you want to</li>
        </ol>
        <div className="mt-6 rounded-xl bg-chase-bg p-3 text-[13px] text-chase-muted">
          This uses a simple, visible formula. It isn't financial advice and we never invest without your go-ahead.
        </div>
        <div className="mt-4">
          <CapitalAtRisk />
        </div>
      </div>
      <div className="space-y-2 px-6 pb-8 pt-3">
        <Button onClick={onStart}>Get started</Button>
        <Button variant="ghost" onClick={onExit}>Not now</Button>
      </div>
    </div>
  );
}

const Num = ({ n }: { n: number }) => (
  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-chase-blue text-[13px] font-semibold text-white">{n}</span>
);

function UnderEighteen({ onBack, onExit }: { onBack: () => void; onExit: () => void }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div className="mb-5 text-[48px]" aria-hidden>🌱</div>
        <h1 className="text-[24px] font-semibold text-chase-ink">Investing starts at 18</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-chase-muted">
          You need to be 18 or over to open an investment account. Building good saving habits now is a great start, and we'll be here when you're ready.
        </p>
      </div>
      <div className="space-y-2 px-6 pb-8">
        <Button onClick={onExit}>Back to home</Button>
        <Button variant="ghost" onClick={onBack}>I entered my age wrongly</Button>
      </div>
    </div>
  );
}

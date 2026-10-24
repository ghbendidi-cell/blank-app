import { useState } from 'react';
import { CONSULTATION_SLOTS, GUIDES, GUIDES_CHECKED, type Block, type GuideId } from '../data/guides';
import { useStore } from '../state/store';
import { StatusBar } from '../components/PhoneChrome';
import { BackArrow, Button, CapitalAtRisk, CheckIcon } from '../components/ui';

/** A guide document opened from the J.P. Morgan Personal Investing "Investments" page. */
export function Guide() {
  const { state, dispatch } = useStore();
  const guide = GUIDES[state.guideId];
  const back = () => dispatch({ type: 'NAVIGATE', screen: 'jpm' });
  const openGuide = (id: GuideId) => dispatch({ type: 'OPEN_GUIDE', guideId: id });
  const checkSpareMoney = () =>
    dispatch({ type: 'NAVIGATE', screen: state.onboarded && state.monthIndex > 0 ? 'summary' : 'onboarding' });

  return (
    <div className="flex h-full flex-col bg-jpm-cream">
      <div className="flex-1 overflow-y-auto" key={guide.id}>
        <StatusBar time="15:21" />
        <div className="flex items-center gap-3 px-5 pb-4 pt-2">
          <button onClick={back} className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EEEFF3]" aria-label="Back to Investments">
            <BackArrow className="h-5 w-5 text-chase-ink" />
          </button>
          <div className="leading-tight text-jpm-brown">
            <div className="font-serif text-[16px]">J.P.Morgan</div>
            <div className="text-[9px] tracking-[0.14em]">PERSONAL INVESTING · GUIDES</div>
          </div>
        </div>

        {/* The document */}
        <article className="mx-3 mb-6 animate-fadeIn rounded-2xl border border-[#E7E1D6] bg-white px-5 pb-6 pt-6 shadow-card">
          <div className="flex items-center gap-2 text-[12px] text-chase-muted">
            <DocIcon /> {guide.readTime} · Checked {GUIDES_CHECKED}
          </div>
          <h1 className="mt-2 font-serif text-[26px] leading-tight text-jpm-brown">{guide.title}</h1>

          <div className="mt-4 rounded-xl bg-chase-accent-soft p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-chase-accent-strong">In short</div>
            <p className="mt-1 text-[15px] leading-relaxed text-chase-ink">{guide.inShort}</p>
          </div>

          {guide.keyNumbers && (
            <dl className="mt-4 grid grid-cols-3 gap-2">
              {guide.keyNumbers.map((k) => (
                <div key={k.label} className="rounded-xl border border-chase-line p-2.5">
                  <dd className="text-[15px] font-semibold leading-tight text-chase-ink">{k.value}</dd>
                  <dt className="mt-1 text-[11px] leading-snug text-chase-muted">{k.label}</dt>
                </div>
              ))}
            </dl>
          )}

          {guide.sections.map((s) => (
            <section key={s.heading} className="mt-6">
              <h2 className="text-[17px] font-semibold text-chase-ink">{s.heading}</h2>
              <div className="mt-2 space-y-3">
                {s.blocks.map((b, i) => (
                  <BlockView key={i} block={b} />
                ))}
              </div>
            </section>
          ))}

          {guide.capitalAtRisk && (
            <div className="mt-6">
              <CapitalAtRisk />
            </div>
          )}

          {guide.id === 'consultation' && <Booking />}

          <p className="mt-6 border-t border-chase-line pt-4 text-[11px] leading-snug text-chase-muted">
            General information, not personal advice. Tax treatment depends on your individual circumstances and may change in the future.
          </p>
          {guide.sources.length > 0 && (
            <div className="mt-3 text-[11px] text-chase-muted">
              <div className="font-semibold">Sources</div>
              <ul className="mt-1 space-y-0.5">
                {guide.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noreferrer" className="underline decoration-chase-line underline-offset-2 hover:text-chase-accent-strong">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>

        {guide.id !== 'consultation' && (
          <div className="space-y-2 px-4 pb-8">
            {guide.id !== 'pension' && <Button onClick={checkSpareMoney}>Check my spare money</Button>}
            <Button variant={guide.id === 'pension' ? 'primary' : 'secondary'} onClick={() => openGuide('consultation')}>
              Book a free consultation
            </Button>
            <Button variant="ghost" onClick={back}>Back to Investments</Button>
          </div>
        )}
      </div>
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return <p className="text-[15px] leading-relaxed text-chase-ink">{block.text}</p>;
    case 'list':
      return (
        <ul className="space-y-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-2.5 text-[15px] leading-relaxed text-chase-ink">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-chase-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div className="overflow-x-auto rounded-xl border border-chase-line">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-chase-bg text-chase-muted">
              <tr>
                {block.head.map((h, i) => (
                  <th key={i} className="px-3 py-2 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-t border-chase-line align-top">
                  {row.map((cell, c) => (
                    <td key={c} className={`px-3 py-2 leading-snug ${c === 0 ? 'font-semibold text-chase-ink' : 'text-chase-ink'}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'callout': {
      const tones = {
        example: 'border-jpm-sand bg-[#FBF7F1]',
        info: 'border-[#F2D5C8] bg-chase-accent-soft',
        warning: 'border-amber-200 bg-amber-50',
      };
      return (
        <div className={`rounded-xl border p-3.5 ${tones[block.tone]}`}>
          <div className="text-[13px] font-semibold text-chase-ink">{block.title}</div>
          <p className="mt-1 text-[14px] leading-relaxed text-chase-ink">{block.text}</p>
        </div>
      );
    }
  }
}

/** Mock booking: pick a slot and a call type. Nothing is really booked. */
function Booking() {
  const [slot, setSlot] = useState<string | null>(null);
  const [mode, setMode] = useState<'Phone call' | 'Video call'>('Phone call');
  const [booked, setBooked] = useState(false);

  if (booked && slot) {
    return (
      <div className="mt-6 animate-fadeIn rounded-xl border border-[#F2D5C8] bg-chase-accent-soft p-4 text-center">
        <div className="mx-auto flex h-12 w-12 animate-pop items-center justify-center rounded-full bg-chase-accent">
          <CheckIcon className="h-6 w-6 text-white" />
        </div>
        <div className="mt-3 text-[17px] font-semibold text-chase-ink">Consultation booked</div>
        <p className="mt-1 text-[14px] text-chase-ink">{slot} · {mode}</p>
        <p className="mt-2 text-[12px] text-chase-muted">Prototype: nothing has actually been booked.</p>
        <button className="mt-3 text-[14px] font-semibold text-chase-accent-strong" onClick={() => setBooked(false)}>
          Change time
        </button>
      </div>
    );
  }

  return (
    <section className="mt-6">
      <h2 className="text-[17px] font-semibold text-chase-ink">Pick a time</h2>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {(['Phone call', 'Video call'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className={`rounded-xl border py-2.5 text-[14px] font-medium ${mode === m ? 'border-chase-accent bg-chase-accent-soft text-chase-accent-strong' : 'border-chase-line text-chase-ink'}`}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="mt-3 space-y-3">
        {CONSULTATION_SLOTS.map((d) => (
          <div key={d.day}>
            <div className="text-[13px] font-semibold text-chase-muted">{d.day}</div>
            <div className="mt-1.5 flex gap-2">
              {d.times.map((t) => {
                const value = `${d.day}, ${t}`;
                return (
                  <button
                    key={t}
                    onClick={() => setSlot(value)}
                    aria-pressed={slot === value}
                    className={`flex-1 rounded-lg border py-2 text-[14px] tabular-nums ${slot === value ? 'border-chase-accent bg-chase-accent text-white' : 'border-chase-line text-chase-ink'}`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <Button className="mt-5" disabled={!slot} onClick={() => setBooked(true)}>
        {slot ? `Book ${slot}` : 'Choose a time'}
      </Button>
    </section>
  );
}

function DocIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8Z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </svg>
  );
}

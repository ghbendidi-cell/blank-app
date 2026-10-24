# Safety Buffer + Invest: clickable prototype

**UCL × JPMorgan Chase case challenge.** Objective 3: *move money sitting idle in cash into investments.*

A mobile-first prototype that feels like one Chase UK app with J.P. Morgan Personal Investing built in.
Once a month the customer gets a **money check**. A transparent formula splits their cash into
**living money**, a **safety buffer**, and **spare money**. They can invest part of the spare money in one tap, after
seeing the fees and the risk.

> All data is mock. No real money, no real accounts, no backend. Logos are placeholders. Not financial advice.

## Run it

```bash
cd chase-invest-prototype
npm install
npm run dev        # open the URL Vite prints (usually http://localhost:5173)
npm test           # unit tests for the maths (calculateBuckets + fees)
npm run build      # type-check + production build into dist/
```

**Live version for the pitch:** https://claude.ai/artifact/YRgSbJrQFEYtu7Xi24Eu8S (private until shared from its Share menu).
To update it, run `npm run build:single`; this writes one self-contained file, `dist/safety-buffer-invest.html`, which is the file that gets published.

Requires Node 18+. On a laptop the app shows inside a 390×844 phone frame, with the **presenter controls** on the
right. On a real phone (< 440 px wide) it goes full screen and the controls sit below.
State is saved in `localStorage`. Use **Reset demo** before presenting.

## Screen flow

1. **Home (Chase)**, rebuilt from the real app: Debit card header with *See card*, Current accounts (*Kyle's Account*, linked *Natwest*), the credit card promo, and the Spend / Save / Invest / Insure tabs.
   **Invest** tab leads to the **J.P. Morgan Personal Investing "Investments" page** (ISAs, General Investment Account, Personal Pension, Book a consultation). The new **Safety Buffer + Invest** card sits on top of it, with the single *Set my buffer* / *Not now* suggestion.
2. **Onboarding.** One question per screen, with a progress bar: age (blocked under 18), dependants, monthly spending (pre-filled from
   3 months of mock transactions), % of savings not needed day to day, % of that to invest, and risk level.
3. **Simulate 1st of the month** (presenter panel). A push notification appears: *"Your monthly money check is ready"*.
4. **Monthly money check.** Living money, safety buffer (editable), spare money split into Invest and Keep in cash.
   All figures are labelled *approx.*, and there is a **How we worked this out** table.
5. **Confirm sheet.** Amount (can be lowered), portfolio, ISA or GIA, estimated yearly costs, *Capital at risk* warning,
   a *Repeat every month* toggle, a "I understand" tick box, then **Confirm** or **Not now**.
6. **Success.** Then home shows **Current account · Savings · Investments** together, plus *"approx. £X above your buffer"*.

## "What you could have earned" pop-up

**Save** tab → *Show me*. Scrolling moves time from year 0 to year 10: the two lines draw themselves, the numbers count up,
captions change at years 0 / 3 / 7 / 10, and at the end the gap is bracketed (+£4,840) with *Learn about investing* /
*Maybe later* and the disclaimer. Scrolling back rewinds it. With reduced motion turned on, the final state is shown at once.

- Maths: `src/logic/growth.ts` (`projectGrowth`, `progressToYear`, `valueAtYear`, captions), tested in `growth.test.ts`.
- Config and all copy: `src/config/growthStory.ts`.
- Component: `src/components/GrowthStoryModal.tsx` (props `initialAmount`, `currency`, `onClose`, `onLearnMore`), render-tested.
- Analytics: `src/logic/analytics.ts` logs `modal_viewed`, `scroll_depth` (25/50/75/100), `learn_more_clicked`, `dismissed` to the console.

## The maths (`src/logic/buckets.ts`)

| Step | Formula (defaults) |
|---|---|
| Living money L | S × 1 month × (1 + 10% × dependants) |
| Safety buffer B | S × (3 + 1 × dependants) months, with 3+ dependants counted as 3 |
| Cash above both A | max(0, Cash − L − B) |
| User's answer D | spare% × Cash |
| **Spare money X** | **min(A, D)**, whichever is more cautious |
| Invest V | invest% × (X + already invested) − already invested, clamped to [0, X], rounded **down** to £10, 0 if < £500 |
| Keep in cash K | X − V |

*Why the "already invested" term?* Without it, each month would re-split the leftover cash and slowly invest the
"keep in cash" share as well. With it, the customer's chosen split holds over time, and only new spare money gets split.

Unit tests (`npm test`) cover: 0 dependants, 3+ cap, very low savings (below the buffer), exactly at the buffer,
spare = 0, invest 0% / 100%, rounding down, below the minimum, bad inputs (NaN, negatives, > 100%), month-2 top-ups,
and the fee tiers.

## 60-second demo script

| Time | Do | Say |
|---|---|---|
| 0–8 s | Show the home screen | "This is the Chase app Kyle already uses. £17,000 is sitting in cash, and most of it isn't working." |
| 8–20 s | **Invest** tab → *Set my buffer* (or *Explore investments* to show the J.P. Morgan page with the new card) and click through the 6 questions (spending is pre-filled) | "One minute, six questions. We pre-fill spending from their own transactions, and we keep living money and a safety buffer in cash first." |
| 20–28 s | **Simulate 1st of the month**, then tap the notification | "On the 1st of every month, one calm notification. No pressure and no daily nagging." |
| 28–40 s | Money check, then open *How we worked this out* | "Living money, a 3-month safety buffer, and spare money. The maths is visible, a simple rule, not a black box and not advice. We take the more cautious of the formula and what Kyle told us." |
| 40–52 s | *Invest £5,100…*. Show fees, Capital at risk, the ISA toggle, Repeat monthly. Tick and confirm. | "Fees and risk are shown before anything happens. One explicit tap. 'Not now' is always one tap away." |
| 52–60 s | Success, then home | "Investments now sit next to the current account and savings, in one app. Next month only new spare money is split, so the safety buffer is never touched." |

**Backup line if asked "why not just auto-invest?":** "Consumer Duty. We want good outcomes and real consent. The
monthly plan prepares the amount, and the customer confirms it with one tap."

## Project structure

```
src/
  logic/buckets.ts        calculateBuckets(): the single rule-based formula (+ tests)
  logic/fees.ts           tiered fee illustration (+ tests)
  data/mock.ts            seed accounts, 3 months of fake spending, ISA allowance
  state/store.tsx         reducer + localStorage persistence
  state/selectors.ts      buckets for the current state
  components/             phone frame, status bar, push notification, tab bar, sheet, UI kit, presenter panel
  screens/                Home, JpmInvestments, Onboarding, MonthlySummary, ConfirmSheet, Success
scripts/build-single-file.mjs   inlines the build into one HTML file for the live link
docs/ASSUMPTIONS_AND_COMPLIANCE.md
```

See [`docs/ASSUMPTIONS_AND_COMPLIANCE.md`](docs/ASSUMPTIONS_AND_COMPLIANCE.md) for what compliance would need to validate.

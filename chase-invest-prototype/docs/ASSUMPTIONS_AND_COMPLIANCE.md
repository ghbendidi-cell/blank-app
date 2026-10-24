# Assumptions and compliance notes

Prototype for a student case challenge. This is **not legal or regulatory advice**. It lists what a compliance team at
Chase UK / J.P. Morgan Personal Investing (JPMPI) would need to validate before anything like this went live.
Items marked **[verify]** come from secondary sources or are placeholders.

## 1. Product assumptions (all editable in code)

| Assumption | Value in prototype | Where | Status |
|---|---|---|---|
| Living money | 1 month of spending, +10% per dependant | `DEFAULT_ASSUMPTIONS` | Design choice, to test with users |
| Safety buffer | 3 months + 1 month per dependant (3+ counted as 3), user can change it to 1–12 months | `DEFAULT_ASSUMPTIONS` | Common "3–6 months" rule of thumb, not a regulatory requirement |
| Spare money | min(cash above buffer, user's declared %) | `calculateBuckets` | Conservative by design |
| Rounding | Down to nearest £10 | `roundingStep` | Design choice |
| Minimum investment | £500 | `minimumInvestment` | **[verify]** secondary source; may differ for regular contributions |
| Platform fee | 0.75% up to £100k, 0.35% above | `logic/fees.ts` | **[verify]** taken from the brief / JPMPI app, check the live tariff |
| Fund costs | 0.20% a year, all portfolios | `FUND_COSTS` | **[verify]** placeholder, real figures vary by portfolio |
| ISA allowance | £20,000 a year, all contributions assumed in the current tax year | `ISA_ALLOWANCE` | **[verify]** each tax year |
| Investment value | Contributions only, no market movement simulated | store | Prototype simplification |
| Mock salary | £2,600 net a month, added from the 2nd simulated month | `data/mock.ts` | Fictional |

What the formula does **not** see: income stability, debts (credit cards, overdraft, BNPL), upcoming large expenses,
other pensions or investments, money held at other banks, or the investment horizon. Each one is a known gap; see section 3.

## 2. Guardrails built into the prototype

- *Capital at risk* is shown at onboarding, on each risk option, on the confirm sheet, on success, and next to the invested balance.
- No return figures, projections or performance anywhere.
- Fees are shown **before** Confirm, in £ and %.
- Nothing is ever invested without an explicit tap on **Confirm**, after ticking an "I understand" box.
  "Repeat every month" only *prepares* next month's amount. It never auto-invests.
- One suggestion per screen, with a visible **Not now** every time. One notification a month.
- Under-18s are blocked with a friendly message.
- The calculation is labelled "rule-based, not financial advice or a personal recommendation", and every number is marked *approx.* / estimate.
- No specific stocks or funds are named. Only the user's chosen risk level of a managed portfolio.

## 3. What compliance would need to validate

### Advice boundary (the most important question)
- **Guidance vs. personal recommendation.** A message such as "Invest £5,100 in your Medium risk portfolio", based on the
  customer's own circumstances, could be read as a *personal recommendation* (regulated advice). Options to assess:
  1. Keep it as **guidance**: neutral wording ("you could…"), the customer chooses every parameter, and the formula is generic and disclosed.
  2. Use the FCA's **targeted support** regime (PS25/22, live from 6 April 2026 **[verify]**). It lets authorised firms suggest
     actions to groups of consumers with common characteristics, and "customers holding excess cash" was one of the
     example use cases. This regime fits the concept well, but it needs its own permission, pre-defined consumer segments,
     and its own disclosures. It is a strong argument for the pitch.
  3. Route into JPMPI's existing **suitability assessment** (COBS 9A for managed portfolios) before the first investment.
     The 6-question onboarding here is **not** a suitability assessment.
- **Risk choice.** The user picks Low/Medium/High themselves. A real flow would map this to JPMPI's risk-profiling and
  capacity-for-loss questions.

### Consumer Duty (PRIN 2A)
- **Consumer understanding.** Test the copy with real users, including people with low financial confidence.
- **Consumer support.** No sludge: stopping the monthly plan and selling or withdrawing must be as easy as starting.
- **Price and value.** Fees on small balances (e.g. ~0.95% a year all-in on £5k) compared with cash interest. A fair value assessment is needed.
- **Foreseeable harm.** Customers with high-interest debt, unstable income, or **vulnerability** (FCA FG21/1) should probably
  not be nudged to invest. Consider exclusion rules, e.g. an overdraft in use or a missed payment.
- Monitor outcomes after launch: drop-outs, early withdrawals, complaints, losses in the first year.

### Financial promotions
- The push notification, home card and in-app copy are probably **financial promotions** (FSMA s21, COBS 4): fair, clear
  and not misleading, with prominent risk warnings, approved by an authorised person.

### Entities and data
- Chase UK (J.P. Morgan Europe Ltd **[verify]**) and JPMPI are different legal entities. Using current-account
  transaction data to drive investment prompts needs a UK GDPR lawful basis and transparent notice and consent.
  Customers should be able to turn off the monthly check.

### ISA rules
- UK residency, 18+ for a Stocks & Shares ISA, annual allowance across *all* the customer's ISAs (the app can't see other
  providers, so it needs a self-declaration), plus the flexible ISA rules.

### Protection messaging
- Cash: FSCS deposit protection up to **£120,000** per person per authorised bank from 1 December 2025 (was £85,000).
- Investments: FSCS covers firm failure up to £85,000, **not** market losses. The copy must not imply that investments are "protected".

## 4. "What you could have earned" pop-up

Scroll-driven illustration on the Savings tab: £5,000 kept in cash vs invested, over 10 years.
All values in `src/config/growthStory.ts`.

| Assumption | Value | Status |
|---|---|---|
| Invested return | 7% a year, compounded monthly via (1 + r)^(1/12) − 1 | **[decide]** long-run S&P 500 nominal returns are roughly 7–10% depending on the period; 7% is the conservative end |
| Cash return | 0% | **[decide]** an easy-access saver pays interest; 0% overstates the gap |
| Fees, tax, FX, inflation | Not modelled | **[decide]** a 0.75% platform fee plus ~0.2% fund costs would bring 7% down to ~6% (£9,840 → ~£8,950) |
| Example amount | £5,000 (not the customer's balance) | Design choice |

Points compliance would need to validate:
- **Title wording.** "What you *could have* earned" reads as hindsight (past performance). The chart is actually a forward
  projection at a fixed rate. Past and future performance information have different rules (COBS 4.6), so the title should match
  what the chart is. Alternative: "What your savings could do".
- **Future performance illustration (COBS 4.6.7).** A single fixed rate is not a "reasonable assumption" unless justified, and the effect of
  charges must be shown. Industry practice is to show a **range** (e.g. low / mid / high), which this pop-up does not do yet.
- **Naming the S&P 500.** J.P. Morgan Personal Investing portfolios are diversified, not S&P 500 trackers, and a USD index adds
  currency risk for a GBP saver. The visible copy says "Invested" (the S&P 500 is only mentioned in the config comment); keep it that way, or
  name the actual portfolio.
- **Disclaimer** is visible on the final screen and read in the screen-reader summary. The wording needs sign-off.
- **Frequency.** The trigger card can be hidden for 30 days; the pop-up never opens on its own.

## 5. Sources

- FCA targeted support, PS25/22: reported via [Slaughter and May](https://www.slaughterandmay.com/insights/new-insights/insurance-outlook-2026-targeted-support/) and [International Adviser](https://international-adviser.com/fca-confirms-introduction-of-targeted-support-from-spring-2026/). Confirm on fca.org.uk.
- FSCS deposit limit: [Bank of England / PRA, Nov 2025](https://www.bankofengland.co.uk/news/2025/november/pra-confirms-fscs-deposit-limit-to-be-increased-to-120000-from-1-december), [FSCS](https://www.fscs.org.uk/what-we-cover/banks-building-societies-credit-unions/deposit-limit-increase/).
- JPMPI fees and minimum: [Money to the Masses comparison](https://moneytothemasses.com/saving-for-your-future/investing/vanguard-vs-nutmeg-what-do-they-offer-and-how-much-do-they-charge) (secondary source; check JPMPI's own fee page).
- FCA Consumer Duty (PRIN 2A, FG22/5), Vulnerable customers (FG21/1), COBS 4 and COBS 9A: FCA Handbook.

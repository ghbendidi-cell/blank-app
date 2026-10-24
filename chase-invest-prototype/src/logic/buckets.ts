/**
 * Safety Buffer + Invest — the single, rule-based calculation behind the prototype.
 *
 * This is a transparent formula, NOT advice and NOT a model. Every constant is an
 * editable assumption and is surfaced to the user in "How we worked this out".
 *
 * Notation (all amounts in £, per month where relevant):
 *   S  = average monthly spending (user-confirmed)
 *   d  = number of financial dependants (0..3, where 3 means "3 or more")
 *   C  = total cash held (current account + savings)
 *   I  = amount already invested through this feature (contributions, not market value)
 *
 *   Living money      L = S × (1 + u × d)                 u = living uplift per dependant
 *   Safety buffer     B = S × (m0 + m1 × d)               m0 = base months, m1 = months per dependant
 *   Cash above buffer A = max(0, C − L − B)
 *   User-declared     D = p_spare × C                     p_spare = "% of savings I don't need day to day"
 *   Spare money       X = min(A, D)                       the more cautious of the two
 *
 *   The invest split targets the user's chosen ratio across ALL spare money, including
 *   what was already invested, so the "keep in cash" share is not eroded month after month:
 *   Target invested   T = p_invest × (X + I)
 *   Suggested invest  V = floor_to_step( clamp(T − I, 0, X) ), and 0 if V < minimum
 *   Keep in cash      K = X − V
 */

export type RiskLevel = 'low' | 'medium' | 'high';

export interface BucketAssumptions {
  /** Months of spending kept as living money before the dependant uplift. */
  livingMonths: number;
  /** Extra fraction of a month's spending added to living money per dependant (0.10 = +10%). */
  livingUpliftPerDependant: number;
  /** Months of spending in the safety buffer for someone with no dependants. */
  bufferBaseMonths: number;
  /** Extra months of buffer per dependant. */
  bufferMonthsPerDependant: number;
  /** Dependants above this number are treated as this number ("3+" → 3). */
  maxDependantsCounted: number;
  /** Suggested amounts are rounded DOWN to this step, so we never overshoot. */
  roundingStep: number;
  /** Below this we don't suggest investing. £500 per a secondary source (Money to the Masses) — verify with JPMPI. */
  minimumInvestment: number;
}

export const DEFAULT_ASSUMPTIONS: BucketAssumptions = {
  livingMonths: 1,
  livingUpliftPerDependant: 0.1,
  bufferBaseMonths: 3,
  bufferMonthsPerDependant: 1,
  maxDependantsCounted: 3,
  roundingStep: 10,
  minimumInvestment: 500,
};

export interface BucketInputs {
  monthlySpending: number;
  dependants: number;
  totalCash: number;
  /** 0..100 — share of total cash savings the user says they do NOT need day to day. */
  spareSavingsPct: number;
  /** 0..100 — share of spare money the user would like invested. */
  investPct: number;
  /** Amount already invested through this feature (contributions). Defaults to 0. */
  alreadyInvested?: number;
}

export type SpareLimitedBy = 'buffer' | 'your-answer' | 'both';

export interface BucketResult {
  livingMoney: number;
  safetyBuffer: number;
  /** C − L − B, can be negative: how far above (or below) the buffer the user is. */
  aboveBuffer: number;
  /** A: cash above living money + buffer, floored at 0. */
  cashAboveBuffer: number;
  /** D: what the user's own answer would allow. */
  declaredSpare: number;
  /** X = min(A, D). */
  spareMoney: number;
  /** Which constraint set the spare amount (for the explanation). */
  spareLimitedBy: SpareLimitedBy;
  targetInvested: number;
  /** V: the single amount we suggest. 0 means "nothing to suggest this month". */
  suggestedInvest: number;
  /** K = X − V. */
  keepInCash: number;
  /** True when the raw amount was positive but below the minimum investment. */
  belowMinimum: boolean;
  /** Effective months used, for display. */
  livingMonthsUsed: number;
  bufferMonthsUsed: number;
  dependantsCounted: number;
}

const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));

/** Treats NaN/±Infinity/negative values as 0 so bad input can never create money. */
const nonNeg = (x: number | undefined) => (Number.isFinite(x) && (x as number) > 0 ? (x as number) : 0);

const pct = (x: number) => clamp(Number.isFinite(x) ? x : 0, 0, 100) / 100;

const floorTo = (x: number, step: number) => (step > 0 ? Math.floor(x / step + 1e-9) * step : x);

/** Rounds to pennies to avoid floating-point artefacts such as 1849.9999999. */
const pennies = (x: number) => Math.round(x * 100) / 100;

export function calculateBuckets(
  inputs: BucketInputs,
  assumptions: BucketAssumptions = DEFAULT_ASSUMPTIONS,
): BucketResult {
  const S = nonNeg(inputs.monthlySpending);
  const C = nonNeg(inputs.totalCash);
  const I = nonNeg(inputs.alreadyInvested);
  const d = Math.min(Math.floor(nonNeg(inputs.dependants)), assumptions.maxDependantsCounted);

  const livingMonthsUsed = assumptions.livingMonths * (1 + assumptions.livingUpliftPerDependant * d);
  const bufferMonthsUsed = assumptions.bufferBaseMonths + assumptions.bufferMonthsPerDependant * d;

  const L = pennies(S * livingMonthsUsed);
  const B = pennies(S * bufferMonthsUsed);
  const aboveBuffer = pennies(C - L - B);
  const A = Math.max(0, aboveBuffer);
  const D = pennies(pct(inputs.spareSavingsPct) * C);
  const X = Math.min(A, D);

  const spareLimitedBy: SpareLimitedBy = A < D ? 'buffer' : D < A ? 'your-answer' : 'both';

  const T = pennies(pct(inputs.investPct) * (X + I));
  const raw = clamp(T - I, 0, X);
  const rounded = floorTo(raw, assumptions.roundingStep);
  const belowMinimum = rounded > 0 && rounded < assumptions.minimumInvestment;
  const V = belowMinimum ? 0 : rounded;

  return {
    livingMoney: L,
    safetyBuffer: B,
    aboveBuffer,
    cashAboveBuffer: A,
    declaredSpare: D,
    spareMoney: X,
    spareLimitedBy,
    targetInvested: T,
    suggestedInvest: V,
    keepInCash: pennies(X - V),
    belowMinimum,
    livingMonthsUsed,
    bufferMonthsUsed,
    dependantsCounted: d,
  };
}

/** "approx. £X" style display, rounded to the nearest £10 (or £1 for small values). */
export function approx(amount: number): string {
  const rounded = Math.abs(amount) >= 100 ? Math.round(amount / 10) * 10 : Math.round(amount);
  return `approx. ${gbp(rounded)}`;
}

export function gbp(amount: number, decimals = 0): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

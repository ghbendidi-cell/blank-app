/**
 * "What you could have earned": pure calculation behind the scroll story.
 *
 * Each series compounds monthly at monthlyRate = (1 + annualRate)^(1/12) − 1, with any monthly
 * contribution added at the end of each month. One data point per year, from year 0 to `years`.
 */
import {
  CAPTION_YEARS,
  DEFAULT_CASH_ANNUAL_RATE,
  DEFAULT_INVEST_ANNUAL_RATE,
  DEFAULT_MONTHLY_CONTRIBUTION,
  DEFAULT_YEARS,
  MAX_AMOUNT,
  MAX_ANNUAL_RATE,
  MAX_YEARS,
  MIN_ANNUAL_RATE,
} from '../config/growthStory';
import { roundForDisplay } from './format';

export interface GrowthInputs {
  initialAmount: number;
  monthlyContribution?: number;
  years?: number;
  cashAnnualRate?: number;
  investAnnualRate?: number;
}

export interface GrowthPoint {
  year: number;
  cash: number;
  invested: number;
}

export interface GrowthProjection {
  /** The inputs actually used, after validation. */
  inputs: Required<GrowthInputs>;
  points: GrowthPoint[];
  finalCash: number;
  finalInvested: number;
  /** finalInvested − finalCash (negative if the invested line ends lower). */
  gap: number;
}

const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));

/** Negative, NaN or infinite amounts become 0; huge amounts are capped. */
const amount = (x: number | undefined) => (Number.isFinite(x) && (x as number) > 0 ? Math.min(x as number, MAX_AMOUNT) : 0);

const rate = (x: number | undefined, fallback: number) =>
  Number.isFinite(x) ? clamp(x as number, MIN_ANNUAL_RATE, MAX_ANNUAL_RATE) : fallback;

export const monthlyRate = (annualRate: number) => Math.pow(1 + annualRate, 1 / 12) - 1;

const pennies = (x: number) => Math.round(x * 100) / 100;

export function sanitizeGrowthInputs(raw: GrowthInputs): Required<GrowthInputs> {
  return {
    initialAmount: amount(raw.initialAmount),
    monthlyContribution: amount(raw.monthlyContribution ?? DEFAULT_MONTHLY_CONTRIBUTION),
    years: Number.isFinite(raw.years) ? clamp(Math.floor(raw.years as number), 1, MAX_YEARS) : DEFAULT_YEARS,
    cashAnnualRate: rate(raw.cashAnnualRate, DEFAULT_CASH_ANNUAL_RATE),
    investAnnualRate: rate(raw.investAnnualRate, DEFAULT_INVEST_ANNUAL_RATE),
  };
}

export function projectGrowth(raw: GrowthInputs): GrowthProjection {
  const inputs = sanitizeGrowthInputs(raw);
  const { initialAmount, monthlyContribution, years } = inputs;
  const cashM = monthlyRate(inputs.cashAnnualRate);
  const investM = monthlyRate(inputs.investAnnualRate);

  let cash = initialAmount;
  let invested = initialAmount;
  const points: GrowthPoint[] = [{ year: 0, cash: initialAmount, invested: initialAmount }];
  for (let month = 1; month <= years * 12; month++) {
    cash = cash * (1 + cashM) + monthlyContribution;
    invested = invested * (1 + investM) + monthlyContribution;
    if (month % 12 === 0) points.push({ year: month / 12, cash: pennies(cash), invested: pennies(invested) });
  }

  const last = points[points.length - 1];
  return { inputs, points, finalCash: last.cash, finalInvested: last.invested, gap: pennies(last.invested - last.cash) };
}

/** Scroll progress (0..1) → time in years (0..years). Clamped; NaN counts as 0. */
export function progressToYear(progress: number, years: number): number {
  const p = Number.isFinite(progress) ? clamp(progress, 0, 1) : 0;
  return p * years;
}

/**
 * Value of a series at a fractional year, for smooth (not stepped) lines and counters.
 * Uses geometric interpolation between yearly points, which is exact for pure compounding,
 * and linear interpolation when a value is 0 or negative.
 */
export function valueAtYear(points: GrowthPoint[], key: 'cash' | 'invested', year: number): number {
  const last = points.length - 1;
  if (last < 0) return 0;
  const t = clamp(Number.isFinite(year) ? year : 0, 0, last);
  const i = Math.min(Math.floor(t), last - 1);
  if (i < 0) return points[0][key];
  const a = points[i][key];
  const b = points[i + 1][key];
  const f = t - i;
  return a > 0 && b > 0 ? a * Math.pow(b / a, f) : a + (b - a) * f;
}

export interface Caption {
  year: number;
  text: string;
}

/** Plain-English captions for the story, built from the computed amounts. */
export function buildCaptions(projection: GrowthProjection, format: (n: number) => string): Caption[] {
  const { inputs, finalCash, finalInvested, gap } = projection;
  const { years, cashAnnualRate, initialAmount, monthlyContribution } = inputs;

  const captions: Caption[] = [
    {
      year: 0,
      text:
        monthlyContribution > 0
          ? `You start with ${format(initialAmount)} and add ${format(monthlyContribution)} a month.`
          : `You start with ${format(initialAmount)}.`,
    },
  ];
  if (CAPTION_YEARS.growthStarts < years) {
    captions.push({
      year: CAPTION_YEARS.growthStarts,
      text:
        cashAnnualRate === 0 && monthlyContribution === 0
          ? 'Cash stays the same. Invested money starts to grow.'
          : 'Cash grows slowly. Invested money starts to grow faster.',
    });
  }
  if (CAPTION_YEARS.compounding < years) {
    captions.push({ year: CAPTION_YEARS.compounding, text: 'Growth builds on past growth. This is called compounding.' });
  }
  // U+2060 WORD JOINER keeps the sign and the amount on the same line.
  const sign = `${gap >= 0 ? '+' : '−'}\u2060`;
  captions.push({
    year: years,
    text: `Cash: ${format(finalCash)}. Invested: about ${format(roundForDisplay(finalInvested))} (${sign}${format(Math.abs(roundForDisplay(gap)))}).`,
  });
  return captions;
}

/** Index of the caption to show at a given (fractional) year: the last milestone reached. */
export function activeCaptionIndex(captions: Caption[], year: number): number {
  let idx = 0;
  captions.forEach((c, i) => {
    if (year >= c.year - 1e-9) idx = i;
  });
  return idx;
}

/** Text summary of the whole chart for screen readers, independent of scrolling. */
export function describeProjection(projection: GrowthProjection, format: (n: number) => string): string {
  const { inputs, finalCash, finalInvested, gap } = projection;
  const pct = (r: number) => `${Math.round(r * 1000) / 10}%`;
  return (
    `Chart comparing ${format(inputs.initialAmount)} kept in cash with the same amount invested, over ${inputs.years} years. ` +
    `Kept in cash at ${pct(inputs.cashAnnualRate)} a year, it ends at ${format(finalCash)}. ` +
    `Invested at a hypothetical ${pct(inputs.investAnnualRate)} a year, it ends at about ${format(roundForDisplay(finalInvested))}, ` +
    `${format(Math.abs(roundForDisplay(gap)))} ${gap >= 0 ? 'more' : 'less'} than cash.`
  );
}

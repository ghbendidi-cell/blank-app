import { describe, it, expect } from 'vitest';
import {
  activeCaptionIndex,
  buildCaptions,
  monthlyRate,
  progressToYear,
  projectGrowth,
  valueAtYear,
} from './growth';
import { formatMoney } from './format';
import { snoozeUntil, isSnoozed } from './snooze';
import { MAX_AMOUNT } from '../config/growthStory';

const fmt = (n: number) => formatMoney(n, 'GBP');
const plain = (s: string) => s.replace(/\u2060/g, '');

describe('projectGrowth', () => {
  it('defaults: 10 years, cash at 0%, invested at 7%, one point per year', () => {
    const p = projectGrowth({ initialAmount: 5000 });
    expect(p.points).toHaveLength(11);
    expect(p.points[0]).toEqual({ year: 0, cash: 5000, invested: 5000 });
    expect(p.finalCash).toBe(5000);
    // Monthly compounding at (1.07)^(1/12) − 1 is exactly 7% a year: 5000 × 1.07^10
    expect(p.finalInvested).toBeCloseTo(5000 * 1.07 ** 10, 1); // 9835.76
    expect(p.gap).toBeCloseTo(4835.76, 1);
  });

  it('monthly rate compounds back to the annual rate', () => {
    expect((1 + monthlyRate(0.07)) ** 12 - 1).toBeCloseTo(0.07, 12);
  });

  it('every yearly point matches A × (1 + r)^year', () => {
    const p = projectGrowth({ initialAmount: 1000, investAnnualRate: 0.1 });
    p.points.forEach((pt) => expect(pt.invested).toBeCloseTo(1000 * 1.1 ** pt.year, 1));
  });

  it('monthly contributions are added to both series', () => {
    const p = projectGrowth({ initialAmount: 0, monthlyContribution: 100, years: 1, investAnnualRate: 0 });
    expect(p.finalCash).toBe(1200);
    expect(p.finalInvested).toBe(1200);
  });

  it('amount = 0: both lines stay at 0', () => {
    const p = projectGrowth({ initialAmount: 0 });
    expect(p.points.every((pt) => pt.cash === 0 && pt.invested === 0)).toBe(true);
    expect(p.gap).toBe(0);
  });

  it('negative or invalid inputs are sanitised, never produce NaN', () => {
    const p = projectGrowth({
      initialAmount: -5000,
      monthlyContribution: Number.NaN,
      years: Number.POSITIVE_INFINITY,
      cashAnnualRate: Number.NaN,
      investAnnualRate: -5,
    });
    expect(p.inputs.initialAmount).toBe(0);
    expect(p.inputs.monthlyContribution).toBe(0);
    expect(p.inputs.years).toBe(10);
    expect(p.inputs.cashAnnualRate).toBe(0);
    expect(p.inputs.investAnnualRate).toBe(-0.99);
    p.points.forEach((pt) => {
      expect(Number.isFinite(pt.cash)).toBe(true);
      expect(Number.isFinite(pt.invested)).toBe(true);
    });
  });

  it('very large amounts are capped and stay finite', () => {
    const p = projectGrowth({ initialAmount: 1e20, years: 50, investAnnualRate: 1 });
    expect(p.inputs.initialAmount).toBe(MAX_AMOUNT);
    expect(Number.isFinite(p.finalInvested)).toBe(true);
  });

  it('fractional and out-of-range years are clamped to whole years in [1, 50]', () => {
    expect(projectGrowth({ initialAmount: 1, years: 3.7 }).points).toHaveLength(4);
    expect(projectGrowth({ initialAmount: 1, years: 0 }).inputs.years).toBe(1);
    expect(projectGrowth({ initialAmount: 1, years: 500 }).inputs.years).toBe(50);
  });
});

describe('progressToYear', () => {
  it('maps 0 → year 0 and 1 → year 10', () => {
    expect(progressToYear(0, 10)).toBe(0);
    expect(progressToYear(1, 10)).toBe(10);
    expect(progressToYear(0.5, 10)).toBe(5);
  });
  it('clamps outside [0, 1] and treats NaN as 0', () => {
    expect(progressToYear(-0.3, 10)).toBe(0);
    expect(progressToYear(1.7, 10)).toBe(10);
    expect(progressToYear(Number.NaN, 10)).toBe(0);
  });
});

describe('valueAtYear (smooth interpolation)', () => {
  const p = projectGrowth({ initialAmount: 5000 });
  it('hits the yearly points exactly', () => {
    expect(valueAtYear(p.points, 'invested', 4)).toBeCloseTo(p.points[4].invested, 6);
    expect(valueAtYear(p.points, 'invested', 10)).toBeCloseTo(p.finalInvested, 6);
  });
  it('is smooth between points (geometric, so exact for compounding)', () => {
    expect(valueAtYear(p.points, 'invested', 2.5)).toBeCloseTo(5000 * 1.07 ** 2.5, 0);
  });
  it('clamps outside the range', () => {
    expect(valueAtYear(p.points, 'invested', -1)).toBe(5000);
    expect(valueAtYear(p.points, 'invested', 99)).toBeCloseTo(p.finalInvested, 6);
  });
  it('works for flat zero series', () => {
    const z = projectGrowth({ initialAmount: 0 });
    expect(valueAtYear(z.points, 'cash', 3.3)).toBe(0);
  });
});

describe('captions', () => {
  const p = projectGrowth({ initialAmount: 5000 });
  const captions = buildCaptions(p, fmt);
  it('use the computed amounts', () => {
    expect(captions.map((c) => c.year)).toEqual([0, 3, 7, 10]);
    expect(captions[0].text).toBe('You start with £5,000.');
    expect(captions[1].text).toBe('Cash stays the same. Invested money starts to grow.');
    expect(plain(captions[3].text)).toBe('Cash: £5,000. Invested: about £9,840 (+£4,840).');
  });
  it('switch with the year shown', () => {
    expect(activeCaptionIndex(captions, 0)).toBe(0);
    expect(activeCaptionIndex(captions, 2.99)).toBe(0);
    expect(activeCaptionIndex(captions, 3)).toBe(1);
    expect(activeCaptionIndex(captions, 9.5)).toBe(2);
    expect(activeCaptionIndex(captions, 10)).toBe(3);
  });
  it('do not claim cash "stays the same" when it earns interest', () => {
    const c = buildCaptions(projectGrowth({ initialAmount: 5000, cashAnnualRate: 0.03 }), fmt);
    expect(c[1].text).toMatch(/Cash grows slowly/);
  });
  it('show a minus sign if the invested line ends lower', () => {
    const c = buildCaptions(projectGrowth({ initialAmount: 5000, investAnnualRate: -0.02 }), fmt);
    expect(plain(c[c.length - 1].text)).toMatch(/\(−£/);
  });
  it('skip milestones beyond a short horizon', () => {
    expect(buildCaptions(projectGrowth({ initialAmount: 5000, years: 2 }), fmt).map((c) => c.year)).toEqual([0, 2]);
  });
});

describe('snooze', () => {
  it('hides for 30 days, then shows again', () => {
    const now = Date.UTC(2026, 9, 24);
    const until = snoozeUntil(now, 30);
    expect(isSnoozed(until, now + 29 * 86_400_000)).toBe(true);
    expect(isSnoozed(until, now + 30 * 86_400_000)).toBe(false);
    expect(isSnoozed(null, now)).toBe(false);
  });
});

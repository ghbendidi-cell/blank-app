import { describe, it, expect } from 'vitest';
import { calculateBuckets, DEFAULT_ASSUMPTIONS, approx, type BucketInputs } from './buckets';

const base: BucketInputs = {
  monthlySpending: 2000,
  dependants: 0,
  totalCash: 20_000,
  spareSavingsPct: 100,
  investPct: 50,
};

describe('calculateBuckets: core formula', () => {
  it('0 dependants: 1 month living + 3 months buffer', () => {
    const r = calculateBuckets(base);
    expect(r.livingMoney).toBe(2000);
    expect(r.safetyBuffer).toBe(6000);
    expect(r.aboveBuffer).toBe(12_000);
    expect(r.spareMoney).toBe(12_000);
    expect(r.suggestedInvest).toBe(6000);
    expect(r.keepInCash).toBe(6000);
  });

  it('buckets always add back up to total cash when above the buffer', () => {
    const r = calculateBuckets({ ...base, spareSavingsPct: 100, investPct: 37 });
    // living + buffer + spare = C when the user's answer is not the binding limit
    expect(r.livingMoney + r.safetyBuffer + r.spareMoney).toBeCloseTo(20_000, 2);
    expect(r.suggestedInvest + r.keepInCash).toBeCloseTo(r.spareMoney, 2);
  });

  it('each dependant adds 10% living money and 1 month of buffer', () => {
    const r = calculateBuckets({ ...base, dependants: 2 });
    expect(r.livingMoney).toBe(2400); // 2000 × 1.2
    expect(r.safetyBuffer).toBe(10_000); // 2000 × (3 + 2)
    expect(r.spareMoney).toBe(7600);
  });

  it('"3 or more" dependants is capped at 3', () => {
    const r3 = calculateBuckets({ ...base, dependants: 3 });
    const r7 = calculateBuckets({ ...base, dependants: 7 });
    expect(r7).toEqual(r3);
    expect(r3.dependantsCounted).toBe(3);
    expect(r3.safetyBuffer).toBe(12_000);
  });

  it('respects edited assumptions (e.g. a 6-month buffer)', () => {
    const r = calculateBuckets(base, { ...DEFAULT_ASSUMPTIONS, bufferBaseMonths: 6 });
    expect(r.safetyBuffer).toBe(12_000);
    expect(r.spareMoney).toBe(6000);
  });
});

describe('calculateBuckets: the more cautious limit wins', () => {
  it('user answer is lower than the formula: answer wins', () => {
    const r = calculateBuckets({ ...base, spareSavingsPct: 25 }); // D = 5000, A = 12000
    expect(r.spareMoney).toBe(5000);
    expect(r.spareLimitedBy).toBe('your-answer');
  });

  it('formula is lower than the answer: buffer wins', () => {
    const r = calculateBuckets({ ...base, spareSavingsPct: 90 }); // D = 18000, A = 12000
    expect(r.spareMoney).toBe(12_000);
    expect(r.spareLimitedBy).toBe('buffer');
  });
});

describe('calculateBuckets: edge cases', () => {
  it('very low savings: below buffer → nothing to invest, shortfall reported', () => {
    const r = calculateBuckets({ ...base, totalCash: 3000 });
    expect(r.aboveBuffer).toBe(-5000);
    expect(r.cashAboveBuffer).toBe(0);
    expect(r.spareMoney).toBe(0);
    expect(r.suggestedInvest).toBe(0);
    expect(r.keepInCash).toBe(0);
    expect(r.spareLimitedBy).toBe('buffer');
  });

  it('exactly at the buffer: spare = 0', () => {
    const r = calculateBuckets({ ...base, totalCash: 8000 });
    expect(r.aboveBuffer).toBe(0);
    expect(r.spareMoney).toBe(0);
    expect(r.suggestedInvest).toBe(0);
  });

  it('user says 0% is spare: spare = 0 even with lots of cash', () => {
    const r = calculateBuckets({ ...base, spareSavingsPct: 0 });
    expect(r.spareMoney).toBe(0);
    expect(r.suggestedInvest).toBe(0);
    expect(r.spareLimitedBy).toBe('your-answer');
  });

  it('invest 0%: everything spare stays in cash', () => {
    const r = calculateBuckets({ ...base, investPct: 0 });
    expect(r.suggestedInvest).toBe(0);
    expect(r.keepInCash).toBe(12_000);
  });

  it('invest 100%: never more than the spare money', () => {
    const r = calculateBuckets({ ...base, investPct: 100 });
    expect(r.suggestedInvest).toBe(12_000);
    expect(r.keepInCash).toBe(0);
  });

  it('zero spending: no buffer can be computed, answer still caps spare', () => {
    const r = calculateBuckets({ ...base, monthlySpending: 0, spareSavingsPct: 50 });
    expect(r.safetyBuffer).toBe(0);
    expect(r.spareMoney).toBe(10_000);
  });

  it('rounds the suggestion DOWN to the nearest £10', () => {
    const r = calculateBuckets({ ...base, totalCash: 8_000 + 1_239, investPct: 100 });
    expect(r.suggestedInvest).toBe(1230);
    expect(r.keepInCash).toBe(9);
  });

  it('below the minimum investment: no suggestion, flagged', () => {
    const r = calculateBuckets({ ...base, totalCash: 8_000 + 900, investPct: 50 }); // 450 < 500
    expect(r.suggestedInvest).toBe(0);
    expect(r.belowMinimum).toBe(true);
    expect(r.keepInCash).toBe(900);
  });

  it('bad input (NaN, negative, >100%) can never create money', () => {
    const r = calculateBuckets({
      monthlySpending: Number.NaN,
      dependants: -2,
      totalCash: -500,
      spareSavingsPct: 250,
      investPct: Number.POSITIVE_INFINITY,
    });
    expect(r.spareMoney).toBe(0);
    expect(r.suggestedInvest).toBe(0);
    expect(r.dependantsCounted).toBe(0);
  });
});

describe('calculateBuckets: following months keep the chosen split', () => {
  it('only tops up towards the target ratio', () => {
    // Month 2: £6,000 already invested, £4,000 of new spare cash, 50% target.
    const r = calculateBuckets({ ...base, totalCash: 12_000, alreadyInvested: 6000 });
    // spare X = 4000, pool = 10000, target = 5000 → already above target → 0
    expect(r.spareMoney).toBe(4000);
    expect(r.suggestedInvest).toBe(0);
    expect(r.keepInCash).toBe(4000);
  });

  it('suggests the gap when below target', () => {
    const r = calculateBuckets({ ...base, totalCash: 16_000, alreadyInvested: 2000 });
    // X = 8000, pool = 10000, target = 5000, gap = 3000
    expect(r.suggestedInvest).toBe(3000);
    expect(r.keepInCash).toBe(5000);
  });
});

describe('approx()', () => {
  it('rounds to £10 and labels the amount as an estimate', () => {
    expect(approx(1234)).toBe('approx. £1,230');
    expect(approx(57)).toBe('approx. £57');
  });
});

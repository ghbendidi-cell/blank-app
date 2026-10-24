import { describe, it, expect } from 'vitest';
import { annualPlatformFee, illustrateFees } from './fees';

describe('fees (placeholder tariff)', () => {
  it('0.75% up to £100k', () => {
    expect(annualPlatformFee(10_000)).toBe(75);
    expect(annualPlatformFee(100_000)).toBe(750);
  });
  it('0.35% on the part above £100k', () => {
    expect(annualPlatformFee(150_000)).toBe(750 + 175);
  });
  it('handles 0 and negatives', () => {
    expect(annualPlatformFee(0)).toBe(0);
    expect(annualPlatformFee(-10)).toBe(0);
  });
  it('illustrates platform fee + fund costs on the portfolio after investing', () => {
    const f = illustrateFees(4000, 1000, 'medium');
    expect(f.portfolioAfter).toBe(5000);
    expect(f.platformFeePerYear).toBe(37.5);
    expect(f.fundCostsPerYear).toBe(10);
    expect(f.totalPerYear).toBe(47.5);
    expect(f.effectiveRate).toBeCloseTo(0.0095, 6);
  });
});

/**
 * Fee illustration. PLACEHOLDER figures taken from the brief (J.P. Morgan Personal
 * Investing app): 0.75% a year on the first £100,000, 0.35% a year above that, plus
 * fund costs. Compliance must confirm the live tariff before any real use.
 */
export const FEE_TIERS = [
  { upTo: 100_000, rate: 0.0075 },
  { upTo: Infinity, rate: 0.0035 },
] as const;

/** PLACEHOLDER average fund cost (ongoing charges figure), varies by portfolio. */
export const FUND_COSTS: Record<'low' | 'medium' | 'high', number> = {
  low: 0.0020,
  medium: 0.0020,
  high: 0.0020,
};

/** Tiered annual platform fee on a portfolio value. */
export function annualPlatformFee(portfolioValue: number): number {
  let remaining = Math.max(0, portfolioValue);
  let lowerBound = 0;
  let fee = 0;
  for (const tier of FEE_TIERS) {
    const band = Math.min(remaining, tier.upTo - lowerBound);
    fee += band * tier.rate;
    remaining -= band;
    lowerBound = tier.upTo;
    if (remaining <= 0) break;
  }
  return Math.round(fee * 100) / 100;
}

export interface FeeIllustration {
  portfolioAfter: number;
  platformFeePerYear: number;
  fundCostsPerYear: number;
  totalPerYear: number;
  /** Total yearly cost as a % of the portfolio after this investment. */
  effectiveRate: number;
}

/** Yearly cost of the whole portfolio after adding `amount`, assuming no market movement. */
export function illustrateFees(
  amount: number,
  alreadyInvested: number,
  risk: 'low' | 'medium' | 'high',
): FeeIllustration {
  const portfolioAfter = Math.max(0, amount) + Math.max(0, alreadyInvested);
  const platformFeePerYear = annualPlatformFee(portfolioAfter);
  const fundCostsPerYear = Math.round(portfolioAfter * FUND_COSTS[risk] * 100) / 100;
  const totalPerYear = Math.round((platformFeePerYear + fundCostsPerYear) * 100) / 100;
  return {
    portfolioAfter,
    platformFeePerYear,
    fundCostsPerYear,
    totalPerYear,
    effectiveRate: portfolioAfter > 0 ? totalPerYear / portfolioAfter : 0,
  };
}

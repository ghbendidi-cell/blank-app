import { calculateBuckets, type BucketResult } from '../logic/buckets';
import { ISA_ALLOWANCE } from '../data/mock';
import { totalCash, totalInvested, type State } from './store';

/** Buckets for the current state, or null before onboarding is complete. */
export function selectBuckets(state: State): BucketResult | null {
  const a = state.answers;
  if (!state.onboarded || a.monthlySpending == null) return null;
  return calculateBuckets(
    {
      monthlySpending: a.monthlySpending,
      dependants: a.dependants ?? 0,
      totalCash: totalCash(state),
      spareSavingsPct: a.spareSavingsPct ?? 0,
      investPct: a.investPct ?? 0,
      alreadyInvested: totalInvested(state),
    },
    state.assumptions,
  );
}

/** Mock: assumes every ISA contribution in the prototype falls in the current tax year. */
export const isaAllowanceLeft = (state: State) => Math.max(0, ISA_ALLOWANCE - state.invested.isa);

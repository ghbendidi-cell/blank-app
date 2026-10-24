import { describe, it, expect } from 'vitest';
import { GUIDES, type GuideId } from './guides';
import { ISA_ALLOWANCE } from './mock';

describe('guides', () => {
  const ids: GuideId[] = ['isa', 'gia', 'pension', 'consultation'];

  it('every card on the Investments page has a complete guide', () => {
    ids.forEach((id) => {
      const g = GUIDES[id];
      expect(g.id).toBe(id);
      expect(g.title.length).toBeGreaterThan(0);
      expect(g.inShort.length).toBeGreaterThan(0);
      expect(g.sections.length).toBeGreaterThan(0);
    });
  });

  it('investment guides carry a capital-at-risk warning and sources', () => {
    (['isa', 'gia', 'pension'] as const).forEach((id) => {
      expect(GUIDES[id].capitalAtRisk).toBe(true);
      expect(GUIDES[id].sources.length).toBeGreaterThan(0);
    });
  });

  it('the ISA guide uses the same allowance as the rest of the app', () => {
    const allowance = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(ISA_ALLOWANCE);
    expect(JSON.stringify(GUIDES.isa)).toContain(allowance);
  });
});

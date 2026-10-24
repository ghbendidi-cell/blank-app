import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { GrowthStoryModal } from './GrowthStoryModal';
import { GROWTH_COPY } from '../config/growthStory';

const noop = () => {};
const render = (reducedMotion: boolean, initialAmount = 5000) =>
  renderToStaticMarkup(
    <GrowthStoryModal initialAmount={initialAmount} currency="GBP" onClose={noop} onLearnMore={noop} reducedMotion={reducedMotion} />,
  );
const text = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/\u2060/g, '').replace(/\s+/g, ' ');

describe('GrowthStoryModal: animated path (first frame)', () => {
  const html = render(false);

  it('is an accessible modal dialog with a title, close button and chart summary', () => {
    expect(html).toMatch(/role="dialog"/);
    expect(html).toMatch(/aria-modal="true"/);
    expect(html).toMatch(/aria-labelledby="[^"]+"/);
    expect(html).toMatch(/aria-describedby="[^"]+"/);
    expect(html).toContain(`aria-label="${GROWTH_COPY.close}"`);
    expect(text(html)).toContain(GROWTH_COPY.title);
    // The screen-reader summary does not depend on scrolling.
    expect(text(html)).toMatch(/ends at about £9,840, £4,840 more than cash/);
  });

  it('starts at year 0 with both values at the initial amount', () => {
    expect(text(html)).toContain('Year 0');
    expect(html).toMatch(/tabular-nums text-chase-ink">£5,000</);
    expect(html).toMatch(/tabular-nums text-chase-blue">£5,000</);
  });

  it('shows the scroll hint and hides the end state until the end', () => {
    expect(text(html)).toContain('Scroll to see 10 years');
    expect(html).toMatch(/<g style="opacity:0;[^"]*" data-testid="growth-gap">/);
    expect(html).toContain('data-visible="false"');
  });

  it('keeps the buttons and disclaimer in the DOM so keyboard and screen readers can reach them', () => {
    expect(text(html)).toContain(GROWTH_COPY.learnMore);
    expect(text(html)).toContain(GROWTH_COPY.maybeLater);
    expect(text(html)).toContain(GROWTH_COPY.disclaimer);
    expect(html).toContain('focus-within:opacity-100');
  });
});

describe('GrowthStoryModal: reduced-motion path', () => {
  const html = render(true);

  it('shows the final state straight away, with no scroll track or hint', () => {
    expect(text(html)).toContain('Year 10');
    expect(html).toMatch(/tabular-nums text-chase-blue">£9,836</);
    expect(text(html)).not.toContain('Scroll to see');
    expect(html).toContain('data-visible="true"');
    expect(html).toMatch(/<g style="opacity:1;[^"]*" data-testid="growth-gap">/);
    expect(html).not.toContain('h-[3200px]');
  });

  it('lists every caption, with computed amounts', () => {
    const t = text(html);
    expect(t).toContain('You start with £5,000.');
    expect(t).toContain('Cash stays the same. Invested money starts to grow.');
    expect(t).toContain('This is called compounding.');
    expect(t).toContain('Cash: £5,000. Invested: about £9,840 (+£4,840).');
  });

  it('shows the gap bracket label and the disclaimer', () => {
    expect(text(html)).toContain('+£4,840');
    expect(text(html)).toContain(GROWTH_COPY.disclaimer);
  });
});

describe('GrowthStoryModal: edge cases render without crashing', () => {
  it('amount = 0', () => {
    expect(text(render(true, 0))).toContain('You start with £0.');
  });
  it('negative amount is treated as 0', () => {
    expect(text(render(true, -100))).toContain('You start with £0.');
  });
});

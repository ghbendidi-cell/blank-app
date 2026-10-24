/**
 * Configuration for the "What you could have earned" pop-up. Every number and every piece of
 * copy the pop-up shows comes from here or is computed from these values.
 */

/**
 * Hypothetical average annual return for the "Invested" line.
 *
 * The long-run S&P 500 nominal total return has been roughly 7–10% a year, depending on the
 * period measured (and before fees, tax, currency effects and inflation). We use a conservative
 * 7% default. It is an illustration only: never present it as a promise or a forecast.
 */
export const DEFAULT_INVEST_ANNUAL_RATE = 0.07;

/** Cash is shown earning nothing, to isolate the effect of investing. Set > 0 to model interest. */
export const DEFAULT_CASH_ANNUAL_RATE = 0;

export const DEFAULT_YEARS = 10;
export const DEFAULT_MONTHLY_CONTRIBUTION = 0;

/** Example amount used by the savings-screen trigger. */
export const DEFAULT_INITIAL_AMOUNT = 5_000;

/** Input guards: anything above is capped so formatting and the chart stay sane. */
export const MAX_AMOUNT = 1_000_000_000;
export const MAX_YEARS = 50;
export const MIN_ANNUAL_RATE = -0.99;
export const MAX_ANNUAL_RATE = 1;

/** Height of the scroll track, in screens. Higher = slower story. */
export const SCROLL_TRACK_SCREENS = 4;

/** Progress at which the end state (gap bracket, buttons) is shown. */
export const END_PROGRESS = 0.995;

/** Scroll-depth analytics thresholds, in %. */
export const SCROLL_DEPTH_MILESTONES = [25, 50, 75, 100] as const;

/** Captions appear at these years (the first and last are always year 0 and the final year). */
export const CAPTION_YEARS = { growthStarts: 3, compounding: 7 } as const;

/** "Don't show again" period for the trigger card. */
export const PROMO_SNOOZE_DAYS = 30;

export const GROWTH_COPY = {
  title: 'What you could have earned',
  scrollHint: (years: number) => `Scroll to see ${years} years`,
  yearLabel: (year: number) => `Year ${year}`,
  cashLabel: 'Cash',
  investedLabel: 'Invested',
  learnMore: 'Learn about investing',
  maybeLater: 'Maybe later',
  close: 'Close',
  disclaimer:
    'Illustrative example only, based on a hypothetical average annual return. Past performance is not a guarantee of future results. The value of investments can go down as well as up, and you may get back less than you put in. Inflation is not included.',
  trigger: {
    title: (amount: string, years: number) => `What could ${amount} do in ${years} years?`,
    body: 'See how keeping it in cash compares with investing it. Takes 30 seconds.',
    cta: 'Show me',
    hide: 'Hide for 30 days',
  },
};

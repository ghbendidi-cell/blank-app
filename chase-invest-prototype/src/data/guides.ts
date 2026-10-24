/**
 * Explainer guides opened from the J.P. Morgan Personal Investing "Investments" page.
 *
 * UK figures are for the 2026/27 tax year (6 April 2026 – 5 April 2027), checked October 2026
 * against GOV.UK and secondary sources (see each guide's `sources`). Product minimums are
 * from a secondary source and marked as such. Compliance must re-check every figure before use.
 */
import { ISA_ALLOWANCE } from './mock';
import { formatMoney } from '../logic/format';

export type GuideId = 'isa' | 'gia' | 'pension' | 'consultation';

export type Block =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'callout'; tone: 'example' | 'info' | 'warning'; title: string; text: string };

export interface Guide {
  id: GuideId;
  title: string;
  readTime: string;
  inShort: string;
  keyNumbers?: { label: string; value: string }[];
  sections: { heading: string; blocks: Block[] }[];
  capitalAtRisk: boolean;
  sources: { label: string; url: string }[];
}

export const GUIDES_CHECKED = 'October 2026';
export const TAX_YEAR = '2026/27';

const gbp = (n: number) => formatMoney(n, 'GBP');

export const GUIDES: Record<GuideId, Guide> = {
  isa: {
    id: 'isa',
    title: 'ISAs, explained',
    readTime: '3 min read',
    inShort:
      'An ISA (Individual Savings Account) is a tax-free "wrapper" for your savings or investments. Interest, dividends and growth inside it are free from UK tax.',
    keyNumbers: [
      { label: `ISA allowance ${TAX_YEAR}`, value: gbp(ISA_ALLOWANCE) },
      { label: 'Lifetime ISA a year, + 25% bonus', value: '£4,000' },
      { label: 'Junior ISA, per child per year', value: '£9,000' },
    ],
    sections: [
      {
        heading: 'How it works',
        blocks: [
          {
            type: 'list',
            items: [
              `You can put up to ${gbp(ISA_ALLOWANCE)} into ISAs each tax year (6 April to 5 April). You can split it across different types of ISA.`,
              'The allowance resets every April. Any allowance you don’t use is lost; it doesn’t carry over.',
              'Taking money out doesn’t create a tax bill.',
              'You need to be a UK resident. For a Stocks & Shares ISA you must be 18 or over.',
            ],
          },
        ],
      },
      {
        heading: 'The four types of ISA',
        blocks: [
          {
            type: 'table',
            head: ['Type', 'What it is', 'Risk'],
            rows: [
              ['Cash ISA', 'A savings account. Interest is tax-free.', 'No investment risk'],
              ['Stocks & Shares ISA', 'Invest in funds and shares. Growth and dividends are tax-free.', 'Capital at risk'],
              [
                'Lifetime ISA',
                'Open at 18–39. Pay in up to £4,000 a year and the government adds 25% (up to £1,000). For a first home (up to £450,000) or from age 60.',
                'Withdraw for anything else and you pay a 25% charge, so you can get back less than you put in',
              ],
              ['Junior ISA', 'For under-18s. Up to £9,000 a year. The child gets access at 18.', 'Cash or investments'],
            ],
          },
          { type: 'p', text: 'Lifetime ISA payments count towards your overall ISA allowance.' },
        ],
      },
      {
        heading: 'Changing in April 2027',
        blocks: [
          {
            type: 'callout',
            tone: 'info',
            title: 'New cash ISA limit for under-65s',
            text: `From 6 April 2027, if you're under 65 you can put up to £12,000 a year into cash ISAs. The overall ${gbp(ISA_ALLOWANCE)} allowance stays the same, so the rest can go into a Stocks & Shares ISA. Money already in a cash ISA isn't affected.`,
          },
        ],
      },
      {
        heading: 'Example',
        blocks: [
          {
            type: 'callout',
            tone: 'example',
            title: 'Hypothetical example',
            text: 'Kyle invests £5,000 in a Stocks & Shares ISA. If it grew to £9,000, the £4,000 gain would be free of tax, whenever he takes it out. Held in a General Investment Account, the part of the gain above the £3,000 yearly allowance could be taxed when he sells. This is an illustration, not a forecast.',
          },
        ],
      },
      {
        heading: 'With J.P. Morgan Personal Investing',
        blocks: [
          {
            type: 'list',
            items: [
              'Stocks & Shares ISA: invest from £500.',
              'Lifetime ISA and Junior ISA: invest from £100.',
              'Prototype note: minimums are from a secondary source. Check the current product range.',
            ],
          },
        ],
      },
    ],
    capitalAtRisk: true,
    sources: [
      { label: 'GOV.UK: Individual Savings Accounts', url: 'https://www.gov.uk/individual-savings-accounts' },
      { label: 'GOV.UK: Lifetime ISA', url: 'https://www.gov.uk/lifetime-isa' },
      { label: 'GOV.UK: Junior ISAs', url: 'https://www.gov.uk/junior-individual-savings-accounts' },
    ],
  },

  gia: {
    id: 'gia',
    title: 'General Investment Accounts, explained',
    readTime: '3 min read',
    inShort:
      'A General Investment Account (GIA) is a standard investment account with no limit on how much you can pay in. Unlike an ISA, your returns can be taxed.',
    keyNumbers: [
      { label: 'Tax-free dividends a year', value: '£500' },
      { label: 'Tax-free gains a year', value: '£3,000' },
      { label: 'Yearly pay-in limit', value: 'None' },
    ],
    sections: [
      {
        heading: 'When people use one',
        blocks: [
          {
            type: 'list',
            items: [
              `You've already used your ${gbp(ISA_ALLOWANCE)} ISA allowance this tax year.`,
              'You want to invest a large amount in one go.',
              'You want to be able to take money out at any time, with no age limits.',
            ],
          },
        ],
      },
      {
        heading: `How tax works (${TAX_YEAR})`,
        blocks: [
          {
            type: 'table',
            head: ['What you earn', 'Tax-free each year', 'Then taxed at'],
            rows: [
              ['Dividends', '£500 (dividend allowance)', '10.75% basic rate · 35.75% higher · 39.35% additional'],
              ['Gains when you sell', '£3,000 (annual exempt amount)', '18% basic rate · 24% higher and additional'],
              ['Interest (e.g. bond funds)', '£1,000 basic rate · £500 higher rate', 'Your income tax rate'],
            ],
          },
          { type: 'p', text: 'Which rate applies depends on your total income. You report and pay this tax yourself, usually through Self Assessment.' },
        ],
      },
      {
        heading: 'Example',
        blocks: [
          {
            type: 'callout',
            tone: 'example',
            title: 'Hypothetical example',
            text: 'You sell investments with a £10,000 gain. The first £3,000 is tax-free. If the other £7,000 all falls in the basic-rate band, you pay 18%: £1,260. In an ISA, you would pay nothing.',
          },
        ],
      },
      {
        heading: 'A common approach: "Bed and ISA"',
        blocks: [
          {
            type: 'p',
            text: 'Each April, some investors sell part of their GIA and buy the same investments inside their ISA, up to the new allowance. Future growth on that money is then tax-free. Selling can trigger a gain, so check the £3,000 allowance first.',
          },
        ],
      },
    ],
    capitalAtRisk: true,
    sources: [
      { label: 'GOV.UK: Tax on dividends', url: 'https://www.gov.uk/tax-on-dividends' },
      { label: 'GOV.UK: Capital Gains Tax allowances', url: 'https://www.gov.uk/capital-gains-tax/allowances' },
      { label: 'GOV.UK: Capital Gains Tax rates', url: 'https://www.gov.uk/capital-gains-tax/rates' },
    ],
  },

  pension: {
    id: 'pension',
    title: 'Personal Pensions, explained',
    readTime: '4 min read',
    inShort:
      'A personal pension is a long-term investment for retirement. The government adds tax relief to what you pay in, but you usually can’t take the money out until age 55 (57 from April 2028).',
    keyNumbers: [
      { label: 'You pay £80, your pension gets', value: '£100' },
      { label: 'Annual allowance', value: '£60,000' },
      { label: 'Earliest access (from 2028)', value: 'Age 57' },
    ],
    sections: [
      {
        heading: 'Tax relief: the main benefit',
        blocks: [
          {
            type: 'p',
            text: 'For every £80 you pay in, the government adds £20 of basic-rate tax relief, so £100 goes into your pension. Higher and additional-rate taxpayers can claim more back through their tax return. Rates differ in Scotland.',
          },
        ],
      },
      {
        heading: 'Limits',
        blocks: [
          {
            type: 'list',
            items: [
              'You get tax relief on up to 100% of your earnings, capped at £60,000 a year (the annual allowance), including any employer payments.',
              'With no earnings, you can still pay in up to £3,600 a year (£2,880 from you + £720 relief).',
              'The allowance is lower for very high earners, and unused allowance from the last 3 years can sometimes be carried forward.',
            ],
          },
        ],
      },
      {
        heading: 'Taking money out',
        blocks: [
          {
            type: 'list',
            items: [
              'From age 55, rising to 57 on 6 April 2028.',
              'Usually 25% can be taken tax-free, up to £268,275 in total (the lump sum allowance).',
              'The rest is taxed as income when you take it.',
            ],
          },
        ],
      },
      {
        heading: 'Pension or ISA?',
        blocks: [
          {
            type: 'table',
            head: ['', 'Personal Pension', 'Stocks & Shares ISA'],
            rows: [
              ['Tax relief when you pay in', 'Yes (20%+)', 'No'],
              ['Tax on growth', 'None', 'None'],
              ['When you can take money out', 'From 55 (57 from 2028)', 'Any time'],
              ['Tax when you take it out', '25% tax-free, rest taxed as income', 'None'],
            ],
          },
          {
            type: 'callout',
            tone: 'info',
            title: 'Check your workplace pension too',
            text: 'If you’re employed, you may already have a workplace pension where your employer also pays in.',
          },
        ],
      },
      {
        heading: 'With J.P. Morgan Personal Investing',
        blocks: [
          {
            type: 'list',
            items: [
              'Invest from £500.',
              'Prototype note: minimum from a secondary source. Check the current product details.',
            ],
          },
        ],
      },
    ],
    capitalAtRisk: true,
    sources: [
      { label: 'GOV.UK: Pension tax relief', url: 'https://www.gov.uk/tax-on-your-private-pension/pension-tax-relief' },
      { label: 'GOV.UK: Annual allowance', url: 'https://www.gov.uk/tax-on-your-private-pension/annual-allowance' },
      { label: 'MoneyHelper: Pensions and retirement', url: 'https://www.moneyhelper.org.uk/en/pensions-and-retirement' },
    ],
  },

  consultation: {
    id: 'consultation',
    title: 'Free investment consultation',
    readTime: '1 min read',
    inShort:
      'A call with J.P. Morgan Personal Investing’s team to talk through your goals and your options. It’s free and there’s no obligation to invest.',
    sections: [
      {
        heading: 'What you can ask about',
        blocks: [
          {
            type: 'list',
            items: [
              'How ISAs, General Investment Accounts and pensions differ.',
              'How managed portfolios and risk levels work.',
              'How fees are worked out.',
              'How to get started, or move an ISA or pension from another provider.',
            ],
          },
        ],
      },
      {
        heading: 'Useful to have ready',
        blocks: [
          {
            type: 'list',
            items: [
              'A rough idea of your savings and monthly spending.',
              'Any ISAs or pensions you already have.',
              'What you’re saving for, and when you might need the money.',
            ],
          },
        ],
      },
      {
        heading: 'Good to know',
        blocks: [
          {
            type: 'callout',
            tone: 'warning',
            title: 'Prototype',
            text: 'This prototype doesn’t book real appointments. The call length, and whether the call includes regulated financial advice (which can carry a fee), are placeholders to confirm with J.P. Morgan Personal Investing.',
          },
        ],
      },
    ],
    capitalAtRisk: false,
    sources: [],
  },
};

/** Mock booking slots: the next weekdays after the prototype's "today" (Saturday 24 October 2026). */
export const CONSULTATION_SLOTS = [
  { day: 'Mon 26 Oct', times: ['09:30', '12:00', '17:30'] },
  { day: 'Tue 27 Oct', times: ['10:00', '14:00', '18:00'] },
  { day: 'Wed 28 Oct', times: ['09:00', '13:30', '16:00'] },
];

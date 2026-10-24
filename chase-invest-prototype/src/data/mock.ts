/** All data below is fictional seed data for the prototype. */

export const MOCK_USER = { firstName: 'Alex' };

export const SEED_ACCOUNTS = {
  current: 2_400,
  savings: 14_600,
};

/** Net monthly income used when the presenter simulates the next month (mock). */
export const MOCK_NET_MONTHLY_INCOME = 2_600;

export interface SpendingMonth {
  month: string;
  categories: { name: string; amount: number }[];
}

export const MOCK_SPENDING: SpendingMonth[] = [
  {
    month: 'July',
    categories: [
      { name: 'Rent', amount: 950 },
      { name: 'Groceries', amount: 310 },
      { name: 'Transport', amount: 140 },
      { name: 'Bills & phone', amount: 165 },
      { name: 'Eating out', amount: 180 },
      { name: 'Other', amount: 95 },
    ],
  },
  {
    month: 'August',
    categories: [
      { name: 'Rent', amount: 950 },
      { name: 'Groceries', amount: 295 },
      { name: 'Transport', amount: 120 },
      { name: 'Bills & phone', amount: 165 },
      { name: 'Eating out', amount: 240 },
      { name: 'Other', amount: 150 },
    ],
  },
  {
    month: 'September',
    categories: [
      { name: 'Rent', amount: 950 },
      { name: 'Groceries', amount: 325 },
      { name: 'Transport', amount: 150 },
      { name: 'Bills & phone', amount: 170 },
      { name: 'Eating out', amount: 160 },
      { name: 'Other', amount: 115 },
    ],
  },
];

export const monthTotal = (m: SpendingMonth) => m.categories.reduce((s, c) => s + c.amount, 0);

export function averageMonthlySpending(months: SpendingMonth[] = MOCK_SPENDING): number {
  if (months.length === 0) return 0;
  return Math.round(months.reduce((s, m) => s + monthTotal(m), 0) / months.length);
}

/** Stocks & shares ISA allowance (£20,000 for 2026/27 — verify each tax year). */
export const ISA_ALLOWANCE = 20_000;

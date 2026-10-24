/** Locale utilities shared by every screen. One cached Intl formatter per (currency, decimals). */
export const LOCALE = 'en-GB';

const formatters = new Map<string, Intl.NumberFormat>();

export function formatMoney(amount: number, currency = 'GBP', decimals = 0): string {
  const key = `${currency}:${decimals}`;
  let f = formatters.get(key);
  if (!f) {
    f = new Intl.NumberFormat(LOCALE, {
      style: 'currency',
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    formatters.set(key, f);
  }
  return f.format(amount);
}

/** Rounds an "about" figure: to the nearest 10 from 100 upwards, to the nearest unit below. */
export function roundForDisplay(amount: number): number {
  return Math.abs(amount) >= 100 ? Math.round(amount / 10) * 10 : Math.round(amount);
}

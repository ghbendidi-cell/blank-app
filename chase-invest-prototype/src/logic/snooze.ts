const DAY_MS = 24 * 60 * 60 * 1000;

/** Timestamp until which something stays hidden, `days` from `now`. */
export const snoozeUntil = (now: number, days: number) => now + days * DAY_MS;

/** True while `until` is in the future. A missing or invalid value never hides anything. */
export const isSnoozed = (until: number | null | undefined, now: number) =>
  typeof until === 'number' && Number.isFinite(until) && now < until;

/**
 * Minimal analytics wrapper. The prototype has no analytics vendor, so events are kept in
 * memory, logged to the console and dispatched as a DOM event. Swap the body of `track` for
 * the real SDK call; call sites stay the same.
 */
export type AnalyticsEventName = 'modal_viewed' | 'scroll_depth' | 'learn_more_clicked' | 'dismissed';

export interface AnalyticsEvent {
  name: AnalyticsEventName;
  props: Record<string, string | number | boolean>;
  at: number;
}

const events: AnalyticsEvent[] = [];

export function track(name: AnalyticsEventName, props: AnalyticsEvent['props'] = {}): void {
  const event = { name, props, at: Date.now() };
  events.push(event);
  if (typeof window !== 'undefined') {
    console.debug('[analytics]', name, props);
    window.dispatchEvent(new CustomEvent('analytics', { detail: event }));
  }
}

/** For tests and the presenter panel. */
export const trackedEvents = (): readonly AnalyticsEvent[] => events;
export const clearTrackedEvents = () => {
  events.length = 0;
};

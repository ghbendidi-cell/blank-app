import { createContext, useContext, useEffect, useReducer, type Dispatch, type ReactNode } from 'react';
import { DEFAULT_ASSUMPTIONS, type BucketAssumptions, type RiskLevel } from '../logic/buckets';
import { MOCK_NET_MONTHLY_INCOME, SEED_ACCOUNTS } from '../data/mock';

export type Screen = 'home' | 'jpm' | 'onboarding' | 'summary' | 'success';
export type HomeTab = 'spend' | 'save' | 'invest' | 'insure';
export type Wrapper = 'isa' | 'gia';

export interface Answers {
  age: number | null;
  dependants: number | null;
  monthlySpending: number | null;
  spareSavingsPct: number | null;
  investPct: number | null;
  risk: RiskLevel | null;
}

export interface Investment {
  id: string;
  dateLabel: string;
  amount: number;
  wrapper: Wrapper;
  risk: RiskLevel;
  recurring: boolean;
}

export interface State {
  screen: Screen;
  homeTab: HomeTab;
  onboarded: boolean;
  answers: Answers;
  assumptions: BucketAssumptions;
  accounts: { current: number; savings: number };
  /** Contributions only: the prototype simulates no market movement. */
  invested: { isa: number; gia: number };
  /** 0 = before the first simulated "1st of the month". */
  monthIndex: number;
  notificationVisible: boolean;
  /**
   * The user switched on "repeat every month": each month's check prepares the investment
   * with the same wrapper, ready to confirm. It still needs one tap — nothing is automatic.
   */
  monthlyPlan: { active: boolean; wrapper: Wrapper } | null;
  history: Investment[];
  lastInvestment: Investment | null;
  /** Short message for buttons that are outside the prototype's scope. */
  toast: string | null;
  creditCardPromoDismissed: boolean;
}

export const EMPTY_ANSWERS: Answers = {
  age: null,
  dependants: null,
  monthlySpending: null,
  spareSavingsPct: null,
  investPct: null,
  risk: null,
};

export const INITIAL_STATE: State = {
  screen: 'home',
  homeTab: 'spend',
  onboarded: false,
  answers: EMPTY_ANSWERS,
  assumptions: DEFAULT_ASSUMPTIONS,
  accounts: { ...SEED_ACCOUNTS },
  invested: { isa: 0, gia: 0 },
  monthIndex: 0,
  notificationVisible: false,
  monthlyPlan: null,
  history: [],
  lastInvestment: null,
  toast: null,
  creditCardPromoDismissed: false,
};

/** The prototype's "today" is October 2026, so the first simulated check is 1 November 2026. */
export function monthLabel(monthIndex: number): string {
  const d = new Date(2026, 9 + Math.max(1, monthIndex), 1);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export const totalCash = (s: State) => s.accounts.current + s.accounts.savings;
export const totalInvested = (s: State) => s.invested.isa + s.invested.gia;

export type Action =
  | { type: 'NAVIGATE'; screen: Screen }
  | { type: 'SET_HOME_TAB'; tab: HomeTab }
  | { type: 'COMPLETE_ONBOARDING'; answers: Answers }
  | { type: 'SET_ASSUMPTIONS'; assumptions: BucketAssumptions }
  | { type: 'SIMULATE_MONTH' }
  | { type: 'OPEN_NOTIFICATION' }
  | { type: 'DISMISS_NOTIFICATION' }
  | { type: 'INVEST'; amount: number; wrapper: Wrapper; repeat: boolean }
  | { type: 'STOP_MONTHLY_PLAN' }
  | { type: 'SHOW_TOAST'; message: string }
  | { type: 'HIDE_TOAST' }
  | { type: 'DISMISS_CREDIT_CARD_PROMO' }
  | { type: 'RESET' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, screen: action.screen, notificationVisible: false };
    case 'SET_HOME_TAB':
      return { ...state, homeTab: action.tab };
    case 'COMPLETE_ONBOARDING':
      return { ...state, answers: action.answers, onboarded: true, screen: 'home', homeTab: 'invest' };
    case 'SET_ASSUMPTIONS':
      return { ...state, assumptions: action.assumptions };
    case 'SIMULATE_MONTH': {
      // From the second simulated month on, last month's mock salary minus the user's
      // declared spending lands in the current account.
      const spending = state.answers.monthlySpending ?? 0;
      const net = state.monthIndex === 0 ? 0 : Math.max(0, MOCK_NET_MONTHLY_INCOME - spending);
      return {
        ...state,
        monthIndex: state.monthIndex + 1,
        accounts: { ...state.accounts, current: state.accounts.current + net },
        notificationVisible: true,
        screen: state.screen === 'success' ? 'home' : state.screen,
      };
    }
    case 'OPEN_NOTIFICATION':
      return { ...state, notificationVisible: false, screen: 'summary' };
    case 'DISMISS_NOTIFICATION':
      return { ...state, notificationVisible: false };
    case 'INVEST': {
      const risk = state.answers.risk;
      if (!risk || action.amount <= 0 || action.amount > totalCash(state)) return state;
      // Take from savings first, then the current account.
      const fromSavings = Math.min(state.accounts.savings, action.amount);
      const fromCurrent = action.amount - fromSavings;
      const inv: Investment = {
        id: `${state.monthIndex}-${state.history.length}`,
        dateLabel: monthLabel(state.monthIndex),
        amount: action.amount,
        wrapper: action.wrapper,
        risk,
        recurring: action.repeat,
      };
      return {
        ...state,
        accounts: {
          savings: state.accounts.savings - fromSavings,
          current: state.accounts.current - fromCurrent,
        },
        invested: { ...state.invested, [action.wrapper]: state.invested[action.wrapper] + action.amount },
        monthlyPlan: action.repeat
          ? { active: true, wrapper: action.wrapper }
          : state.monthlyPlan,
        history: [inv, ...state.history],
        lastInvestment: inv,
        screen: 'success',
      };
    }
    case 'STOP_MONTHLY_PLAN':
      return { ...state, monthlyPlan: state.monthlyPlan ? { ...state.monthlyPlan, active: false } : null };
    case 'SHOW_TOAST':
      return { ...state, toast: action.message };
    case 'HIDE_TOAST':
      return { ...state, toast: null };
    case 'DISMISS_CREDIT_CARD_PROMO':
      return { ...state, creditCardPromoDismissed: true };
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
}

const STORAGE_KEY = 'safety-buffer-invest:v1';

function load(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    const parsed = JSON.parse(raw) as Partial<State>;
    // Always reopen on home without a stale notification.
    return { ...INITIAL_STATE, ...parsed, notificationVisible: false, toast: null, screen: parsed.screen === 'onboarding' ? 'onboarding' : 'home' };
  } catch {
    return INITIAL_STATE;
  }
}

const StoreContext = createContext<{ state: State; dispatch: Dispatch<Action> } | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable (private mode): the demo still works in memory */
    }
  }, [state]);
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}

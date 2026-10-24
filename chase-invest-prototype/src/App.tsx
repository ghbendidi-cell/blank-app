import { useState } from 'react';
import { GrowthStoryModal } from './components/GrowthStoryModal';
import { PhoneFrame, PushNotification, Toast } from './components/PhoneChrome';
import { PresenterPanel } from './components/PresenterPanel';
import { Guide } from './screens/Guide';
import { Home } from './screens/Home';
import { JpmInvestments } from './screens/JpmInvestments';
import { MonthlySummary } from './screens/MonthlySummary';
import { Onboarding } from './screens/Onboarding';
import { Success } from './screens/Success';
import { DEFAULT_INITIAL_AMOUNT } from './config/growthStory';
import { isSnoozed } from './logic/snooze';
import { useStore } from './state/store';

export function App() {
  const { state, dispatch } = useStore();
  // Shown once each time the app is opened, unless the customer chose "Hide for 30 days".
  const [growthOpen, setGrowthOpen] = useState(() => !isSnoozed(state.growthPromoHiddenUntil, Date.now()));
  return (
    <div className="flex min-h-full flex-col items-center gap-6 min-[440px]:py-8 lg:flex-row lg:items-start lg:justify-center lg:gap-12">
      <PhoneFrame>
        {state.screen === 'home' && <Home />}
        {state.screen === 'jpm' && <JpmInvestments />}
        {state.screen === 'guide' && <Guide />}
        {state.screen === 'onboarding' && <Onboarding key={state.onboarded ? 'edit' : 'new'} />}
        {state.screen === 'summary' && <MonthlySummary />}
        {state.screen === 'success' && <Success />}
        {growthOpen && (
          <GrowthStoryModal
            initialAmount={DEFAULT_INITIAL_AMOUNT}
            currency="GBP"
            source="app_open"
            onClose={() => setGrowthOpen(false)}
            onLearnMore={() => {
              setGrowthOpen(false);
              dispatch({ type: 'NAVIGATE', screen: 'jpm' });
            }}
          />
        )}
        <PushNotification />
        <Toast />
      </PhoneFrame>
      <PresenterPanel />
    </div>
  );
}

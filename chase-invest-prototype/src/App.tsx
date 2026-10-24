import { PhoneFrame, PushNotification, Toast } from './components/PhoneChrome';
import { PresenterPanel } from './components/PresenterPanel';
import { Home } from './screens/Home';
import { JpmInvestments } from './screens/JpmInvestments';
import { MonthlySummary } from './screens/MonthlySummary';
import { Onboarding } from './screens/Onboarding';
import { Success } from './screens/Success';
import { useStore } from './state/store';

export function App() {
  const { state } = useStore();
  return (
    <div className="flex min-h-full flex-col items-center gap-6 min-[440px]:py-8 lg:flex-row lg:items-start lg:justify-center lg:gap-12">
      <PhoneFrame>
        {state.screen === 'home' && <Home />}
        {state.screen === 'jpm' && <JpmInvestments />}
        {state.screen === 'onboarding' && <Onboarding key={state.onboarded ? 'edit' : 'new'} />}
        {state.screen === 'summary' && <MonthlySummary />}
        {state.screen === 'success' && <Success />}
        <PushNotification />
        <Toast />
      </PhoneFrame>
      <PresenterPanel />
    </div>
  );
}

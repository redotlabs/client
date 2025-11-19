'use client';

import CurrentPlanSection from './sections/current-plan-section';
import ComparePlanSection from './sections/compare-plan-section';
import PaymentHistorySection from './sections/payment-history-section';

// const defaultValues = {
//   plan: 'Pro',
//   paymentMethod: 'card',
//   isPaymentDialogOpen: false,
//   cardNumber: '',
//   expiryDate: '',
//   cvv: '',
//   cardholderName: '',
//   setAsDefault: false,
// };

const PlanSettingPage = () => {
  const data = {
    currentPlan: 'Pro',
    pageViewsUsed: 32500,
    pageViewsLimit: 50000,
  };

  return (
    <main className="p-10 container mx-auto flex-1">
      <h1 className="text-2xl font-bold">플랜 및 결제</h1>

      <CurrentPlanSection data={data} />
      <ComparePlanSection data={data} />
      <PaymentHistorySection />
    </main>
  );
};

export default PlanSettingPage;

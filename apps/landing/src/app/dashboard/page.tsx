'use client';

import AppList from './ui/app-list';
import PaymentSuccessModal from './ui/payment-success-modal';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    const createdStatus = searchParams.get('created');

    if (paymentStatus === 'success' || createdStatus === 'success') {
      setShowSuccessModal(true);
    }
  }, [searchParams]);

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    // URL에서 쿼리 파라미터 제거
    router.replace('/dashboard');
  };

  return (
    <main className="min-h-screen">
      <AppList />

      {showSuccessModal && <PaymentSuccessModal onClose={handleCloseModal} />}
    </main>
  );
}

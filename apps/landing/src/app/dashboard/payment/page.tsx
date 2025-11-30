'use client';

import { Button } from '@redotlabs/ui';
import { ArrowLeft, CreditCard, Check, Shield } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCreateApp } from '@/shared/api/queries/app';
import { Card } from '@repo/ui';

// 앱 생성 비용
const APP_CREATION_PRICE = 99000;

const PAYMENT_METHODS = [
  { id: 'card', name: '신용/체크카드', icon: CreditCard },
  { id: 'kakaopay', name: '카카오페이', icon: '💛' },
  { id: 'tosspay', name: '토스페이', icon: '💙' },
];

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const { mutateAsync: createAppMutation } = useCreateApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [appConfig, setAppConfig] = useState({
    serviceName: '',
    theme: 'DEFAULT' as 'DEFAULT' | 'MODERN',
    color: 'blue',
    font: 'pretendard' as const,
  });

  useEffect(() => {
    const name = searchParams.get('serviceName');
    const theme = searchParams.get('theme');
    const color = searchParams.get('color');

    if (name) {
      setAppConfig({
        serviceName: decodeURIComponent(name),
        theme: (theme as 'DEFAULT' | 'MODERN') || 'DEFAULT',
        color: color || 'blue',
        font: 'pretendard',
      });
    }
  }, [searchParams]);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // 실제 결제 API 호출 (TODO: 실제 결제 로직 추가)
      // 결제 성공 후 앱 생성
      await createAppMutation({
        appName: appConfig.serviceName,
        theme: appConfig.theme,
        color: appConfig.color,
        font: appConfig.font,
      });

      router.push('/dashboard?payment=success');
    } catch (error) {
      console.error('결제/앱 생성 실패:', error);
      // TODO: 에러 처리 UI
      alert('결제 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-6 py-10">
        <Link
          href="/dashboard/create"
          className="inline-flex items-center gap-2 text-primary-500 hover:underline mb-6"
        >
          <ArrowLeft size={18} />
          돌아가기
        </Link>

        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            앱 생성 결제
          </h1>
          <p className="text-gray-600 mb-8">
            안전하고 빠른 결제로 새 앱을 생성하세요
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 결제 정보 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 결제 수단 선택 */}
              <Card>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  결제 수단 선택
                </h2>
                <div className="space-y-3">
                  {PAYMENT_METHODS.map((method) => (
                    <label
                      key={method.id}
                      className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary-200"
                      style={{
                        borderColor:
                          selectedMethod === method.id
                            ? 'rgb(var(--primary-500))'
                            : 'rgb(229 231 235)',
                      }}
                    >
                      <input
                        type="radio"
                        name="payment-method"
                        value={method.id}
                        checked={selectedMethod === method.id}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3 flex-1">
                        {typeof method.icon === 'string' ? (
                          <span className="text-2xl">{method.icon}</span>
                        ) : (
                          <method.icon size={24} className="text-gray-600" />
                        )}
                        <span className="font-medium text-gray-900">
                          {method.name}
                        </span>
                      </div>
                      {selectedMethod === method.id && (
                        <Check size={20} className="text-primary-500" />
                      )}
                    </label>
                  ))}
                </div>
              </Card>

              {/* 보안 안내 */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Shield size={24} className="text-green-600 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-bold text-green-900 mb-2">
                      안전한 결제
                    </h3>
                    <p className="text-sm text-green-700">
                      모든 결제는 256bit SSL 보안 프로토콜로 암호화되어
                      처리됩니다. PCI DSS 인증을 받은 시스템으로 안전하게
                      결제하세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 주문 요약 */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  결제 요약
                </h2>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">앱 이름</p>
                    <p className="font-semibold text-gray-900">
                      {appConfig.serviceName || '새 앱'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">테마</p>
                      <p className="text-sm font-medium text-gray-900">
                        {appConfig.theme}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">색상</p>
                      <p className="text-sm font-medium text-gray-900">
                        {appConfig.color}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">결제 항목</p>
                    <p className="font-semibold text-gray-900">앱 생성 비용</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-900 font-medium mb-2">
                      📱 앱 생성 후
                    </p>
                    <ul className="space-y-1.5 text-xs text-blue-700">
                      <li className="flex items-start gap-2">
                        <Check
                          size={14}
                          className="text-blue-500 mt-0.5 flex-shrink-0"
                        />
                        <span>Free 플랜으로 자동 시작</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check
                          size={14}
                          className="text-blue-500 mt-0.5 flex-shrink-0"
                        />
                        <span>대시보드에서 플랜 변경 가능</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check
                          size={14}
                          className="text-blue-500 mt-0.5 flex-shrink-0"
                        />
                        <span>플랜 구독은 앱마다 개별 관리</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">앱 생성 비용</span>
                      <span className="font-medium text-gray-900">
                        ₩{APP_CREATION_PRICE.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">VAT (10%)</span>
                      <span className="font-medium text-gray-900">
                        ₩{(APP_CREATION_PRICE * 0.1).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="border-t-2 border-gray-300 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">총 결제액</span>
                      <span className="text-2xl font-bold text-primary-600">
                        ₩
                        {(APP_CREATION_PRICE * 1.1).toLocaleString('ko-KR', {
                          maximumFractionDigits: 0,
                        })}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      * 일회성 결제입니다
                    </p>
                  </div>
                </div>

                <Button
                  className="w-full mt-6"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? '처리 중...' : '결제하고 앱 생성하기'}
                </Button>

                <p className="text-xs text-center text-gray-500 mt-4">
                  결제 진행 시{' '}
                  <Link href="/terms" className="underline">
                    이용약관
                  </Link>{' '}
                  및{' '}
                  <Link href="/privacy" className="underline">
                    개인정보처리방침
                  </Link>
                  에 동의하는 것으로 간주됩니다.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

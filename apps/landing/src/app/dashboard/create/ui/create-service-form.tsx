'use client';

import { Button, Badge } from '@redotlabs/ui';
import { RHFInput, RHFSelect, Card } from '@repo/ui';
import { Loader2, Check } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@redotlabs/utils';

const PLANS = [
  {
    id: 'FREE',
    name: 'Free',
    price: 0,
    features: ['1개 사이트', '기본 템플릿', '5GB 스토리지', '커뮤니티 지원'],
    popular: false,
  },
  {
    id: 'BASIC',
    name: 'Basic',
    price: 29000,
    features: [
      '3개 사이트',
      '프리미엄 템플릿',
      '20GB 스토리지',
      '이메일 지원',
      '커스텀 도메인',
    ],
    popular: true,
  },
  {
    id: 'PRO',
    name: 'Pro',
    price: 59000,
    features: [
      '무제한 사이트',
      '모든 템플릿',
      '100GB 스토리지',
      '우선 지원',
      '커스텀 도메인',
      '고급 분석',
    ],
    popular: false,
  },
];

const schema = z.object({
  name: z.string().min(1, '서비스 이름을 입력해주세요.'),
  plan: z.enum(['FREE', 'BASIC', 'PRO']),
});

export default function CreateServiceForm() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('FREE');

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      plan: 'FREE' as const,
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log('서비스 생성:', data);
    // TODO: API 호출 및 결제 처리
    // 성공 시 대시보드로 이동
    router.push('/dashboard');
  };

  const disabled = !form.formState.isValid || form.formState.isSubmitting;
  const currentPlan = PLANS.find((p) => p.id === selectedPlan);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* 서비스 정보 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">서비스 정보</h2>
          <RHFInput name="name" label="서비스 이름" placeholder="내 블로그" />
        </div>

        {/* 플랜 선택 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">플랜 선택</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PLANS.map((plan) => (
              <label key={plan.id} className="cursor-pointer relative">
                <input
                  type="radio"
                  {...form.register('plan')}
                  value={plan.id}
                  className="sr-only"
                  onChange={() => setSelectedPlan(plan.id)}
                />
                <Card
                  className={cn(
                    'h-full transition-all',
                    selectedPlan === plan.id
                      ? 'border-primary-500'
                      : 'hover:border-gray-300'
                  )}
                >
                  {plan.popular && (
                    <Badge
                      size="sm"
                      color="warning"
                      className="absolute -top-2 -right-2"
                    >
                      인기
                    </Badge>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">{plan.name}</h3>
                    {selectedPlan === plan.id && (
                      <Check size={20} className="text-primary-500" />
                    )}
                  </div>
                  <div className="text-2xl font-bold mb-4">
                    {plan.price === 0 ? (
                      '무료'
                    ) : (
                      <>
                        ₩{plan.price.toLocaleString()}
                        <span className="text-sm text-gray-500 font-normal">
                          /월
                        </span>
                      </>
                    )}
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Check size={16} className="text-green-500 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              </label>
            ))}
          </div>
        </div>

        {/* 요약 */}
        {currentPlan && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">요약</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                플랜: <span className="font-medium">{currentPlan.name}</span>
              </p>
              <p>
                월 요금:{' '}
                <span className="font-medium">
                  {currentPlan.price === 0
                    ? '무료'
                    : `₩${currentPlan.price.toLocaleString()}`}
                </span>
              </p>
              {currentPlan.price > 0 && (
                <p className="text-xs text-gray-500 mt-2">
                  * 결제는 서비스 생성 후 진행됩니다
                </p>
              )}
            </div>
          </div>
        )}

        {/* 버튼 */}
        <div className="flex justify-end gap-3">
          <Button
            variant="outlined"
            onClick={() => router.back()}
            type="button"
          >
            취소
          </Button>
          <Button type="submit" disabled={disabled}>
            {form.formState.isSubmitting ? (
              <Loader2 className="size-5 text-white animate-spin" />
            ) : currentPlan?.price === 0 ? (
              '서비스 만들기'
            ) : (
              '결제하고 만들기'
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

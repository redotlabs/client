'use client';

import { Button, Badge } from '@redotlabs/ui';
import { Check, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@redotlabs/utils';

const PLANS = [
  {
    id: 'FREE',
    name: 'Free',
    description: '개인 프로젝트나 시험용으로 시작하기',
    price: 0,
    period: '영구 무료',
    features: [
      { text: '1개 서비스', included: true },
      { text: '기본 템플릿 3종', included: true },
      { text: '5GB 스토리지', included: true },
      { text: '커뮤니티 지원', included: true },
      { text: 'redot.com 서브도메인', included: true },
      { text: '프리미엄 템플릿', included: false },
      { text: '커스텀 도메인', included: false },
      { text: '고급 분석', included: false },
    ],
    cta: '무료로 시작하기',
    popular: false,
    highlight: false,
  },
  {
    id: 'BASIC',
    name: 'Basic',
    description: '소규모 비즈니스와 스타트업에 최적',
    price: 29000,
    period: '월',
    features: [
      { text: '서비스당 ₩29,000', included: true },
      { text: '프리미엄 템플릿 20종', included: true },
      { text: '20GB 스토리지', included: true },
      { text: '이메일 지원 (48시간)', included: true },
      { text: '커스텀 도메인 연결', included: true },
      { text: '기본 분석 리포트', included: true },
      { text: 'SSL 인증서', included: true },
      { text: '우선 지원', included: false },
    ],
    cta: '시작하기',
    popular: true,
    highlight: false,
  },
  {
    id: 'PRO',
    name: 'Pro',
    description: '대규모 비즈니스와 기업용',
    price: 59000,
    period: '월',
    features: [
      { text: '서비스당 ₩59,000', included: true },
      { text: '모든 프리미엄 템플릿', included: true },
      { text: '100GB 스토리지', included: true },
      { text: '우선 지원 (24시간)', included: true },
      { text: '커스텀 도메인 무제한', included: true },
      { text: '고급 분석 & 리포트', included: true },
      { text: 'SSL 인증서', included: true },
      { text: 'API 접근 권한', included: true },
      { text: '전담 계정 매니저', included: true },
    ],
    cta: '시작하기',
    popular: false,
    highlight: true,
  },
];

const FAQ = [
  {
    question: '첫 앱 생성은 정말 무료인가요?',
    answer:
      '네, 첫 번째 앱은 생성 비용 없이 무료로 만들 수 있습니다. 신용카드 등록 없이 바로 시작하세요.',
  },
  {
    question: '플랜은 어떻게 관리하나요?',
    answer:
      '각 앱의 CMS에서 플랜을 자유롭게 변경할 수 있습니다. 앱마다 다른 플랜을 선택할 수 있으며, 비용은 일할 계산됩니다.',
  },
  {
    question: '추가 앱 생성 비용은 얼마인가요?',
    answer:
      '첫 앱 이후 추가 앱을 만들려면 앱당 ₩99,000의 일회성 생성 비용이 필요합니다. 생성 후 각 앱마다 플랜을 별도로 관리할 수 있습니다.',
  },
  {
    question: '환불 정책은 어떻게 되나요?',
    answer:
      '서비스 시작 후 7일 이내에는 100% 환불이 가능합니다. 그 이후에는 남은 기간에 대해 일할 계산하여 환불해드립니다.',
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-6 py-20">
        {/* 타이틀 섹션 */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            간단하고 명확한 가격
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            첫 앱은 무료 생성, 각 앱마다 플랜 선택 가능
          </p>
          <p className="text-sm text-gray-500">
            숨겨진 비용 없음. 언제든 취소 가능.
          </p>
        </div>

        {/* 플랜 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                'relative rounded-2xl border-2 bg-white p-8 shadow-lg transition-all hover:shadow-xl',
                plan.highlight
                  ? 'border-primary-500 scale-105'
                  : 'border-gray-200',
                plan.popular && !plan.highlight && 'border-blue-300'
              )}
            >
              {/* 인기 배지 */}
              {plan.popular && (
                <Badge
                  size="sm"
                  color="warning"
                  className="absolute -top-3 right-8"
                >
                  가장 인기
                </Badge>
              )}
              {plan.highlight && (
                <Badge
                  size="sm"
                  color="info"
                  className="absolute -top-3 right-8 flex items-center gap-1"
                >
                  <Sparkles size={12} />
                  추천
                </Badge>
              )}

              {/* 플랜 정보 */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-600 mb-6">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  {plan.price === 0 ? (
                    <span className="text-4xl font-bold text-green-600">
                      무료
                    </span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-gray-900">
                        ₩{plan.price.toLocaleString()}
                      </span>
                      <span className="text-gray-600">/{plan.period}</span>
                    </>
                  )}
                </div>
                {plan.price === 0 && (
                  <p className="text-sm text-gray-500 mt-2">
                    모든 앱의 기본 플랜
                  </p>
                )}
              </div>

              {/* CTA 버튼 */}
              <Link href="/auth/sign-up">
                <Button
                  className="w-full mb-6"
                  variant={plan.highlight ? 'contained' : 'outlined'}
                >
                  {plan.cta}
                </Button>
              </Link>

              {/* 기능 목록 */}
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className={cn(
                      'flex items-start gap-3 text-sm',
                      feature.included ? 'text-gray-700' : 'text-gray-400'
                    )}
                  >
                    <Check
                      size={18}
                      className={cn(
                        'flex-shrink-0 mt-0.5',
                        feature.included ? 'text-green-500' : 'text-gray-300'
                      )}
                    />
                    <span className={!feature.included ? 'line-through' : ''}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 가격 구조 설명 */}
        <div className="bg-gradient-to-br from-blue-50 to-primary-50 border border-blue-200 rounded-2xl p-8 mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            가격 구조
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="size-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🎉</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                앱 생성 비용
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                첫 번째 앱은 무료, 추가 앱은 개별 결제
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">첫 앱</span>
                  <span className="font-bold text-green-600">무료</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">추가 앱</span>
                  <span className="font-bold text-gray-900">₩99,000</span>
                </div>
                <p className="text-xs text-gray-500 pt-2">* 일회성 결제</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="size-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                플랜 구독 (앱마다)
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                각 앱마다 플랜을 선택하고 관리
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Free</span>
                  <span className="font-bold text-green-600">₩0/월</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Basic</span>
                  <span className="font-bold text-gray-900">₩29,000/월</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Pro</span>
                  <span className="font-bold text-gray-900">₩59,000/월</span>
                </div>
                <p className="text-xs text-gray-500 pt-2">
                  * CMS에서 플랜 변경 가능
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            자주 묻는 질문
          </h2>
          <div className="space-y-6">
            {FAQ.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-gray-600 mb-8">
            신용카드 없이 무료로 첫 앱을 만들어보세요
          </p>
          <Link href="/auth/sign-up">
            <Button size="lg" className="px-12">
              무료로 시작하기
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

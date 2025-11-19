import React from 'react';
import PlanCard from '../ui/plan-card';

export const PLANS = [
  {
    name: 'Free',
    price: 0,
    description: '개인 프로젝트에 적합',
    features: [
      '월 1,000 페이지뷰',
      '1개 페이지',
      'SEO 및 https 설정',
      '기본 도메인 제공',
    ],
  },
  {
    name: 'Pro',
    price: 29000,
    description: '성장하는 비즈니스를 위한',
    features: [
      '월 50,000 페이지뷰',
      '5개 페이지',
      '커스텀 도메인',
      '통계 제공',
      '공동 관리자 3명',
      '게시글 관리 기능',
      '문의 관리 기능',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 99000,
    description: '대규모 조직을 위한',
    features: [
      '무제한 페이지뷰',
      '무제한 페이지',
      '커스텀 도메인',
      '통계 제공',
      '공동 관리자 무제한',
      '게시글 관리 기능',
      '문의 관리 기능',
    ],
  },
];

const ComparePlanSection = ({ data }: any) => {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-semibold mb-4">플랜 업그레이드</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => (
          <PlanCard
            key={plan.name}
            plan={plan}
            currentPlan={data.currentPlan}
          />
        ))}
      </div>
    </section>
  );
};

export default ComparePlanSection;

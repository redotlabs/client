'use client';

import { Check, X } from 'lucide-react';
import { cn } from '@redotlabs/utils';

const FEATURES = [
  {
    category: '기본 기능',
    items: [
      { name: '서비스 개수', free: '1개', basic: '서비스당 결제', pro: '서비스당 결제' },
      { name: '스토리지', free: '5GB', basic: '20GB', pro: '100GB' },
      { name: 'SSL 인증서', free: true, basic: true, pro: true },
      { name: 'redot.com 서브도메인', free: true, basic: true, pro: true },
    ],
  },
  {
    category: '디자인 & 템플릿',
    items: [
      { name: '기본 템플릿', free: true, basic: true, pro: true },
      { name: '프리미엄 템플릿', free: false, basic: true, pro: true },
      { name: '커스텀 CSS', free: false, basic: true, pro: true },
      { name: '전문가 디자인 지원', free: false, basic: false, pro: true },
    ],
  },
  {
    category: '도메인 & 네트워킹',
    items: [
      { name: '커스텀 도메인', free: false, basic: '1개', pro: '무제한' },
      { name: 'CDN 지원', free: false, basic: true, pro: true },
      { name: '고급 캐싱', free: false, basic: false, pro: true },
    ],
  },
  {
    category: '분석 & 리포트',
    items: [
      { name: '기본 통계', free: true, basic: true, pro: true },
      { name: '고급 분석', free: false, basic: true, pro: true },
      { name: '커스텀 리포트', free: false, basic: false, pro: true },
      { name: '데이터 내보내기', free: false, basic: false, pro: true },
    ],
  },
  {
    category: '지원 & 서비스',
    items: [
      { name: '커뮤니티 지원', free: true, basic: true, pro: true },
      { name: '이메일 지원', free: false, basic: '48시간', pro: '24시간' },
      { name: '우선 지원', free: false, basic: false, pro: true },
      { name: '전담 매니저', free: false, basic: false, pro: true },
    ],
  },
  {
    category: '개발자 도구',
    items: [
      { name: 'API 접근', free: false, basic: false, pro: true },
      { name: 'Webhook', free: false, basic: false, pro: true },
      { name: '개발자 문서', free: true, basic: true, pro: true },
    ],
  },
];

export default function PlanComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <tr>
            <th className="px-6 py-4 text-left font-bold">기능</th>
            <th className="px-6 py-4 text-center font-bold">Free</th>
            <th className="px-6 py-4 text-center font-bold">Basic</th>
            <th className="px-6 py-4 text-center font-bold">Pro</th>
          </tr>
        </thead>
        <tbody>
          {FEATURES.map((category, categoryIndex) => (
            <>
              <tr
                key={`category-${categoryIndex}`}
                className="bg-gray-50 border-t-2 border-gray-200"
              >
                <td
                  colSpan={4}
                  className="px-6 py-3 font-bold text-gray-700 text-sm"
                >
                  {category.category}
                </td>
              </tr>
              {category.items.map((item, itemIndex) => (
                <tr
                  key={`item-${categoryIndex}-${itemIndex}`}
                  className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-700">{item.name}</td>
                  <td className="px-6 py-4 text-center">
                    <FeatureCell value={item.free} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <FeatureCell value={item.basic} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <FeatureCell value={item.pro} />
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FeatureCell({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value ? (
      <div className="flex justify-center">
        <Check size={20} className="text-green-500" />
      </div>
    ) : (
      <div className="flex justify-center">
        <X size={20} className="text-gray-300" />
      </div>
    );
  }

  return (
    <span className="text-sm font-medium text-gray-700">{value}</span>
  );
}


'use client';

import { Button, Badge } from '@redotlabs/ui';
import { Plus, ExternalLink, Settings, Globe } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@redotlabs/utils';

// 더미 데이터
const SERVICES = [
  {
    id: 1,
    name: '내 블로그',
    subdomain: '4d9g1725',
    plan: 'FREE',
    status: 'active' as const,
    createdAt: '2024-10-15',
  },
  {
    id: 2,
    name: '쇼핑몰',
    subdomain: '4d9g1725',
    plan: 'PRO',
    status: 'active' as const,
    createdAt: '2024-11-01',
  },
];

const MAX_SERVICES = 3;
const FREE_SERVICE_COUNT = 1;

const PLAN_COLORS = {
  FREE: 'default' as const,
  BASIC: 'info' as const,
  PRO: 'warning' as const,
};

export default function ServiceList() {
  const usedServices = SERVICES.length;
  const canCreateFree = usedServices < FREE_SERVICE_COUNT;
  const canCreateMore = usedServices < MAX_SERVICES;

  return (
    <div className="container mx-auto px-6 py-10">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">내 서비스</h1>
          <p className="text-gray-600 mt-2">
            {usedServices}/{MAX_SERVICES}개 사용 중
          </p>
        </div>
        <Link href="/dashboard/create">
          <Button
            variant="contained"
            className="flex items-center gap-2"
            disabled={!canCreateMore}
          >
            <Plus size={18} />새 서비스 만들기
          </Button>
        </Link>
      </div>

      {/* 안내 메시지 */}
      {canCreateFree && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex gap-3">
            <svg
              className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex-1 text-sm text-blue-700">
              <p className="font-medium mb-1">무료 서비스 생성 가능</p>
              <p className="text-blue-600">
                첫 번째 서비스는 무료로 생성할 수 있습니다. 추가 서비스는 결제가
                필요합니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {!canCreateMore && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <div className="flex gap-3">
            <svg
              className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div className="flex-1 text-sm text-amber-700">
              <p className="font-medium mb-1">서비스 한도 도달</p>
              <p className="text-amber-600">
                최대 {MAX_SERVICES}개까지 서비스를 생성할 수 있습니다. 더 많은
                서비스가 필요하시면 문의해주세요.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 서비스 카드 그리드 */}
      {SERVICES.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Globe size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            아직 서비스가 없습니다
          </h3>
          <p className="text-gray-600 mb-6">
            첫 번째 서비스를 무료로 만들어보세요
          </p>
          <Link href="/dashboard/create">
            <Button variant="contained" className="flex items-center gap-2">
              <Plus size={18} />
              서비스 만들기
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

function ServiceCard({
  service,
}: {
  service: {
    id: number;
    name: string;
    subdomain: string;
    plan: string;
    status: 'active' | 'inactive';
    createdAt: string;
  };
}) {
  const planColor = PLAN_COLORS[service.plan as keyof typeof PLAN_COLORS];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {service.name}
          </h3>
          <p className="text-sm text-gray-500">{service.subdomain}.redot.com</p>
        </div>
        <Badge size="sm" color={planColor}>
          {service.plan}
        </Badge>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div
          className={cn(
            'w-2 h-2 rounded-full',
            service.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
          )}
        />
        <span className="text-sm text-gray-600">
          {service.status === 'active' ? '활성' : '비활성'}
        </span>
      </div>

      <div className="text-xs text-gray-500 mb-6">
        생성일: {service.createdAt}
      </div>

      <div className="flex gap-2">
        <a
          href={`${service.subdomain}.redotlabs.me`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button
            variant="contained"
            size="sm"
            className="w-full flex items-center justify-center gap-2"
          >
            <ExternalLink size={16} />
            관리하기
          </Button>
        </a>
        <Button
          variant="outlined"
          size="sm"
          className="flex items-center justify-center"
        >
          <Settings size={16} />
        </Button>
      </div>
    </div>
  );
}

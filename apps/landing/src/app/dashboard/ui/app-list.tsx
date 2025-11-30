'use client';

import { Button } from '@redotlabs/ui';
import { Plus, Globe, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useAppList } from '@/shared/api/queries/app';
import AppCard from './app-card';
import { PATH } from '@/shared/constants/routes';

const MAX_SERVICES = 10;

export default function AppList() {
  const { data: appListResponse, isLoading } = useAppList();

  const apps = appListResponse?.content || [];
  const totalElements = appListResponse?.totalElements || 0;
  const usedApps = totalElements;
  const canCreateFree = usedApps === 0;
  const canCreateMore = usedApps < MAX_SERVICES;

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-10 flex items-center justify-center min-h-[400px]">
        <Loader2 className="size-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">내 앱</h1>
          <p className="text-gray-600 mt-2">
            {usedApps}/{MAX_SERVICES}개 사용 중
          </p>
        </div>
        <Link href={PATH.dashboard.create}>
          <Button
            variant="contained"
            className="flex items-center gap-2"
            disabled={!canCreateMore}
          >
            <Plus size={18} />새 앱 만들기
          </Button>
        </Link>
      </div>

      {/* 안내 메시지 */}
      {canCreateFree && (
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-xl p-6 mb-8">
          <div className="flex gap-4">
            <div className="size-12 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-bold text-primary-900 mb-2 text-lg">
                🎉 첫 앱을 무료로 시작하세요!
              </p>
              <p className="text-primary-700">
                첫 번째 앱은 무료로 생성할 수 있습니다. 앱을 만든 후 CMS에서
                콘텐츠를 관리하고 플랜을 선택하세요.
              </p>
            </div>
          </div>
        </div>
      )}

      {!canCreateFree && canCreateMore && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex gap-4">
            <div className="size-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Plus size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-blue-900 mb-2 text-lg">
                추가 앱 생성하기
              </p>
              <p className="text-blue-700 mb-3">
                추가 앱을 생성하려면 생성 비용(₩99,000)이 필요합니다. 생성 후 각
                앱의 CMS에서 플랜을 관리할 수 있습니다.
              </p>
              <div className="text-sm">
                <div className="flex items-center gap-2">
                  <div className="size-2 bg-blue-500 rounded-full" />
                  <span className="text-blue-800">
                    일회성 결제 후 앱 생성 완료
                  </span>
                </div>
              </div>
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
                앱이 필요하시면 문의해주세요.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 앱 카드 그리드 */}
      {apps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <AppCard key={app.redotApp.id} app={app} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Globe size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            아직 앱이 없습니다
          </h3>
          <p className="text-gray-600 mb-6">첫 번째 앱을 무료로 만들어보세요</p>
        </div>
      )}
    </div>
  );
}

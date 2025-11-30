'use client';

import { Card } from '@repo/ui';
import { Badge } from '@redotlabs/ui';
import { ROOT_DOMAIN } from '@/shared/constants/env-variables';
import type { AppItem } from '@/shared/api/services/app';
import Link from 'next/link';
import { useState } from 'react';
import SetupManagerModal from './setup-manager-modal';
import AppStatusBadge from './app-status-badge';
import { getCmsUrl } from '@/shared/utils/get-cms-url';

const PLAN_COLORS = {
  FREE: 'default' as const,
  BASIC: 'info' as const,
  PRO: 'warning' as const,
};

export default function AppCard({ app }: { app: AppItem }) {
  const [showSetupModal, setShowSetupModal] = useState(false);
  const planColor =
    PLAN_COLORS[app.redotApp.status as keyof typeof PLAN_COLORS] || 'default';

  const { isCreatedManager } = app.redotApp;

  const handleClick = (e: React.MouseEvent) => {
    if (!isCreatedManager) {
      e.preventDefault();
      setShowSetupModal(true);
    }
  };

  const linkUrl = isCreatedManager ? getCmsUrl(app.siteSetting.subdomain) : '#';

  return (
    <>
      <Link
        href={linkUrl}
        target={isCreatedManager ? '_blank' : undefined}
        rel={isCreatedManager ? 'noopener noreferrer' : undefined}
        onClick={handleClick}
      >
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {app.redotApp.appName}
              </h3>
              <p className="text-sm text-gray-500">
                {app.siteSetting.subdomain}.{ROOT_DOMAIN.split('.')[0]}.me
              </p>
            </div>
            <AppStatusBadge status={app.redotApp.status} />
          </div>

          {/* 관리자 미생성 알림 */}
          {!isCreatedManager && (
            <div className="mb-4 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs font-medium text-amber-900">
                ⚠️ 초기 관리자 설정 필요
              </p>
            </div>
          )}

          {app.redotApp.createdAt && (
            <div className="text-xs text-gray-500 mb-4">
              생성일:{' '}
              {new Date(app.redotApp.createdAt).toLocaleDateString('ko-KR')}
            </div>
          )}

          {/* 테마/색상 정보 */}
          <div className="flex gap-2">
            <Badge size="sm" color={planColor} className="w-fit">
              FREE
            </Badge>
            <div className="text-xs px-2 py-1 bg-gray-100 rounded capitalize">
              {app.styleInfo.theme}
            </div>
            <div className="text-xs px-2 py-1 bg-gray-100 rounded flex items-center gap-1 capitalize">
              <div
                className="size-3 rounded-full border border-gray-300"
                style={{ backgroundColor: app.styleInfo.color }}
              />
              {app.styleInfo.color}
            </div>
          </div>
        </Card>
      </Link>

      {/* 관리자 설정 모달 */}
      {!isCreatedManager && (
        <SetupManagerModal
          isOpen={showSetupModal}
          onClose={() => setShowSetupModal(false)}
          appId={app.redotApp.id}
          appName={app.redotApp.appName}
          subdomain={app.siteSetting.subdomain}
        />
      )}
    </>
  );
}

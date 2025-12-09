'use client';

import { Button, Callout } from '@redotlabs/ui';
import { Check } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PATH } from '@/shared/constants/routes';

export default function CreateSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const subdomain = searchParams.get('sd');
  const appName = searchParams.get('n');

  const handleGoToDashboard = () => {
    router.push(PATH.dashboard.root);
  };

  return (
    <main className="min-h-svh flex items-center justify-center p-4">
      <div className="max-w-md w-full p-8">
        {/* 성공 아이콘 */}
        <div className="flex justify-center mb-6">
          <div className="size-20 bg-green-100 rounded-full flex items-center justify-center">
            <div className="size-16 bg-green-500 rounded-full flex items-center justify-center">
              <Check size={40} className="text-white" />
            </div>
          </div>
        </div>

        {/* 메시지 */}
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          앱이 생성되었습니다!
        </h2>
        <p className="text-center text-gray-600 mb-8">
          <strong>{appName}</strong> 앱이 성공적으로 생성되었습니다.
          <br />
          이제 CMS에서 콘텐츠를 관리하고 플랜을 선택하세요.
        </p>

        {/* 앱 정보 */}
        <Callout
          color="info"
          className="mb-6 *:w-full"
          content={
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">앱 이름</span>
                <span className="font-semibold text-gray-900">{appName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">앱 URL</span>
                <span className="font-semibold text-primary-600">
                  {subdomain}.redot.com
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">초기 플랜</span>
                <span className="font-semibold text-green-600">
                  Free (무료)
                </span>
              </div>
            </div>
          }
        />

        {/* 버튼 */}
        <div className="flex flex-col gap-3">
          <Button onClick={handleGoToDashboard} className="w-full">
            대시보드로 돌아가기
          </Button>
        </div>

        {/* 추가 안내 */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500">
            결제 영수증이 등록하신 이메일로 발송되었습니다.
          </p>
        </div>
      </div>
    </main>
  );
}

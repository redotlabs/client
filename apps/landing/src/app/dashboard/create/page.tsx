'use client';

import CreateAppForm from './ui/create-app-form';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAppList } from '@/shared/api/queries/app';
import { Card, Loader } from '@repo/ui';

export default function CreateAppPage() {
  const { data: appListResponse, isLoading } = useAppList();

  const currentAppCount = appListResponse?.totalElements || 0;
  const isFirstApp = currentAppCount === 0;

  if (isLoading) {
    return (
      <main className="min-h-svh">
        <div className="container mx-auto px-6 py-10 flex items-center justify-center min-h-[400px]">
          <Loader />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-svh">
      <div className="container mx-auto px-6 py-10">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-primary-500 hover:underline mb-6"
        >
          <ArrowLeft size={18} />
          돌아가기
        </Link>

        <div className="max-w-4xl mx-auto">
          <Card>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              새 앱 만들기
            </h1>
            <p className="text-gray-600 mb-8">
              {isFirstApp
                ? '첫 번째 앱을 무료로 만들어보세요'
                : '앱 정보를 입력하고 생성하세요'}
            </p>

            <CreateAppForm isFirstApp={isFirstApp} />
          </Card>
        </div>
      </div>
    </main>
  );
}

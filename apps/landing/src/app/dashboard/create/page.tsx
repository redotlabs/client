import CreateServiceForm from './ui/create-service-form';
import DashboardHeader from '../ui/dashboard-header';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateServicePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="container mx-auto px-6 py-10">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-primary-500 hover:underline mb-6"
        >
          <ArrowLeft size={18} />
          돌아가기
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              새 서비스 만들기
            </h1>
            <p className="text-gray-600 mb-8">
              서비스 정보를 입력하고 플랜을 선택하세요
            </p>

            <CreateServiceForm />
          </div>
        </div>
      </div>
    </main>
  );
}


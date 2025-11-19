'use client';

import { Button } from '@redotlabs/ui';
import { LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardHeader() {
  const router = useRouter();

  const handleLogout = () => {
    console.log('로그아웃');
    // TODO: API 호출
    router.push('/auth/sign-in');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-end items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <User size={18} />
            <span>홍길동</span>
          </div>
          <Button
            variant="outlined"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut size={16} />
            로그아웃
          </Button>
        </div>
      </div>
    </header>
  );
}

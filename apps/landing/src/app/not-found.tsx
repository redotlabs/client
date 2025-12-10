'use client';

import { ThemeProvider } from '@redotlabs/themes';
import { Button } from '@redotlabs/ui';
import { UnderConstruction } from '@repo/assets';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const { back } = useRouter();
  return (
    <ThemeProvider color="blue" font="pretendard">
      <div className="flex items-center justify-center min-h-svh">
        <main className="flex flex-col items-center">
          <UnderConstruction className="w-[200px] h-auto" />

          <h1 className="text-primary-500 text-center flex flex-col gap-2">
            <span className="text-5xl font-bold">404</span>
            <span className="text-3xl font-bold">Page not found</span>
          </h1>

          <Button className="mt-8" onClick={back}>
            이전 페이지로 이동하기
          </Button>
        </main>
      </div>
    </ThemeProvider>
  );
}

'use client';

import { ThemeProvider } from '@redotlabs/themes';
import { Button } from '@redotlabs/ui';
import { Corn } from '@repo/assets';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <ThemeProvider color="blue" font="pretendard">
      <div className="flex items-center justify-center min-h-svh">
        <main className="flex flex-col items-center">
          <Corn className="w-[200px] h-auto" />

          <h1 className="text-primary-500 text-center flex flex-col gap-2">
            <span className="text-5xl font-bold">OOPS!</span>
            <span className="text-3xl font-bold">연결에 문제가 생겼어요</span>
          </h1>

          <Button className="mt-8" onClick={reset}>
            새로고침하기
          </Button>
        </main>
      </div>
    </ThemeProvider>
  );
}

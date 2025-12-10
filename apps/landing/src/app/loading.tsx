'use client';

import { ThemeProvider } from '@redotlabs/themes';
import { Diamond, GiftD, GiftE } from '@repo/assets';

export default function Loading() {
  return (
    <ThemeProvider color="blue" font="pretendard">
      <div className="flex items-center justify-center min-h-svh">
        <main className="flex flex-col items-center">
          <h1 className="text-primary-500 text-center flex flex-col gap-2">
            <span className="text-lg font-bold">잠시만 기다려주세요</span>
            <span className="text-5xl font-bold">Loading..</span>
          </h1>

          <div className="mt-8 relative h-[130px] flex justify-center">
            <GiftD className="size-22 absolute bottom-2 right-4 rotate-12" />
            <Diamond className="size-22 absolute top-2" />
            <GiftE className="size-22 absolute bottom-2 left-4" />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

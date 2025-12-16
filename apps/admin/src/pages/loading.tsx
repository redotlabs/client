import { cn } from '@redotlabs/utils';
import { Diamond, GiftD, GiftE } from '@repo/assets';

interface LoadingProps {
  layout?: 'page' | 'section';
}

export default function Loading({ layout = 'page' }: LoadingProps) {
  return (
    <div
      className={cn(
        'flex-1 flex items-center justify-center',
        layout === 'section' && 'h-full',
        layout === 'page' && 'min-h-svh'
      )}
    >
      <main className="flex flex-col items-center">
        <h1 className="text-center flex flex-col gap-2">
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
  );
}

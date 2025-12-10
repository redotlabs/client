import { Corn } from '@repo/assets';

export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <main className="flex flex-col items-center">
        <Corn className="w-[200px] h-auto" />

        <h1 className="text-center flex flex-col gap-2">
          <span className="text-5xl font-bold">OOPS!</span>
          <span className="text-3xl font-bold">
            페이지 이용 권한이 없습니다
          </span>
        </h1>
      </main>
    </div>
  );
}

import { Magnifier } from '@repo/assets';

export default function NoContent() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <Magnifier className="w-[100px] h-auto" />

      <h1 className="text-gray-700 text-center flex flex-col gap-2">
        <span className="text-xl font-bold">작성된 아티클이 없습니다.</span>
      </h1>
    </div>
  );
}

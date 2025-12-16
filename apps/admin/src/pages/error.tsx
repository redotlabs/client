import { Button } from '@redotlabs/ui';
import { Corn } from '@repo/assets';
import { ThemeProvider } from '@redotlabs/themes';
import { PATH } from '@/shared/routes';

export default function Error() {
  const goToMain = () => {
    const { origin } = window.location;
    window.location.href = `${origin}${PATH.root}`;
  };

  const reset = () => {
    window.location.reload();
  };

  return (
    <ThemeProvider color="blue" font="pretendard">
      <div className="flex items-center justify-center min-h-svh">
        <main className="flex flex-col items-center">
          <Corn className="w-[200px] h-auto" />

          <h1 className="text-center flex flex-col gap-2">
            <span className="text-5xl font-bold">OOPS!</span>
            <span className="text-3xl font-bold">연결에 문제가 생겼어요</span>
          </h1>

          <div className="flex items-center gap-4 mt-8">
            <Button variant="outlined" onClick={goToMain}>
              메인페이지로 이동하기
            </Button>
            <Button variant="contained" onClick={reset}>
              새로고침하기
            </Button>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

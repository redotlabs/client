import { PATH } from '@/shared/routes';
import { Button } from '@redotlabs/ui';
import { UnderConstruction } from '@repo/assets';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <main className="flex flex-col items-center">
        <UnderConstruction className="w-[200px] h-auto" />

        <h1 className="text-center flex flex-col gap-2">
          <span className="text-5xl font-bold">404</span>
          <span className="text-3xl font-bold">Page not found</span>
        </h1>

        <Link to={PATH.root}>
          <Button className="mt-8">메인페이지로 이동하기</Button>
        </Link>
      </main>
    </div>
  );
}

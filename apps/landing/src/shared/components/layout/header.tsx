'use client';

import { PATH } from '@/shared/constants/routes';
import { Button, Logo } from '@redotlabs/ui';
import Link from 'next/link';

const Header = () => {
  // const { data, isLoading } = useAuth();
  // const isAuthenticated = !!data;

  return (
    <header className="sticky top-0 z-10 bg-white px-8 lg:px-20 h-12.5 lg:h-17.5 flex items-center justify-between border-b border-gray-200">
      <Link href={PATH.root}>
        <Logo className="w-auto h-6" />
      </Link>
      <div className="flex items-center gap-6">
        <Link href="https://tech.redot.me" target="_blank">
          <Button variant="text" className="p-0 text-base">
            Blog
          </Button>
        </Link>
        <Link href="https://brand.redot.me" target="_blank">
          <Button variant="text" className="p-0 text-base">
            Brand
          </Button>
        </Link>
        {/* {isLoading ? (
          <Skeleton className="size-8 rounded-full" />
        ) : isAuthenticated ? (
          <HeaderAvatar user={data} />
        ) : (
          <Link href={PATH.auth.signIn}>
            <Button className="text-base" size="sm">
              로그인
            </Button>
          </Link>
        )} */}
      </div>
    </header>
  );
};

export default Header;

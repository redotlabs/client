'use client';

import { useMe } from '@/shared/api/queries/auth/sign-in';
import { Button } from '@redotlabs/ui';
import { Skeleton } from '@repo/ui';
import HeaderAvatar from './ui/header-avatar';
import Link from 'next/link';
import { PATH } from '@/shared/constants/routes';

const Header = () => {
  const { data, isLoading } = useMe();
  const isAuthenticated = !!data;

  return (
    <header className="h-15 p-4 flex items-center justify-end border-b border-gray-200">
      {isLoading ? (
        <Skeleton className="size-8 rounded-full" />
      ) : isAuthenticated ? (
        <HeaderAvatar user={data} />
      ) : (
        <Link href={PATH.auth.signIn}>
          <Button className="text-base" size="sm">
            로그인
          </Button>
        </Link>
      )}
    </header>
  );
};

export default Header;

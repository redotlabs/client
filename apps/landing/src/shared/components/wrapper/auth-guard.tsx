'use client';

import { useAuth } from '@/shared/api/queries/auth';
import { AUTH_WHITE_LIST } from '@/shared/constants/auth';
import { PATH } from '@/shared/constants/routes';
import type { PropsWithChildren } from 'react';
import { redirect, usePathname } from 'next/navigation';
import Loading from '@/app/loading';

const AuthGuard = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const passingFetch = AUTH_WHITE_LIST.some(
    (whiteList) => pathname === whiteList
  );

  const { data, isLoading, isError, isFetched } = useAuth({
    enabled: !passingFetch,
  });

  if (passingFetch) {
    return <>{children}</>;
  }

  if (isLoading) return <Loading />;

  const unAuthorized = isError || (isFetched && !data);

  if (unAuthorized) {
    if (!passingFetch) {
      return redirect(`${PATH.auth.signIn}?redirect=${pathname}`);
    }
  }

  return <>{children}</>;
};

export default AuthGuard;

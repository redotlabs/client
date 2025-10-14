'use client';

import { useAuth } from '@/shared/api/queries/auth/sign-in';
import { AUTH_WHITE_LIST } from '@/shared/constants/auth';
import { PATH } from '@/shared/constants/routes';
import { redirect, usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { Loader } from '../ui';

const AuthGuard = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const passingFetch = AUTH_WHITE_LIST.includes(pathname);

  const { data, isLoading, isError, isFetched } = useAuth({
    enabled: !passingFetch,
  });

  if (isLoading) return <Loader />;

  const unAuthorized = isError || (isFetched && !data);

  if (unAuthorized) {
    if (!passingFetch) {
      return redirect(`${PATH.auth.signIn}?redirect=${pathname}`);
    }
  }

  return <>{children}</>;
};

export default AuthGuard;

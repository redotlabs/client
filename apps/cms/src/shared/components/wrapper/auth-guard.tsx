'use client';

import { useAuth } from '@/shared/api/queries/auth/sign-in';
import { AUTH_WHITE_LIST } from '@/shared/constants/auth';
import { PATH } from '@/shared/constants/routes';
import { useTenantRedirect, useTenantPathname } from '@repo/tenant-router/next';
import type { PropsWithChildren } from 'react';
import Loading from '@/app/loading';

const AuthGuard = ({ children }: PropsWithChildren) => {
  const pathname = useTenantPathname();
  const redirect = useTenantRedirect();
  const passingFetch = AUTH_WHITE_LIST.some((whiteList) =>
    pathname.includes(whiteList)
  );

  const { data, isLoading, isError, isFetched } = useAuth({
    enabled: !passingFetch,
  });

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

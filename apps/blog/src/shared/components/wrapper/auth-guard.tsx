'use client';

import { useAuth } from '@/shared/api/queries/auth/sign-in';
import { PATH } from '@/shared/constants/routes';
import type { PropsWithChildren } from 'react';
import { Loader } from '../ui';
import { redirect, usePathname } from 'next/navigation';
import { BLOG_DOMAIN } from '@/shared/constants/env-variables';

const AuthGuard = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  const { data, isLoading, isError, isFetched } = useAuth();

  if (isLoading) return <Loader />;

  const unAuthorized = isError || (isFetched && !data);

  if (unAuthorized) {
    const redirectUrl = `${BLOG_DOMAIN}${pathname}`;
    console.log(redirectUrl);
    // return redirect(`${PATH.auth.signIn}?redirect=${redirectUrl}`);
  }

  return <>{children}</>;
};

export default AuthGuard;

'use client';

import { useAuth } from '@/shared/api/queries/auth';
import type { PropsWithChildren } from 'react';
import { Loader } from '@repo/ui';

const AuthGuard = ({ children }: PropsWithChildren) => {
  const { data, isLoading, isError, isFetched } = useAuth();

  if (isLoading) return <Loader />;

  const unAuthorized = isError || (isFetched && !data);

  if (unAuthorized) {
    alert('페이지 이용 권한이 없습니다.');
    return (window.location.href = 'https://redot.me');
  }

  return <>{children}</>;
};

export default AuthGuard;

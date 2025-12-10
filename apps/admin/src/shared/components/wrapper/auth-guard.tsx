import { useAuth } from '@/shared/api/queries/auth';
import { PATH } from '@/shared/routes';
import type { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '@/pages/loading';

const AuthGuard = ({ children }: PropsWithChildren) => {
  const { data, isLoading, isError, isFetched } = useAuth();
  const { pathname } = useLocation();

  if (isLoading) return <Loading />;

  const unAuthorized = isError || (isFetched && !data);

  if (unAuthorized) {
    const redirectPath = pathname.includes(PATH.auth.signIn)
      ? pathname
      : `${PATH.auth.signIn}?redirect=${pathname}`;
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;

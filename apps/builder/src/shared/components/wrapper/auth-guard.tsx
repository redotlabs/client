import { useAuth } from '@/shared/api/queries/auth';
import type { PropsWithChildren } from 'react';
import Loading from '@/pages/loading';
import Unauthorized from '@/pages/unauthorized';

const AuthGuard = ({ children }: PropsWithChildren) => {
  const { data, isLoading, isError, isFetched } = useAuth();

  if (isLoading) return <Loading />;

  const unAuthorized = isError || (isFetched && !data);

  if (unAuthorized) {
    return <Unauthorized />;
  }

  return <>{children}</>;
};

export default AuthGuard;

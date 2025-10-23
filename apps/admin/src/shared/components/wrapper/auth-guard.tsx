import type { PropsWithChildren } from 'react';

const AuthGuard = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default AuthGuard;

import AuthGuard from '@/shared/components/wrapper/auth-guard';
import type { PropsWithChildren } from 'react';

const AdminLayout = ({ children }: PropsWithChildren) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default AdminLayout;

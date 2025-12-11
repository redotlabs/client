import Sidebar from './sidebar';
import { Outlet } from 'react-router-dom';
import AuthGuard from '@/shared/components/wrapper/auth-guard';
import Header from './header';

const AdminLayout = () => {
  return (
    <AuthGuard>
      <div className="size-full flex min-h-svh h-svh">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-0">
          <Header />
          <Outlet />
        </div>
      </div>
    </AuthGuard>
  );
};

export default AdminLayout;

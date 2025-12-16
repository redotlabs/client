import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import { PATH } from './routes';
// import { AuthGuard } from '@/shared/auth';
import SignInPage from '@/pages/auth/sign-in';
import AdminLayout from '../components/layouts/admin-layout';
import AdminPage from '@/pages/admin';
import DashboardPage from '@/pages/dashboard';
import CustomerPage from '@/pages/customer';
import CustomerDetailPage from '@/pages/customer/detail';
import ConsultationPage from '@/pages/consultation';
import TransactionPage from '@/pages/transaction';
import NotFound from '@/pages/not-found';
import AppsPage from '@/pages/app';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    // App
    {
      path: 'auth',
      element: <Outlet />,
      children: [
        { element: <Navigate to={PATH.auth.signIn} replace />, index: true },
        // auth
        { path: 'sign-in', element: <SignInPage /> },
      ],
    },
    {
      path: '',
      element: <AdminLayout />,
      children: [
        { path: '', element: <DashboardPage /> },
        { path: 'admin', element: <AdminPage /> },
        { path: 'customer', element: <CustomerPage /> },
        { path: 'customer/detail/:id', element: <CustomerDetailPage /> },
        { path: 'customer/app', element: <AppsPage /> },
        { path: 'consultation', element: <ConsultationPage /> },
        { path: 'transaction', element: <TransactionPage /> },
      ],
    },
    {
      path: '404',
      element: <NotFound />,
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);

  return routes;
}

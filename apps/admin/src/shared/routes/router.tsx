import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import { PATH } from './routes';
// import { AuthGuard } from '@/shared/auth';
import SignInPage from '@/pages/auth/sign-in';
import AdminLayout from '../components/layouts/admin-layout';
import AdminPage from '@/pages/admin';
import DashboardPage from '@/pages/dashboard';
import CustomerPage from '@/pages/customer';
import ConsultantPage from '@/pages/consultant';

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
        { path: 'consultant', element: <ConsultantPage /> },
      ],
    },
    // error
    // {
    //   path: '404',
    //   element: <Page404 />,
    // },
    { path: '*', element: <Navigate to="/auth/sign-in" replace /> },
    { path: '*', element: <Navigate to="/404" replace /> },
    { path: '*', element: <Navigate to="/" replace /> },
  ]);

  return routes;
}

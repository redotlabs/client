import { Suspense, lazy, type ElementType } from 'react';
// components

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => (
  <Suspense fallback={<></>}>
    <Component {...props} />
  </Suspense>
);

// ----------------------------------------------------------------------

// auth
export const SignInPage = Loadable(lazy(() => import('@/pages/auth/sign-in')));

// export const Page404 = Loadable(lazy(() => import('../pages/404')));
// export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
// export const Page403 = Loadable(lazy(() => import('../pages/Page403')));

// components

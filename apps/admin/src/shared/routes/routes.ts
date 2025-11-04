export const PATH = {
  root: '/',
  notFound: '/404',
  auth: {
    signIn: '/auth/sign-in',
    resetPassword: '/auth/reset-password',
  },
  dashboard: '/',
  admin: {
    root: '/admin',
    detail: (adminId: number) => `/admin/${adminId}`,
  },
};

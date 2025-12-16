export const PATH = {
  root: '/',
  notFound: '/404',
  auth: {
    signIn: '/auth/sign-in',
    resetPassword: '/auth/reset-password',
  },
  dashboard: '/',
  customer: {
    root: '/customer',
    detail: (customerId: number) => `/customer/detail/${customerId}`,
    app: '/customer/app',
  },
  consultation: {
    root: '/consultation',
    detail: (consultationId: number) => `/consultation/${consultationId}`,
  },
  admin: {
    root: '/admin',
    detail: (adminId: number) => `/admin/${adminId}`,
  },
  transaction: {
    root: '/transaction',
  },
};

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
    detail: (customerId: number) => `/customer/${customerId}`,
  },
  consultant: {
    root: '/consultant',
    detail: (consultantId: number) => `/consultant/${consultantId}`,
  },
  admin: {
    root: '/admin',
    detail: (adminId: number) => `/admin/${adminId}`,
  },
};

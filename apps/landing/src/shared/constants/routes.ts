export const PATH = {
  root: '/',
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
  },
  dashboard: {
    root: '/dashboard',
    create: '/dashboard/create',
    createSuccess: '/dashboard/create/success',
    payment: '/dashboard/payment',
    setupManager: (appId: string | number) =>
      `/dashboard/${appId}/setup-manager`,
  },
  pricing: '/pricing',
  renewal: '/renewal',
};

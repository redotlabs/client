export const API_PATH = {
  auth: {
    me: '/auth/customer/cms/me',
    signIn: '/auth/customer/cms/sign-in',
    reIssue: '/auth/customer/cms/reissue',
    sendEmailVerificationCode:
      '/auth/customer/cms/send-email-verification-code',
    verifyEmailVerificationCode:
      '/auth/customer/cms/verify-email-verification-code',
    resetPassword: '/auth/customer/cms/reset-password',
    signOut: '/auth/customer/cms/sign-out',
  },
  customer: {
    root: '/customer',
  },
};

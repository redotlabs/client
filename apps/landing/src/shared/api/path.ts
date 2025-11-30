export const API_PATH = {
  auth: {
    me: '/auth/redot/member/me',
    signUp: '/auth/redot/member/sign-up',
    signIn: '/auth/redot/member/sign-in',
    reIssue: '/auth/redot/member/reissue',
    signOut: '/auth/redot/member/sign-out',
    socialUrl: '/auth/redot/member/social/login-url',
    email: {
      verify: '/auth/email-verification/verify',
      send: '/auth/email-verification/send',
    },
  },
  app: {
    root: '/app',
    createManager: (appId: number) => `/app/${appId}/create-manager`,
  },
};

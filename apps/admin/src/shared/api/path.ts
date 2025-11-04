export const API_PATH = {
  auth: {
    me: '/auth/admin/me',
    signIn: '/auth/admin/sign-in',
    reIssue: '/auth/admin/reissue',
    signOut: '/auth/admin/sign-out',
  },
  admin: {
    root: '/admin',
    detail: (adminId: number) => `/admin/${adminId}`,
  },
};

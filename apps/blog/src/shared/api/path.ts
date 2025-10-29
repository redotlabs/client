export const API_PATH = {
  auth: {
    me: '/auth/admin/me',
    signIn: '/auth/admin/sign-in',
    reIssue: '/auth/admin/reissue',
  },
  article: {
    root: '/article',
    detail: (articleId: number) => `/article/${articleId}`,
  },
  admin: {
    root: '/admin',
    article: {
      root: '/admin/article',
      detail: (articleId: number) => `/admin/article/${articleId}`,
      upload: (articleId: number) => `/admin/article/${articleId}/upload`,
    },
  },
  category: {
    list: '/categories',
  },
};

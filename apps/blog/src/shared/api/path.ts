export const API_PATH = {
  auth: {
    me: '/auth/redot/admin/me',
    signIn: '/auth/redot/admin/sign-in',
    reIssue: '/auth/redot/admin/reissue',
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

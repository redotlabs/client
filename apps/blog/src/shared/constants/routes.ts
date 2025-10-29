import { ADMIN_DOMAIN } from '@/shared/constants/env-variables';

export const PATH = {
  root: '/',
  auth: {
    signIn: `${ADMIN_DOMAIN}/auth/sign-in`,
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
    },
  },
  notFound: '/404',
} as const;

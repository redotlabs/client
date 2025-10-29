import { API_PATH } from './path';

export const queryKeyFactory = {
  auth: {
    me: [API_PATH.auth.me],
  },
  article: {
    list: [API_PATH.article.root],
    detail: (articleId: number) => [API_PATH.article.detail(articleId)],
  },
  admin: {
    article: {
      list: [API_PATH.admin.article.root],
      detail: (articleId: number) => [API_PATH.admin.article.detail(articleId)],
    },
  },
  category: {
    list: [API_PATH.category.list],
  },
};

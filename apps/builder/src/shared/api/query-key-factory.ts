import { API_PATH } from './path';

export const queryKeyFactory = {
  auth: {
    me: [API_PATH.auth.me],
  },
  app: {
    bySubdomain: [API_PATH.app.bySubdomain],
    page: {
      versions: [API_PATH.app.page.versions],
      detail: (pageId: number) => [API_PATH.app.page.detail(pageId)],
    },
  },
};

import { API_PATH } from './path';

export const queryKeyFactory = {
  auth: {
    me: [API_PATH.auth.me],
  },
  app: {
    list: [API_PATH.app.root],
    plans: [API_PATH.app.plans],
  },
};

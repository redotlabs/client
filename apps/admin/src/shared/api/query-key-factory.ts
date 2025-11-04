import { API_PATH } from './path';

export const queryKeyFactory = {
  auth: {
    me: [API_PATH.auth.me],
  },
  admin: {
    list: [API_PATH.admin.root],
    detail: (adminId: number) => [API_PATH.admin.detail(adminId)],
  },
};

import { API_PATH } from './path';

export const queryKeyFactory = {
  auth: {
    me: [API_PATH.auth.me],
  },
  admin: {
    list: [API_PATH.admin.root],
    detail: (adminId: number) => [API_PATH.admin.detail(adminId)],
  },
  consultation: {
    list: (params?: unknown) =>
      params
        ? [API_PATH.consultation.root, params]
        : [API_PATH.consultation.root],
    detail: (consultationId: number) => [
      API_PATH.consultation.detail(consultationId),
    ],
  },
};

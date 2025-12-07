import { api } from '@/shared/api/instance';
import { API_PATH } from '@/shared/api/path';
import type {
  AppPlan,
  CMSUser,
  Pagination,
  RedotApp,
  RedotUser,
  SiteSetting,
  StyleInfo,
} from '@repo/types';

export type CreateAppRequest = Pick<RedotApp, 'name'> &
  Pick<StyleInfo, 'theme' | 'color' | 'font'> & { planId: AppPlan['id'] };

export interface AppItem {
  redotApp: RedotApp;
  siteSetting: SiteSetting;
  styleInfo: StyleInfo;
  owner: RedotUser;
}

export interface CreateAppManagerRequest
  extends Pick<CMSUser, 'name' | 'email' | 'password'> {
  appId: RedotApp['id'];
}

export const getAppList = async () => {
  const { data } = await api.get<Pagination<AppItem>>(API_PATH.app.root);
  return data;
};

export const createApp = async (payload: CreateAppRequest) => {
  const { data } = await api.post<AppItem>(API_PATH.app.root, payload);
  return data;
};

export const createAppManager = async ({
  appId,
  ...payload
}: CreateAppManagerRequest) => {
  const { data } = await api.post(API_PATH.app.createManager(appId), payload);
  return data;
};

export const getAppPlans = async () => {
  const { data } = await api.get<AppPlan[]>(API_PATH.app.plans);
  return data;
};

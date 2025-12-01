import { api } from '../instance';
import { API_PATH } from '../path';

export const getAppInfo = async () => {
  const { data } = await api.get(API_PATH.app.bySubdomain);
  return data;
};

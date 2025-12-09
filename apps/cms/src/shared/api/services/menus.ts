import { api } from '@/shared/api/instance';
import { API_PATH } from '@/shared/api/path';

export interface Menu {
  id: number;
  name: string;
  path: string;
  order: number;
}

export const getMenus = async () => {
  const { data } = await api.get<Menu[]>(API_PATH.menus.root);
  return data;
};

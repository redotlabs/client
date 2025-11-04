import { api } from '@/shared/api/instance';
import { API_PATH } from '@/shared/api/path';
import type { Admin } from '@/shared/types';

interface PageParams {
  page: number;
  size: number;
}

interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

export const getAdmins = async ({ page, size }: PageParams) => {
  const { data } = await api.get<PageResponse<Admin>>(API_PATH.admin.root, {
    params: { page, size },
  });
  return data;
};

export const getAdmin = async (adminId: number) => {
  const { data } = await api.get(API_PATH.admin.detail(adminId));
  return data;
};

export const createAdmin = async (payload: Omit<Admin, 'id' | 'createdAt'>) => {
  const { data } = await api.post(API_PATH.admin.root, payload);
  return data;
};

export const updateAdmin = async (
  payload: Omit<Admin, 'createdAt' | 'password'>
) => {
  const { data } = await api.put(API_PATH.admin.detail(payload.id), payload);
  return data;
};

export const deleteAdmin = async ({ id }: Pick<Admin, 'id'>) => {
  const { data } = await api.delete(API_PATH.admin.detail(id));
  return data;
};

export const resetPassword = async ({
  id,
  password,
}: Pick<Admin, 'id' | 'password'>) => {
  const { data } = await api.post(API_PATH.admin.resetPassword(id), {
    password,
  });
  return data;
};

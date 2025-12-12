import { api } from '@/shared/api/instance';
import { API_PATH } from '@/shared/api/path';
import type { Admin } from '@/shared/types';
import type { PageParams, Pagination } from '@repo/types';

export const getAdmins = async (params: PageParams) => {
  const { page = 0, size = 10 } = params;
  const { data } = await api.get<Pagination<Admin>>(API_PATH.admin.root, {
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

export const uploadAdminProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post(API_PATH.admin.uploadProfileImage, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

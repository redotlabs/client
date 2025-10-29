import { Category } from '@/shared/types/category';
import { api } from '@/shared/api/instance';
import { API_PATH } from '@/shared/api/path';

export const getCategories = async () => {
  const { data } = await api.get<Category[]>(API_PATH.category.list);
  return data;
};

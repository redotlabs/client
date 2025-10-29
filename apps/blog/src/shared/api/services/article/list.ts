import { API_PATH } from '@/shared/api/path';
import { api } from '@/shared/api/instance';
import { Article } from '@/shared/types/article';

interface PageParams {
  page: number;
  size: number;
}

interface PageResponse<T> {
  data: T[];
  page: number;
  size: number;
  total: number;
}

export const getArticles = async ({ page, size }: PageParams) => {
  const { data } = await api.get<PageResponse<Article>>(API_PATH.article.root, {
    params: { page, size },
  });
  return data;
};

export const getAdminArticles = async ({ page, size }: PageParams) => {
  const { data } = await api.get<PageResponse<Article>>(
    API_PATH.admin.article.root,
    {
      params: { page, size },
    }
  );
  return data;
};

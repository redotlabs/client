import { Article } from '@/shared/types/article';
import { api } from '@/shared/api/instance';
import { API_PATH } from '@/shared/api/path';

export const getArticleDetail = async (articleId: number) => {
  const { data } = await api.get<Article>(API_PATH.article.detail(articleId));
  return data;
};

export const getAdminArticleDetail = async (articleId: number) => {
  const { data } = await api.get<Article>(
    API_PATH.admin.article.detail(articleId)
  );
  return data;
};

export const createArticle = async (article: Partial<Article>) => {
  const { data } = await api.post<Article>(
    API_PATH.admin.article.root,
    article
  );
  return data;
};

export const uploadArticleFile = async ({
  articleId,
  formData,
}: {
  articleId: number;
  formData: FormData;
}) => {
  const { data } = await api.post<{ url: string }>(
    API_PATH.admin.article.upload(articleId),
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return data;
};
export const updateArticle = async ({
  articleId,
  article,
}: {
  articleId: number;
  article: Partial<Article>;
}) => {
  const { data } = await api.patch<Article>(
    API_PATH.admin.article.detail(articleId),
    article
  );
  return data;
};

export const deleteArticle = async (articleId: number) => {
  const { data } = await api.delete<Article>(
    API_PATH.admin.article.detail(articleId)
  );
  return data;
};

import { useQuery } from '@tanstack/react-query';
import { queryKeyFactory } from '@/shared/api/query-key-factory';
import {
  getArticleDetail,
  getAdminArticleDetail,
} from '@/shared/api/services/article/detail';

export const useArticleDetail = (articleId: number) => {
  return useQuery({
    queryKey: queryKeyFactory.article.detail(articleId),
    queryFn: () => getArticleDetail(articleId),
    enabled: !!articleId,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useAdminArticleDetail = (articleId: number) => {
  return useQuery({
    queryKey: queryKeyFactory.admin.article.detail(articleId),
    queryFn: () => getAdminArticleDetail(articleId),
    enabled: !!articleId,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

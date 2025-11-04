import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeyFactory } from '@/shared/api/query-key-factory';
import {
  getArticleDetail,
  getAdminArticleDetail,
  updateArticle,
} from '@/shared/api/services/article/detail';
import { useParams } from 'next/navigation';

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

export const useUpdateArticle = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory.admin.article.detail(+articleId),
      });
      queryClient.removeQueries({
        queryKey: queryKeyFactory.article.detail(+articleId),
      });
      queryClient.removeQueries({
        queryKey: queryKeyFactory.admin.article.list,
      });
      queryClient.removeQueries({
        queryKey: queryKeyFactory.article.list,
      });
    },
  });
};

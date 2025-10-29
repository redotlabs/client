import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeyFactory } from '@/shared/api/query-key-factory';
import {
  getAdminArticles,
  getArticles,
} from '@/shared/api/services/article/list';

export const useArticles = (props?: { enabled?: boolean }) => {
  return useInfiniteQuery({
    queryKey: queryKeyFactory.article.list,
    queryFn: ({ pageParam = 1 }) => getArticles({ page: pageParam, size: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      const { page, total, size } = lastPage;
      const totalPages = Math.ceil(total / size);
      return page < totalPages - 1 ? page + 1 : undefined;
    },
    gcTime: Infinity,
    staleTime: Infinity,
    enabled: props?.enabled ?? true,
  });
};

export const useAdminArticles = (props?: { enabled?: boolean }) => {
  return useInfiniteQuery({
    queryKey: queryKeyFactory.admin.article.list,
    queryFn: ({ pageParam = 1 }) =>
      getAdminArticles({ page: pageParam, size: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      const { page, total, size } = lastPage;
      const totalPages = Math.ceil(total / size);
      return page < totalPages - 1 ? page + 1 : undefined;
    },
    gcTime: Infinity,
    staleTime: Infinity,
    enabled: props?.enabled ?? true,
  });
};

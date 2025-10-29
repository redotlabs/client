import { useQuery } from '@tanstack/react-query';
import { queryKeyFactory } from '@/shared/api/query-key-factory';
import { getCategories } from '@/shared/api/services/category';

export const useCategories = () => {
  return useQuery({
    queryKey: queryKeyFactory.category.list,
    queryFn: getCategories,
    gcTime: Infinity,
    staleTime: Infinity,
  });
};

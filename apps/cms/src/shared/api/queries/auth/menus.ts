import { useQuery } from '@tanstack/react-query';
import { queryKeyFactory } from '@/shared/api/query-key-factory';
import { getMenus } from '@/shared/api/services/menus';

export const useMenus = () => {
  return useQuery({
    queryKey: queryKeyFactory.menus.root,
    queryFn: getMenus,
    gcTime: Infinity,
    staleTime: Infinity,
  });
};
